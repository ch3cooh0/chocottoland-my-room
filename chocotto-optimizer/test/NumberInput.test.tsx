import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import React, { useState } from 'react'
import NumberInput from '../src/components/common/NumberInput'

const Wrapper: React.FC = () => {
  const [value, setValue] = useState(0)
  return <NumberInput value={value} setValue={setValue} />
}

describe('NumberInput', () => {
  it('increments and decrements value', () => {
    const { container } = render(<Wrapper />)
    const input = container.querySelector('input') as HTMLInputElement
    const [decrement, increment] = container.querySelectorAll('svg')

    expect(input.value).toBe('0')
    fireEvent.click(increment)
    expect(input.value).toBe('1')
    fireEvent.click(decrement)
    expect(input.value).toBe('0')
  })
})
