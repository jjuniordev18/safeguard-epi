function isDelivery(record) {
    return Boolean(record) && record.tipo !== 'devolucao' && record.type !== 'return'
}

function isReturn(record) {
    return Boolean(record) && (record.tipo === 'devolucao' || record.type === 'return')
}

function normalizeSize(size) {
    return String(size == null ? '' : size).trim().toUpperCase()
}

function normalizeQuantity(value, max = 999) {
    const quantity = Number(value)
    if (!Number.isFinite(quantity) || quantity < 1) return null
    return Math.min(Math.floor(quantity), max)
}

function getAllDeliveries(state) {
    const records = getDeliveries(state).concat(((state && state.archivedEntregas) || []).filter(isDelivery))
    const byId = {}
    records.forEach((record, index) => { const key = record && record.id != null ? String(record.id) : `__record_${index}`; byId[key] = record })
    return Object.values(byId)
}

function itemKey(employeeId, epiId, size) {
    return `${employeeId}|${epiId}|${normalizeSize(size)}`
}

function getDeliveries(state) {
    if (Array.isArray(state && state.deliveries)) return state.deliveries
    return ((state && state.entregas) || []).filter(isDelivery)
}

function getReturns(state) {
    if (Array.isArray(state && state.returns)) return state.returns
    return ((state && state.entregas) || []).filter(isReturn)
}

function getOutstanding(state, employeeId) {
    const outstanding = {}
    for (const record of getAllDeliveries(state)) {
        if (String(record.employeeId) !== String(employeeId)) continue
        for (const item of record.itens || []) {
            const qty = normalizeQuantity(item.qty)
            if (qty === null) continue
            const key = itemKey(employeeId, item.epiId, item.tam)
            outstanding[key] = (outstanding[key] || 0) + qty
        }
    }
    for (const record of getReturns(state)) {
        if (String(record.employeeId) !== String(employeeId)) continue
        for (const item of record.itens || []) {
            const qty = normalizeQuantity(item.qty)
            if (qty === null) continue
            const key = itemKey(employeeId, item.epiId, item.tam)
            outstanding[key] = Math.max(0, (outstanding[key] || 0) - qty)
        }
    }
    return outstanding
}

function getDeliveryBalance(state, employeeId, epiId, size) {
    const outstanding = getOutstanding(state, employeeId)
    if (epiId === undefined) return outstanding
    return outstanding[itemKey(employeeId, epiId, size)] || 0
}

function applyReturnToStock(state, returnRecord) {
    const selected = []
    for (const item of returnRecord && returnRecord.itens || []) {
        const qty = normalizeQuantity(item.qty)
        if (qty === null) continue
        const size = normalizeSize(item.tam)
        const epi = ((state && state.epis) || []).find(itemEpi => String(itemEpi.id) === String(item.epiId))
        const stockKey = epi && epi.estoque ? Object.keys(epi.estoque).find(key => normalizeSize(key) === size) : null
        if (epi && epi.estoque && stockKey !== undefined) epi.estoque[stockKey] = Number(epi.estoque[stockKey] || 0) + qty
        selected.push({
            epiId: item.epiId,
            tam: size,
            qty,
            nome: item.nome,
            ca: item.ca
        })
    }
    return selected
}

function migrateLegacyReturns(state) {
    if (!state) return state
    const legacy = (state.entregas || []).filter(isReturn)
    state.entregas = (state.entregas || []).filter(isDelivery)
    state.returns = state.returns || []
    const ids = new Set(state.returns.filter(record => record.id != null).map(record => String(record.id)))
    for (const record of legacy) {
        if (record.id == null || !ids.has(String(record.id))) state.returns.push(record)
    }
    return state
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isDelivery,
        isReturn,
        normalizeSize,
        normalizeQuantity,
        getAllDeliveries,
        itemKey,
        getDeliveries,
        getReturns,
        getOutstanding,
        getDeliveryBalance,
        applyReturnToStock,
        migrateLegacyReturns
    }
}
