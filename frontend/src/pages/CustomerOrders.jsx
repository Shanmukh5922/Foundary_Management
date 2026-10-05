import { useEffect, useState } from "react";
import api from "../api";

function CustomerOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [formData, setFormData] = useState({
    orderId: "",
    customerName: "",
    quantityOrdered: "",
    deliveryDeadline: ""
  });


  // =========================
  // GET ALL ORDERS
  // =========================

  const fetchOrders = () => {

    api
      .get("/customer-orders")

      .then((response) => {
        setOrders(response.data);
        setError("");
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setError("Unable to load customer orders.");
        setLoading(false);
      });

  };


  useEffect(() => {
    fetchOrders();
  }, []);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // =========================
  // OPEN ADD FORM
  // =========================

  const openAddForm = () => {

    setEditingOrder(null);

    setFormData({
      orderId: "",
      customerName: "",
      quantityOrdered: "",
      deliveryDeadline: ""
    });

    setShowForm(true);

  };


  // =========================
  // EDIT ORDER
  // =========================

  const handleEdit = (order) => {

    setEditingOrder(order);

    setFormData({
      orderId: order.orderId,
      customerName: order.customerName,
      quantityOrdered: order.quantityOrdered,
      deliveryDeadline: order.deliveryDeadline
        ? order.deliveryDeadline.substring(0, 10)
        : ""
    });

    setShowForm(true);

  };


  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {

    setShowForm(false);
    setEditingOrder(null);

    setFormData({
      orderId: "",
      customerName: "",
      quantityOrdered: "",
      deliveryDeadline: ""
    });

  };


  // =========================
  // ADD / UPDATE ORDER
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();

    const orderData = {
      orderId: formData.orderId,
      customerName: formData.customerName,
      quantityOrdered: Number(formData.quantityOrdered),
      deliveryDeadline: formData.deliveryDeadline
    };


    // UPDATE
    if (editingOrder) {

      api
        .put(
          `/customer-orders/${editingOrder.orderId}`,
          orderData
        )

        .then(() => {

          alert("Order updated successfully!");

          closeForm();
          fetchOrders();

        })

        .catch((error) => {

          console.error(error);
          alert("Failed to update order.");

        });

    }


    // ADD
    else {

      api
        .post(
          "/customer-orders",
          orderData
        )

        .then(() => {

          alert("Order added successfully!");

          closeForm();
          fetchOrders();

        })

        .catch((error) => {

          console.error(error);
          alert("Failed to add order.");

        });

    }

  };


  // =========================
  // DELETE ORDER
  // =========================

  const handleDelete = (orderId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${orderId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/customer-orders/${orderId}`
      )

      .then(() => {

        alert("Order deleted successfully!");

        fetchOrders();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete order. It may be referenced by another record."
        );

      });

  };


  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  };


  return (

    <section className="page-section">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-title">

        <div>

          <p>ORDER MANAGEMENT</p>

          <h2>
            Customer Orders
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Order
        </button>

      </div>



      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      {showForm && (

        <div className="form-container">

          <div className="form-header">

            <div>

              <p>CUSTOMER ORDER</p>

              <h3>
                {editingOrder
                  ? "Edit Order"
                  : "Add Order"}
              </h3>

            </div>


            <button
              className="close-button"
              onClick={closeForm}
            >
              ×
            </button>

          </div>



          <form onSubmit={handleSubmit}>

            <div className="form-grid">


              {/* ORDER ID */}

              <div className="form-group">

                <label>
                  Order ID
                </label>

                <input
                  type="text"
                  name="orderId"
                  placeholder="ORD-906"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                  disabled={editingOrder !== null}
                />

              </div>



              {/* CUSTOMER */}

              <div className="form-group">

                <label>
                  Customer Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  placeholder="AeroSpace Dynamics"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* QUANTITY */}

              <div className="form-group">

                <label>
                  Quantity Ordered
                </label>

                <input
                  type="number"
                  name="quantityOrdered"
                  placeholder="100"
                  value={formData.quantityOrdered}
                  onChange={handleChange}
                  min="1"
                  required
                />

              </div>



              {/* DEADLINE */}

              <div className="form-group">

                <label>
                  Delivery Deadline
                </label>

                <input
                  type="date"
                  name="deliveryDeadline"
                  value={formData.deliveryDeadline}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>



            {/* FORM BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={closeForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="save-button"
              >
                {editingOrder
                  ? "Update Order"
                  : "Add Order"}
              </button>

            </div>

          </form>

        </div>

      )}



      {/* =========================
          LOADING
      ========================= */}

      {loading && (

        <p className="status-message">
          Loading customer orders...
        </p>

      )}



      {/* =========================
          ERROR
      ========================= */}

      {error && (

        <p className="error-message">
          {error}
        </p>

      )}



      {/* =========================
          TABLE
      ========================= */}

      {!loading && !error && (

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  Order ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Delivery Deadline
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.orderId}
                >

                  <td>

                    <strong>
                      {order.orderId}
                    </strong>

                  </td>


                  <td>
                    {order.customerName}
                  </td>


                  <td>
                    {order.quantityOrdered}
                  </td>


                  <td>
                    {formatDate(order.deliveryDeadline)}
                  </td>


                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(order)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(order.orderId)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>

  );

}

export default CustomerOrders;