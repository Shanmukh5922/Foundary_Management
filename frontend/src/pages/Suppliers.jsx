import { useEffect, useState } from "react";
import api from "../api";

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const [formData, setFormData] = useState({
    supplierId: "",
    materialGradeSupplied: "",
    country: "",
    castingMoldType: ""
  });


  // =========================
  // GET ALL SUPPLIERS
  // =========================

  const fetchSuppliers = () => {

    api
      .get("/raw-material-suppliers")

      .then((response) => {

        setSuppliers(response.data);
        setError("");
        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load supplier data.");
        setLoading(false);

      });
  };


  useEffect(() => {
    fetchSuppliers();
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

    setEditingSupplier(null);

    setFormData({
      supplierId: "",
      materialGradeSupplied: "",
      country: "",
      castingMoldType: ""
    });

    setShowForm(true);

  };


  // =========================
  // OPEN EDIT FORM
  // =========================

  const handleEdit = (supplier) => {

    setEditingSupplier(supplier);

    setFormData({
      supplierId: supplier.supplierId,
      materialGradeSupplied: supplier.materialGradeSupplied,
      country: supplier.country,
      castingMoldType: supplier.castingMoldType
    });

    setShowForm(true);

  };


  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {

    setShowForm(false);
    setEditingSupplier(null);

    setFormData({
      supplierId: "",
      materialGradeSupplied: "",
      country: "",
      castingMoldType: ""
    });

  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();

    const supplierData = {

      supplierId: formData.supplierId,

      materialGradeSupplied:
        formData.materialGradeSupplied,

      country:
        formData.country,

      castingMoldType:
        formData.castingMoldType

    };


    // UPDATE
    if (editingSupplier) {

      api
        .put(
          `/raw-material-suppliers/${editingSupplier.supplierId}`,
          supplierData
        )

        .then(() => {

          alert("Supplier updated successfully!");

          closeForm();

          fetchSuppliers();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to update supplier.");

        });

    }


    // ADD
    else {

      api
        .post(
          "/raw-material-suppliers",
          supplierData
        )

        .then(() => {

          alert("Supplier added successfully!");

          closeForm();

          fetchSuppliers();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to add supplier.");

        });

    }

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (supplierId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${supplierId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/raw-material-suppliers/${supplierId}`
      )

      .then(() => {

        alert("Supplier deleted successfully!");

        fetchSuppliers();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete supplier. It may be referenced by another record."
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
            Raw Material Suppliers
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Supplier
        </button>

      </div>



      {/* =========================
          FORM
      ========================= */}

      {showForm && (

        <div className="form-container">


          <div className="form-header">

            <div>

              <p>SUPPLIER MANAGEMENT</p>

              <h3>
                {editingSupplier
                  ? "Edit Supplier"
                  : "Add Supplier"}
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


              {/* SUPPLIER ID */}

              <div className="form-group">

                <label>
                  Supplier ID
                </label>

                <input
                  type="text"
                  name="supplierId"
                  placeholder="SUP-106"
                  value={formData.supplierId}
                  onChange={handleChange}
                  required
                  disabled={editingSupplier !== null}
                />

              </div>



              {/* MATERIAL GRADE */}

              <div className="form-group">

                <label>
                  Material Grade Supplied
                </label>

                <input
                  type="text"
                  name="materialGradeSupplied"
                  placeholder="Ultra-Pure Scrap Iron"
                  value={formData.materialGradeSupplied}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* COUNTRY */}

              <div className="form-group">

                <label>
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  placeholder="India"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* MOLD TYPE */}

              <div className="form-group">

                <label>
                  Casting Mold Type
                </label>

                <input
                  type="text"
                  name="castingMoldType"
                  placeholder="Sand-Mold Box"
                  value={formData.castingMoldType}
                  onChange={handleChange}
                  required
                />

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

                {editingSupplier
                  ? "Update Supplier"
                  : "Add Supplier"}

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
          Loading supplier data...
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
                  Supplier ID
                </th>

                <th>
                  Material Grade
                </th>

                <th>
                  Country
                </th>

                <th>
                  Casting Mold Type
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {suppliers.map((supplier) => (

                <tr
                  key={supplier.supplierId}
                >

                  <td>

                    <strong>
                      {supplier.supplierId}
                    </strong>

                  </td>


                  <td>
                    {supplier.materialGradeSupplied}
                  </td>


                  <td>
                    {supplier.country}
                  </td>


                  <td>
                    {supplier.castingMoldType}
                  </td>


                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(supplier)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          supplier.supplierId
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

export default Suppliers;