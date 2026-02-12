interface RefundMessageData {
  value: string
  cached_at: string
  expires_at: string
}

export default function RefundMessageCard({ data }: { data: RefundMessageData }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Message</h2>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <p className="text-gray-800">{data.value}</p>
      </div>

      {/* Cache Info */}
      <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
        <p>Cached at: {new Date(data.cached_at).toLocaleString()}</p>
        <p>Expires at: {new Date(data.expires_at).toLocaleString()}</p>
      </div>
    </div>
  )
}
