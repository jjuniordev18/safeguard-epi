const test = require('node:test')
const assert = require('node:assert')
const domain = require('../domain.js')

test('normaliza tamanhos e identifica a chave do item', () => {
    assert.equal(domain.normalizeSize(' m '), 'M')
    assert.equal(domain.itemKey('emp-1', 'epi-1', 'M'), 'emp-1|epi-1|M')
})

test('entregas e devoluções são separadas por tipo', () => {
    assert.equal(domain.isDelivery({ tipo: 'entrega' }), true)
    assert.equal(domain.isReturn({ tipo: 'devolucao' }), true)
    assert.equal(domain.isDelivery({ tipo: 'devolucao' }), false)
    assert.equal(domain.isReturn({ type: 'return' }), true)
    assert.equal(domain.isDelivery({ type: 'return' }), false)
})

test('agrega M e G separadamente e não zera em devolução repetida', () => {
    const state = {
        deliveries: [
            { employeeId: '1', itens: [{ epiId: 'luva', tam: 'M', qty: 3 }, { epiId: 'luva', tam: 'G', qty: 2 }] },
            { employeeId: '1', itens: [{ epiId: 'luva', tam: 'M', qty: 1 }] }
        ],
        returns: [{ employeeId: '1', itens: [{ epiId: 'luva', tam: 'M', qty: 2 }] }]
    }
    assert.deepEqual(domain.getOutstanding(state, '1'), {
        '1|luva|M': 2,
        '1|luva|G': 2
    })
})

test('fallback legado não duplica devoluções', () => {
    const state = {
        entregas: [
            { employeeId: '2', tipo: 'entrega', itens: [{ epiId: 'cap', tam: 'M', qty: 1 }] },
            { id: 'r1', employeeId: '2', tipo: 'devolucao', itens: [{ epiId: 'cap', tam: 'M', qty: 1 }] }
        ]
    }
    assert.equal(domain.getDeliveries(state).length, 1)
    assert.equal(domain.getReturns(state).length, 1)
})

test('migração legado é idempotente', () => {
    const state = { entregas: [
        { employeeId: '3', tipo: 'entrega', itens: [{ epiId: 'bota', tam: 'G', qty: 1 }] },
        { id: 'r2', employeeId: '3', tipo: 'devolucao', itens: [{ epiId: 'bota', tam: 'G', qty: 1 }] }
    ] }
    const result = domain.migrateLegacyReturns(state)
    assert.deepEqual(result.entregas.length, 1)
    assert.equal(result.returns.length, 1)
    assert.equal(domain.migrateLegacyReturns(result).returns.length, 1)
    assert.equal(result.entregas.some(record => domain.isReturn(record)), false)
})

test('considera entregas arquivadas e não aceita quantidade inválida', () => {
    const state = {
        entregas: [],
        returns: [{ id: 'r3', employeeId: '5', itens: [{ epiId: 'e2', tam: 'M', qty: -2 }] }],
        archivedEntregas: [{ id: 'd3', employeeId: '5', itens: [{ epiId: 'e2', tam: 'M', qty: 2 }] }]
    }
    assert.equal(domain.getDeliveryBalance(state, '5', 'e2', 'M'), 2)
})

test('atualiza estoque com a chave original de Único', () => {
    const state = { epis: [{ id: 'e3', estoque: { Único: 4 } }] }
    domain.applyReturnToStock(state, { employeeId: '6', itens: [{ epiId: 'e3', tam: 'único', qty: 1 }] })
    assert.deepEqual(state.epis[0].estoque, { Único: 5 })
})
test('devolução altera somente o tamanho exato e retorna linhas selecionadas', () => {
    const state = { epis: [{ id: 'e1', estoque: { M: 2, G: 5 } }] }
    const lines = domain.applyReturnToStock(state, {
        employeeId: '4',
        itens: [{ epiId: 'e1', tam: 'M', qty: 1, nome: 'Luva', ca: '1' }]
    })
    assert.deepEqual(lines, [{ epiId: 'e1', tam: 'M', qty: 1, nome: 'Luva', ca: '1' }])
    assert.deepEqual(state.epis[0].estoque, { M: 3, G: 5 })
})
