import { describe, expect, it } from 'vitest'

import { setupCounter } from './counter'

describe('setupCounter', () => {
  it('updates text and increments on click', () => {
    const button = document.createElement('button')

    setupCounter(button)
    expect(button.textContent).toBe('Count is 0')

    button.click()
    expect(button.textContent).toBe('Count is 1')
  })
})
