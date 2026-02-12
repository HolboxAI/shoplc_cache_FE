interface BudgetPayData {
  value: Array<{
    AvailableLimit: number
    TotalLimit: number
    UsedLimit: number
    TotalOutstandingLimit: number
    TotalPendingInstallmentAmount: number
    OverDueAmount: number
    CustomerBpStatus: string
    LastInstallments: Array<{
      SalesOrderCode: string
      LastInstallmentAmount: string
      LastInstallmentDate: string
    }>
    NextInstallment: Array<{
      SalesOrderCode: string
      NextInstallmentAmount: string
      NextInstallmentDate: string
    }>
    PendingInstallments: Array<{
      SalesOrderCode: string
      PendingInstallmentAmount: string
      PendingInstallmentDate: string
    }>
  }>
  cached_at: string
  expires_at: string
}

export default function BudgetPayCard({ data }: { data: BudgetPayData }) {
  const budgetPayInfo = data.value[0]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Budget Pay Information</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          budgetPayInfo.CustomerBpStatus === 'SoftRecovery' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {budgetPayInfo.CustomerBpStatus}
        </span>
      </div>

      {/* Limit Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Available Limit</p>
          <p className="text-2xl font-bold text-blue-600">${budgetPayInfo.AvailableLimit.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Limit</p>
          <p className="text-2xl font-bold text-green-600">${budgetPayInfo.TotalLimit.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Used Limit</p>
          <p className="text-2xl font-bold text-red-600">${budgetPayInfo.UsedLimit.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Outstanding Limit</p>
          <p className="text-2xl font-bold text-orange-600">${budgetPayInfo.TotalOutstandingLimit.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Pending Installment</p>
          <p className="text-2xl font-bold text-purple-600">${budgetPayInfo.TotalPendingInstallmentAmount.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Overdue Amount</p>
          <p className="text-2xl font-bold text-red-600">${budgetPayInfo.OverDueAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Last Installments */}
      {budgetPayInfo.LastInstallments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Last Installments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {budgetPayInfo.LastInstallments.map((installment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {installment.SalesOrderCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${installment.LastInstallmentAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(installment.LastInstallmentDate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Next Installment */}
      {budgetPayInfo.NextInstallment.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Next Installment</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            {budgetPayInfo.NextInstallment.map((installment, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{installment.SalesOrderCode}</span>
                <span className="text-blue-600 font-bold">${installment.NextInstallmentAmount}</span>
                <span className="text-gray-600">{new Date(installment.NextInstallmentDate).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Installments */}
      {budgetPayInfo.PendingInstallments.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Pending Installments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {budgetPayInfo.PendingInstallments.map((installment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {installment.SalesOrderCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${installment.PendingInstallmentAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(installment.PendingInstallmentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cache Info */}
      <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
        <p>Cached at: {new Date(data.cached_at).toLocaleString()}</p>
        <p>Expires at: {new Date(data.expires_at).toLocaleString()}</p>
      </div>
    </div>
  )
}
