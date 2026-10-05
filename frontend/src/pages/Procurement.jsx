import { useEffect, useState } from "react";
import api from "../api";

function Procurement() {

  const [procurements, setProcurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProcurement, setEditingProcurement] = useState(null);

  const [formData, setFormData] = useState({
    procurementId: "",
    supplierId: "",
    meltId: "",
    quantityKg: "",
    materialType: ""
  });


  // =========================
  // GET ALL PROCUREMENT
  // =========================

  const fetchProcurements = () => {

    api
      .get("/material-procurements")

      .then((response) => {

        setProcurements(response.data);
        setError("");
        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load procurement data.");
        setLoading(false);

      });

  };


  useEffect(() => {
    fetchProcurements();
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

    setEditingProcurement(null);

    setFormData({
      procurementId: "",
      supplierId: "",
      meltId: "",
      quantityKg: "",
      materialType: ""
    });

    setShowForm(true);

  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (procurement) => {

    setEditingProcurement(procurement);

    setFormData({
      procurementId: procurement.procurementId,
      supplierId: procurement.supplierId,
      meltId: procurement.meltId,
      quantityKg: procurement.quantityKg,
      materialType: procurement.materialType
    });

    setShowForm(true);

  };


  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {

    setShowForm(false);
    setEditingProcurement(null);

    setFormData({
      procurementId: "",
      supplierId: "",
      meltId: "",
      quantityKg: "",
      materialType: ""
    });

  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();


    const procurementData = {

      procurementId:
        formData.procurementId,

      supplierId:
        formData.supplierId,

      meltId:
        formData.meltId,

      quantityKg:
        Number(formData.quantityKg),

      materialType:
        formData.materialType

    };


    // UPDATE
    if (editingProcurement) {

      api
        .put(
          `/material-procurements/${editingProcurement.procurementId}`,
          procurementData
        )

        .then(() => {

          alert("Procurement updated successfully!");

          closeForm();

          fetchProcurements();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to update procurement.");

        });

    }


    // ADD
    else {

      api
        .post(
          "/material-procurements",
          procurementData
        )

        .then(() => {

          alert("Procurement added successfully!");

          closeForm();

          fetchProcurements();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to add procurement.");

        });

    }

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (procurementId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${procurementId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/material-procurements/${procurementId}`
      )

      .then(() => {

        alert("Procurement deleted successfully!");

        fetchProcurements();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete procurement. It may be referenced by another record."
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

          <p>SUPPLY CHAIN</p>

          <h2>
            Material Procurement
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Procurement
        </button>

      </div>



      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      {showForm && (

        <div className="form-container">


          <div className="form-header">

            <div>

              <p>MATERIAL MANAGEMENT</p>

              <h3>
                {editingProcurement
                  ? "Edit Procurement"
                  : "Add Procurement"}
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


              {/* PROCUREMENT ID */}

              <div className="form-group">

                <label>
                  Procurement ID
                </label>

                <input
                  type="text"
                  name="procurementId"
                  placeholder="PROC-06"
                  value={formData.procurementId}
                  onChange={handleChange}
                  required
                  disabled={editingProcurement !== null}
                />

              </div>



              {/* SUPPLIER ID */}

              <div className="form-group">

                <label>
                  Supplier ID
                </label>

                <input
                  type="text"
                  name="supplierId"
                  placeholder="SUP-101"
                  value={formData.supplierId}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* MELT ID */}

              <div className="form-group">

                <label>
                  Melt ID
                </label>

                <input
                  type="text"
                  name="meltId"
                  placeholder="MLT-401"
                  value={formData.meltId}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* QUANTITY */}

              <div className="form-group">

                <label>
                  Quantity (KG)
                </label>

                <input
                  type="number"
                  name="quantityKg"
                  placeholder="1000"
                  value={formData.quantityKg}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>



              {/* MATERIAL TYPE */}

              <div className="form-group">

                <label>
                  Material Type
                </label>

                <input
                  type="text"
                  name="materialType"
                  placeholder="Scrap Iron"
                  value={formData.materialType}
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
                {editingProcurement
                  ? "Update Procurement"
                  : "Add Procurement"}
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
          Loading procurement data...
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
                  Procurement ID
                </th>

                <th>
                  Supplier ID
                </th>

                <th>
                  Melt ID
                </th>

                <th>
                  Quantity (KG)
                </th>

                <th>
                  Material Type
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {procurements.map((procurement) => (

                <tr
                  key={procurement.procurementId}
                >

                  <td>

                    <strong>
                      {procurement.procurementId}
                    </strong>

                  </td>


                  <td>
                    {procurement.supplierId}
                  </td>


                  <td>
                    {procurement.meltId}
                  </td>


                  <td>
                    {procurement.quantityKg}
                  </td>


                  <td>
                    {procurement.materialType}
                  </td>


                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(procurement)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          procurement.procurementId
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

export default Procurement;