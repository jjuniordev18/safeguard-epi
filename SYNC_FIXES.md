# Correções de Sincronização Entre Abas

## Problemas Identificados e Corrigidos

### 1. Bug no `processPendingInternal` (Linha 145)
**Problema:** A função usava `loadPending()` duas vezes - uma para processar e outra para limpar. Isso causava inconsistência quando havia concorrência.

**Correção:** Passar a referência `pending` já carregada e usar diretamente para filtragem.

```javascript
// Antes
savePending(loadPending().filter(...));

// Depois
const opsToProcess = pending.slice();
// ... processamento ...
savePending(pending.filter(...));
```

### 2. Bug no `pushToFirebaseNow` (Linha 430)
**Problema:** A condição `if (!full) return;` impedia o push automático a menos que `full=true`, mas `pushToFirebase()` (debounced) chamava com `full=false`.

**Correção:** Remover a restrição e usar flag `_pushTimerActive` para prevenir chamadas concorrentes.

```javascript
// Antes
async function pushToFirebaseNow(full = false) {
  if (!full) return;
}

// Depois
async function pushToFirebaseNow(full = false) {
  if (_pushTimerActive) return;
}
```

### 3. Falta de BroadcastChannel para sincronização entre abas
**Problema:** O Firestore `experimentalTabSynchronization` não era confiável o suficiente para sincronizar mudanças em tempo real entre abas abertas.

**Correção:** Implementado `BroadcastChannel` para notificar outras abas quando o estado muda.

```javascript
// Na inicialização
if (typeof BroadcastChannel !== 'undefined') {
  _broadcastChannel = new BroadcastChannel('epi_app_sync');
  _broadcastChannel.addEventListener('message', (event) => {
    if (event.data.type === 'state_updated') {
      load();
      recomputeCounters();
      save();
      if (curScreen) go(curScreen);
    }
  });
}

// No save()
if (_broadcastChannel) {
  _broadcastChannel.postMessage({ type: 'state_updated', timestamp: Date.now() });
}
```

### 4. Problema no `reconcileWithFirestore`
**Problema:** Quando o Firestore não estava vazio, não sincronizava o estado local com o servidor, causando desincronização.

**Correção:** Sempre reconciliar dados e processar operações pendentes após a reconciliação.

```javascript
await reconcileWithFirestore();
await processPending(); // Processar pendentes após reconciliação
```

### 5. Listener de entregas redefinindo arrays
**Problema:** O listener de `entregas` reatribuía `state.entregas` e `state.returns` como cópias dos snapshots, podendo causar perda de dados.

**Correção:** Atualizar arrays apenas quando houver mudanças reais.

```javascript
const newDeliveries = records.filter(isDelivery);
const newReturns = records.filter(isReturn);
if (JSON.stringify(newDeliveries.map(d => d.id)) !== JSON.stringify(state.entregas.map(d => d.id))) {
  state.entregas = newDeliveries;
  state.returns = newReturns;
  save();
}
```

### 6. Falta de sincronização quando aba fica visível
**Problema:** Quando uma aba era minimizada e depois restaurada, não sincronizava com o servidor.

**Correção:** Adicionado listener para `visibilitychange`.

```javascript
document.addEventListener('visibilitychange', function() {
  if (!document.hidden && fbReady && db && _listenersAttached) {
    syncNow().then(() => {
      processPending().catch(e => console.warn('[FB] Erro:', e));
    });
  }
});
```

### 7. Função `syncNow` exportada para debug
**Problema:** Não havia forma de forçar sincronização manual.

**Correção:** Função `syncNow` agora está disponível globalmente como `window.syncAppNow`.

## Como Testar

1. Abra dois navegadores diferentes
2. Faça uma entrega em uma aba
3. Verifique se a mudança aparece automaticamente na outra aba
4. Também teste minimizando/restaurando a aba

## Arquivos Modificados

- `app.js` - Correções de sincronização

## Variáveis Adicionadas

- `_pushTimerActive` - Flag para prevenir chamadas concorrentes de push
- `_broadcastChannel` - Instância do BroadcastChannel para comunicação entre abas

## Funções Adicionadas

- `syncNow()` - Força sincronização com o servidor (disponível como `window.syncAppNow`)