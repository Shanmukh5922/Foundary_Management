import { useEffect, useState } from "react";
import api from "../api";

function CastingMolds() {

  const [molds, setMolds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingMold, setEditingMold] = useState(null);

  const [formData, setFormData] = useState({
    moldId: "",
    moldPatternName: "",
    moldMaterial: "",
    cavityCount: ""
  });


  // =========================
  // GET ALL MOLDS
  // =========================

  const fetchMolds = () => {

    api
      .get("/casting-molds")

      .then((response) => {
        setMolds(response.data);
        setError("");
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setError("Unable to load casting mold data.");
        setLoading(false);
      });

  };


  useEffect(() => {
    fetchMolds();
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

    setEditingMold(null);

    setFormData({
      moldId: "",
      moldPatternName: "",
      moldMaterial: "",
      cavityCount: ""
    });

    setShowForm(true);

  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (mold) => {

    setEditingMold(mold);

    setFormData({
      moldId: mold.moldId,
      moldPatternName: mold.moldPatternName,
      moldMaterial: mold.moldMaterial,
      cavityCount: mold.cavityCount
    });

    setShowForm(true);

  };


  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {

    setShowForm(false);
    setEditingMold(null);

    setFormData({
      moldId: "",
      moldPatternName: "",
      moldMaterial: "",
      cavityCount: ""
    });

  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();

    const moldData = {

      moldId: formData.moldId,

      moldPatternName:
        formData.moldPatternName,

      moldMaterial:
        formData.moldMaterial,

      cavityCount:
        Number(formData.cavityCount)

    };


    // UPDATE

    if (editingMold) {

      api
        .put(
          `/casting-molds/${editingMold.moldId}`,
          moldData
        )

        .then(() => {

          alert("Casting mold updated successfully!");

          closeForm();
          fetchMolds();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to update casting mold.");

        });

    }


    // ADD

    else {

      api
        .post(
          "/casting-molds",
          moldData
        )

        .then(() => {

          alert("Casting mold added successfully!");

          closeForm();
          fetchMolds();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to add casting mold.");

        });

    }

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (moldId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${moldId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/casting-molds/${moldId}`
      )

      .then(() => {

        alert("Casting mold deleted successfully!");

        fetchMolds();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete casting mold. It may be referenced by a production record."
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

          <p>CASTING OPERATIONS</p>

          <h2>
            Casting Molds
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Mold
        </button>

      </div>



      {/* =========================
          FORM
      ========================= */}

      {showForm && (

        <div className="form-container">

          <div className="form-header">

            <div>

              <p>MOLD MANAGEMENT</p>

              <h3>
                {editingMold
                  ? "Edit Casting Mold"
                  : "Add Casting Mold"}
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


              {/* MOLD ID */}

              <div className="form-group">

                <label>
                  Mold ID
                </label>

                <input
                  type="text"
                  name="moldId"
                  placeholder="MOLD-006"
                  value={formData.moldId}
                  onChange={handleChange}
                  required
                  disabled={editingMold !== null}
                />

              </div>



              {/* PATTERN NAME */}

              <div className="form-group">

                <label>
                  Mold Pattern Name
                </label>

                <input
                  type="text"
                  name="moldPatternName"
                  placeholder="Engine Block Pattern"
                  value={formData.moldPatternName}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* MATERIAL */}

              <div className="form-group">

                <label>
                  Mold Material
                </label>

                <input
                  type="text"
                  name="moldMaterial"
                  placeholder="Cast Iron"
                  value={formData.moldMaterial}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* CAVITY COUNT */}

              <div className="form-group">

                <label>
                  Cavity Count
                </label>

                <input
                  type="number"
                  name="cavityCount"
                  placeholder="4"
                  value={formData.cavityCount}
                  onChange={handleChange}
                  min="1"
                  required
                />

              </div>

            </div>



            {/* =========================
                BUTTONS
            ========================= */}

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

                {editingMold
                  ? "Update Mold"
                  : "Add Mold"}

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
          Loading casting molds...
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
                  Mold ID
                </th>

                <th>
                  Pattern Name
                </th>

                <th>
                  Mold Material
                </th>

                <th>
                  Cavity Count
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {molds.map((mold) => (

                <tr
                  key={mold.moldId}
                >

                  <td>

                    <strong>
                      {mold.moldId}
                    </strong>

                  </td>


                  <td>
                    {mold.moldPatternName}
                  </td>


                  <td>
                    {mold.moldMaterial}
                  </td>


                  <td>
                    {mold.cavityCount}
                  </td>


                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(mold)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(mold.moldId)
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

export default CastingMolds;