import { Package, ArrowUpRight } from "lucide-react";

function Orders() {
  const orders = [
    {
      id: "CHR-2026-001",
      date: "01 Oct 2026",
      status: "Delivered",
      total: 89999,
    },
    {
      id: "CHR-2026-002",
      date: "18 Sep 2026",
      status: "Shipped",
      total: 119999,
    },
  ];

  return (
    <div className="orders-page section">

      <div className="container">

        <div className="page-heading">

          <span className="section-label">
            CHRONOVA / ACCOUNT
          </span>

          <h1>
            Your orders.
          </h1>

        </div>

        <div className="orders-list">

          {orders.map((order) => (
            <article
              className="order-card"
              key={order.id}
            >

              <div className="order-icon">
                <Package size={20} />
              </div>

              <div className="order-information">

                <span>
                  {order.id}
                </span>

                <strong>
                  {order.date}
                </strong>

              </div>

              <div className="order-status">
                {order.status}
              </div>

              <strong>
                ₹{order.total.toLocaleString("en-IN")}
              </strong>

              <button>
                <ArrowUpRight size={17} />
              </button>

            </article>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Orders;