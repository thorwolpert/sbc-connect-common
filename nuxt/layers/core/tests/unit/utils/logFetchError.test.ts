import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FetchError } from 'ofetch'

describe('logFetchError', () => {
  beforeEach(() => {
    // Mock console.error before each test
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore console.error after each test
    vi.restoreAllMocks()
  })

  it('logs a FetchError with status, statusText, and message', () => {
    // mock fetch error type
    const fetchError = new FetchError('Fetch error message', {
      cause: new Error('Network Error')
    })

    // manually set response properties
    fetchError.response = {
      status: 404,
      statusText: 'Not Found',
      url: 'https://example.com',
      headers: new Headers(),
      ok: false,
      redirected: false,
      type: 'basic' as ResponseType,
      body: null,
      bodyUsed: false,
      clone: vi.fn(),
      arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
      blob: vi.fn().mockResolvedValue(new Blob()),
      formData: vi.fn().mockResolvedValue(new FormData()),
      json: vi.fn().mockResolvedValue({ message: 'Resource not found' }),
      text: vi.fn().mockResolvedValue('Some text response')
    } as any

    // manually set the data field
    fetchError.data = { message: 'Resource not found' }

    logFetchError(fetchError, 'An error occurred')

    expect(console.error).toHaveBeenCalledWith(
      'An error occurred: 404 - Not Found --- {"message":"Resource not found"}'
    )
  })

  it('logs a FetchError with missing status and statusText', () => {
    const fetchError = new FetchError('Fetch error message', {
      cause: new Error('Network Error')
    })

    // Manually set empty response and data
    fetchError.response = {} as any
    fetchError.data = { message: 'No response' }

    logFetchError(fetchError, 'An error occurred')

    expect(console.error).toHaveBeenCalledWith(
      'An error occurred: Unknown Status - Unknown Status Text --- {"message":"No response"}'
    )
  })

  it('logs a generic Error', () => {
    const error = new Error('General error')

    logFetchError(error, 'An error occurred')

    expect(console.error).toHaveBeenCalledWith('An error occurred')
  })

  it('logs message if error is neither FetchError nor Error', () => {
    const unknownError = { some: 'value' }

    logFetchError(unknownError, 'An error occurred')

    expect(console.error).toHaveBeenCalledWith('An error occurred')
  })
})
