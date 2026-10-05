import { useEffect, useState } from "react";
import api from "../api";

function Defects() {

  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingDefect, setEditingDefect] = useState(null);

  const [formData, setFormData] = useState({
    defectId: "",
    inspectionId: "",
    defectType: "",
    severityLevel: ""
  });


  // =========================
  // GET ALL DEFECTS
  // =========================

  const fetchDefects = () => {

    api
      .get("/defect-logs")

      .then((response) => {

        setDefects(response.data);
        setError("");
        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load defect data.");
        setLoading(false);

      });

  };


  useEffect(() => {
    fetchDefects();
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

    setEditingDefect(null);

    setFormData({
      defectId: "",
      inspectionId: "",
      defectType: "",
      severityLevel: ""
    });

    setShowForm(true);

  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (defect) => {

    setEditingDefect(defect);

    setFormData({
      defectId: defect.defectId,
      inspectionId: defect.inspectionId,
      defectType: defect.defectType,
      severityLevel: defect.severityLevel
    });

    setShowForm(true);

  };


  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {

    setShowForm(false);
    setEditingDefect(null);

    setFormData({
      defectId: "",
      inspectionId: "",
      defectType: "",
      severityLevel: ""
    });

  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();

    const defectData = {
      defectId: formData.defectId,
      inspectionId: formData.inspectionId,
      defectType: formData.defectType,
      severityLevel: formData.severityLevel
    };


    // UPDATE

    if (editingDefect) {

      api
        .put(
          `/defect-logs/${editingDefect.defectId}`,
          defectData
        )

        .then(() => {

          alert("Defect updated successfully!");

          closeForm();
          fetchDefects();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to update defect.");

        });

    }


    // ADD

    else {

      api
        .post(
          "/defect-logs",
          defectData
        )

        .then(() => {

          alert("Defect added successfully!");

          closeForm();
          fetchDefects();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to add defect.");

        });

    }

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (defectId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${defectId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/defect-logs/${defectId}`
      )

      .then(() => {

        alert("Defect deleted successfully!");

        fetchDefects();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete defect."
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

          <p>QUALITY CONTROL</p>

          <h2>
            Defect Log
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Defect
        </button>

      </div>



      {/* =========================
          FORM
      ========================= */}

      {showForm && (

        <div className="form-container">

          <div className="form-header">

            <div>

              <p>DEFECT MANAGEMENT</p>

              <h3>
                {editingDefect
                  ? "Edit Defect"
                  : "Add Defect"}
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


              {/* DEFECT ID */}

              <div className="form-group">

                <label>
                  Defect ID
                </label>

                <input
                  type="text"
                  name="defectId"
                  placeholder="DEF-006"
                  value={formData.defectId}
                  onChange={handleChange}
                  required
                  disabled={editingDefect !== null}
                />

              </div>



              {/* INSPECTION ID */}

              <div className="form-group">

                <label>
                  Inspection ID
                </label>

                <input
                  type="text"
                  name="inspectionId"
                  placeholder="INS-001"
                  value={formData.inspectionId}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* DEFECT TYPE */}

              <div className="form-group">

                <label>
                  Defect Type
                </label>

                <input
                  type="text"
                  name="defectType"
                  placeholder="Porosity"
                  value={formData.defectType}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* SEVERITY */}

              <div className="form-group">

                <label>
                  Severity Level
                </label>

                <select
                  name="severityLevel"
                  value={formData.severityLevel}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Severity
                  </option>

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Critical">
                    Critical
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

                {editingDefect
                  ? "Update Defect"
                  : "Add Defect"}

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
          Loading defect data...
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
                  Defect ID
                </th>

                <th>
                  Inspection ID
                </th>

                <th>
                  Defect Type
                </th>

                <th>
                  Severity Level
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {defects.map((defect) => (

                <tr
                  key={defect.defectId}
                >

                  <td>

                    <strong>
                      {defect.defectId}
                    </strong>

                  </td>


                  <td>
                    {defect.inspectionId}
                  </td>


                  <td>
                    {defect.defectType}
                  </td>


                  <td>

                    <span
                      className={
                        defect.severityLevel === "Critical" ||
                        defect.severityLevel === "High"
                          ? "status-fail"
                          : "status-message"
                      }
                    >
                      {defect.severityLevel}
                    </span>

                  </td>


                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(defect)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          defect.defectId
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

export default Defects;