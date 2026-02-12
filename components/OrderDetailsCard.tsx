interface OrderItem {
  ItemCode: string
  ItemName: string
  ItemStatus: string
  message: string
  TrackingNumber: string | null
  NarvarStatus: string | null
  DeliveryDate: string | null
  carrier: string | null
  ItemQuantity: number
  ItemCancelDate: string | null
}

interface Order {
  SalesOrderCode: string
  OrderStatus: string
  OrderDate: string
  TotalGrossAmount: string
  items: OrderItem[]
  LastCardDigit: string
  PaymentMode: string
  IsBudgetPayOrder: string
  TotalShippingcharges_forthis_order: number
  IsAuctionRunning: boolean
  InvoiceCode: string
  BuyAllDiscountAmt: number
  TotalDiscountAmount: number
  TotalTaxAmount: number
  SubscriptionDiscount: number | null
  IsSubscriber: boolean
}

interface OrderDetailsData {
  value: Order[]
  cached_at: string
  expires_at: string
}

export default function OrderDetailsCard({ data }: { data: OrderDetailsData }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'dispatched':
        return 'bg-blue-100 text-blue-800'
      case 'invoiced':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>

      <div className="space-y-6">
        {data.value.map((order, orderIndex) => (
          <div key={orderIndex} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{order.SalesOrderCode}</h3>
                <p className="text-sm text-gray-600">Invoice: {order.InvoiceCode}</p>
                <p className="text-sm text-gray-600">Order Date: {order.OrderDate}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getStatusColor(order.OrderStatus)}`}>
                  {order.OrderStatus}
                </span>
                <p className="text-2xl font-bold text-gray-800">${order.TotalGrossAmount}</p>
              </div>
            </div>

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Payment Mode</p>
                <p className="font-medium text-gray-800">{order.PaymentMode}</p>
                <p className="text-xs text-gray-500">Card: ****{order.LastCardDigit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Shipping</p>
                <p className="font-medium text-gray-800">${order.TotalShippingcharges_forthis_order.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tax</p>
                <p className="font-medium text-gray-800">${order.TotalTaxAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Discount</p>
                <p className="font-medium text-gray-800">${order.TotalDiscountAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Budget Pay Info */}
            {order.IsBudgetPayOrder.includes('Budgetpay') && (
              <div className="bg-purple-50 border border-purple-200 rounded p-3 mb-4">
                <p className="text-sm text-purple-800">{order.IsBudgetPayOrder}</p>
              </div>
            )}

            {/* Order Items */}
            {order.items.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
                <div className="space-y-3">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.ItemName}</p>
                          <p className="text-sm text-gray-600">Item Code: {item.ItemCode}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.ItemQuantity}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.ItemStatus)}`}>
                          {item.ItemStatus}
                        </span>
                      </div>

                      {item.message && (
                        <div className="bg-yellow-50 border-l-2 border-yellow-400 p-2 mb-2">
                          <p className="text-sm text-gray-700">{item.message}</p>
                        </div>
                      )}

                      {item.TrackingNumber && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <span className="text-gray-600">Tracking:</span>
                            <p className="font-mono text-xs">{item.TrackingNumber}</p>
                          </div>
                          {item.carrier && (
                            <div>
                              <span className="text-gray-600">Carrier:</span>
                              <p className="font-medium">{item.carrier.toUpperCase()}</p>
                            </div>
                          )}
                          {item.DeliveryDate && (
                            <div>
                              <span className="text-gray-600">Delivery:</span>
                              <p className="font-medium">{item.DeliveryDate}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {item.NarvarStatus && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-600">Status: </span>
                          <span className="text-xs font-medium text-blue-600">{item.NarvarStatus}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {order.items.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No item details available
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cache Info */}
      <div className="text-xs text-gray-500 mt-6 pt-4 border-t">
        <p>Cached at: {new Date(data.cached_at).toLocaleString()}</p>
        <p>Expires at: {new Date(data.expires_at).toLocaleString()}</p>
      </div>
    </div>
  )
}
