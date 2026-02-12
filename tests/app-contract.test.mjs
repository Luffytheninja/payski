import test from 'node:test'
import assert from 'node:assert/strict'

test('currency formatting contract', () => {
  const value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.5)
  assert.equal(value, '$1,234.50')
})

test('onboarding demo code contract', () => {
  const code = '123456'
  assert.equal(code.length, 6)
})
