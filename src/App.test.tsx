import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    // Add specific assertions based on your App component
    // For example: expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })

  it('renders main navigation', () => {
    render(<App />)
    // Add assertions for navigation elements
  })
})