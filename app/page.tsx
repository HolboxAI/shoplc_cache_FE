'use client'

import { useState } from 'react'
import JsonViewer from '@/components/JsonViewer'

interface CacheResponse {
  session_id: string
  found_in_date: string
  cache_data: {
    budgetpay?: {
      value: any[]
      cached_at: string
      expires_at: string
    }
    refund_message?: {
      value: string
      cached_at: string
      expires_at: string
    }
    orderdetails?: {
      value: any[]
      cached_at: string
      expires_at: string
    }
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081'

export default function Home() {
  const [sessionId, setSessionId] = useState('')
  const [cacheData, setCacheData] = useState<CacheResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchCacheData = async () => {
    if (!sessionId.trim()) {
      setError('Please enter a session ID')
      return
    }

    setLoading(true)
    setError('')
    setCacheData(null)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/dashboard/cache/${sessionId}`,
        {
          headers: {
            'accept': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setCacheData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchCacheData()
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Cache Dashboard
        </h1>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Session ID (e.g., 982fd766-4b7e-4ba3-8f00-ed3db1b65837)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={fetchCacheData}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {cacheData && (
          <JsonViewer data={cacheData} />
        )}
      </div>
    </main>
  )
}
