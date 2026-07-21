// Mock supabase-js globally to prevent import-time errors in all tests
import { vi } from 'vitest'

vi.mock('@supabase/supabase-js', () => {
  const mockFrom = vi.fn(() => ({
    select: vi.fn(() => Promise.resolve({ data: [], error: null })),
    insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
    update: vi.fn(() => Promise.resolve({ data: null, error: null })),
    delete: vi.fn(() => Promise.resolve({ data: null, error: null })),
  }))

  return {
    createClient: vi.fn(() => ({
      from: mockFrom,
      auth: { persistSession: false, autoRefreshToken: false },
    })),
  }
})

