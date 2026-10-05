import { useEffect, useState } from "react";
import api from "../api";

function Shipments() {

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);

  const [formData, setFormData] = useState({
    shipmentId: "",
    orderId: "",
    castId: "",
    shipmentStatus: ""
  });


  // =========================
  // GET ALL SHIPMENTS
  // =========================

  const fetchShipments = () => {

    api
      .get("/shipments")

      .then((response) => {

        setShipments(response.data);
        setError("");
        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load shipment data.");
        setLoading(false);

      });

  };


  useEffect(() => {
    fetchShipments();
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

    setEditingShipment(null);

    setFormData({
      shipmentId: "",
      orderId: "",
      castId: "",
      shipmentStatus: ""
    });

    setShowForm(true);

  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (shipment) => {

    setEditingShipment(shipment);

    setFormData({
      shipmentId: shipment.shipmentId,
      orderId: shipment.orderId,
      castId: shipment.castId,
      shipmentStatus: shipment.shipmentStatus || ""
    });

    setShowForm(true);

  };


  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {

    setShowForm(false);
    setEditingShipment(null);

    setFormData({
      shipmentId: "",
      orderId: "",
      castId: "",
      shipmentStatus: ""
    });

  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();

    const shipmentData = {
      shipmentId: formData.shipmentId,
      orderId: formData.orderId,
      castId: formData.castId,
      shipmentStatus: formData.shipmentStatus
    };


    // UPDATE

    if (editingShipment) {

      api
        .put(
          `/shipments/${editingShipment.shipmentId}`,
          shipmentData
        )

        .then(() => {

          alert("Shipment updated successfully!");

          closeForm();
          fetchShipments();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to update shipment.");

        });

    }


    // ADD

    else {

      api
        .post(
          "/shipments",
          shipmentData
        )

        .then(() => {

          alert("Shipment added successfully!");

          closeForm();
          fetchShipments();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to add shipment.");

        });

    }

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (shipmentId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${shipmentId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/shipments/${shipmentId}`
      )

      .then(() => {

        alert("Shipment deleted successfully!");

        fetchShipments();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete shipment. It may be referenced by another record."
        );

      });

  };


  return (

    <section className="page-section">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-title">

        <div>

          <p>LOGISTICS</p>

          <h2>
            Shipment Management
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Shipment
        </button>

      </div>



      {/* =========================
          FORM
      ========================= */}

      {showForm && (

        <div className="form-container">

          <div className="form-header">

            <div>

              <p>SHIPMENT MANAGEMENT</p>

              <h3>
                {editingShipment
                  ? "Edit Shipment"
                  : "Add Shipment"}
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


              {/* SHIPMENT ID */}

              <div className="form-group">

                <label>
                  Shipment ID
                </label>

                <input
                  type="text"
                  name="shipmentId"
                  placeholder="SHP-006"
                  value={formData.shipmentId}
                  onChange={handleChange}
                  required
                  disabled={editingShipment !== null}
                />

              </div>



              {/* ORDER ID */}

              <div className="form-group">

                <label>
                  Order ID
                </label>

                <input
                  type="text"
                  name="orderId"
                  placeholder="ORD-901"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* CAST ID */}

              <div className="form-group">

                <label>
                  Cast ID
                </label>

                <input
                  type="text"
                  name="castId"
                  placeholder="CAST-101"
                  value={formData.castId}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* STATUS */}

              <div className="form-group">

                <label>
                  Shipment Status
                </label>

                <select
                  name="shipmentStatus"
                  value={formData.shipmentStatus}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                </select>

              </div>

            </div>



            {/* BUTTONS */}

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

                {editingShipment
                  ? "Update Shipment"
                  : "Add Shipment"}

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
          Loading shipment data...
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
                  Shipment ID
                </th>

                <th>
                  Order ID
                </th>

                <th>
                  Cast ID
                </th>

                <th>
                  Shipment Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {shipments.map((shipment) => (

                <tr
                  key={shipment.shipmentId}
                >

                  <td>

                    <strong>
                      {shipment.shipmentId}
                    </strong>

                  </td>


                  <td>
                    {shipment.orderId}
                  </td>


                  <td>
                    {shipment.castId}
                  </td>


                  <td>

                    <span
                      className={
                        shipment.shipmentStatus === "Delivered"
                          ? "status-pass"
                          : "status-message"
                      }
                    >
                      {shipment.shipmentStatus || "-"}
                    </span>

                  </td>


                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(shipment)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          shipment.shipmentId
                        )
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

export default Shipments;