import { useEffect, useState } from "react";
import api from "../api";

function QualityInspections() {

  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingInspection, setEditingInspection] = useState(null);

  const [formData, setFormData] = useState({
    inspectionId: "",
    castId: "",
    operatorId: "",
    result: ""
  });


  // GET ALL INSPECTIONS

  const fetchInspections = () => {

    api
      .get("/quality-inspections")

      .then((response) => {
        setInspections(response.data);
        setError("");
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setError("Unable to load quality inspection data.");
        setLoading(false);
      });

  };


  useEffect(() => {
    fetchInspections();
  }, []);


  // HANDLE INPUT

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // ADD FORM

  const openAddForm = () => {

    setEditingInspection(null);

    setFormData({
      inspectionId: "",
      castId: "",
      operatorId: "",
      result: ""
    });

    setShowForm(true);

  };


  // EDIT

  const handleEdit = (inspection) => {

    setEditingInspection(inspection);

    setFormData({
      inspectionId: inspection.inspectionId,
      castId: inspection.castId,
      operatorId: inspection.operatorId,
      result: inspection.result
    });

    setShowForm(true);

  };


  // CLOSE FORM

  const closeForm = () => {

    setShowForm(false);
    setEditingInspection(null);

    setFormData({
      inspectionId: "",
      castId: "",
      operatorId: "",
      result: ""
    });

  };


  // ADD / UPDATE

  const handleSubmit = (event) => {

    event.preventDefault();

    const inspectionData = {
      inspectionId: formData.inspectionId,
      castId: formData.castId,
      operatorId: formData.operatorId,
      result: formData.result
    };


    if (editingInspection) {

      api
        .put(
          `/quality-inspections/${editingInspection.inspectionId}`,
          inspectionData
        )

        .then(() => {

          alert("Quality inspection updated successfully!");

          closeForm();
          fetchInspections();

        })

        .catch((error) => {

          console.error(error);
          alert("Failed to update quality inspection.");

        });

    }

    else {

      api
        .post(
          "/quality-inspections",
          inspectionData
        )

        .then(() => {

          alert("Quality inspection added successfully!");

          closeForm();
          fetchInspections();

        })

        .catch((error) => {

          console.error(error);
          alert("Failed to add quality inspection.");

        });

    }

  };


  // DELETE

  const handleDelete = (inspectionId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${inspectionId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/quality-inspections/${inspectionId}`
      )

      .then(() => {

        alert("Quality inspection deleted successfully!");

        fetchInspections();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete inspection. It may be referenced by a defect record."
        );

      });

  };


  return (

    <section className="page-section">


      {/* HEADER */}

      <div className="page-title">

        <div>

          <p>QUALITY CONTROL</p>

          <h2>
            Quality Inspections
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Inspection
        </button>

      </div>



      {/* FORM */}

      {showForm && (

        <div className="form-container">

          <div className="form-header">

            <div>

              <p>INSPECTION MANAGEMENT</p>

              <h3>
                {editingInspection
                  ? "Edit Inspection"
                  : "Add Inspection"}
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


              {/* INSPECTION ID */}

              <div className="form-group">

                <label>
                  Inspection ID
                </label>

                <input
                  type="text"
                  name="inspectionId"
                  placeholder="INS-006"
                  value={formData.inspectionId}
                  onChange={handleChange}
                  required
                  disabled={editingInspection !== null}
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



              {/* OPERATOR ID */}

              <div className="form-group">

                <label>
                  Operator ID
                </label>

                <input
                  type="text"
                  name="operatorId"
                  placeholder="OP-101"
                  value={formData.operatorId}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* RESULT */}

              <div className="form-group">

                <label>
                  Inspection Result
                </label>

                <select
                  name="result"
                  value={formData.result}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Result
                  </option>

                  <option value="PASS">
                    PASS
                  </option>

                  <option value="FAIL">
                    FAIL
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

                {editingInspection
                  ? "Update Inspection"
                  : "Add Inspection"}

              </button>

            </div>

          </form>

        </div>

      )}



      {/* LOADING */}

      {loading && (

        <p className="status-message">
          Loading quality inspection data...
        </p>

      )}



      {/* ERROR */}

      {error && (

        <p className="error-message">
          {error}
        </p>

      )}



      {/* TABLE */}

      {!loading && !error && (

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Inspection ID</th>
                <th>Cast ID</th>
                <th>Operator ID</th>
                <th>Result</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {inspections.map((inspection) => (

                <tr key={inspection.inspectionId}>

                  <td>

                    <strong>
                      {inspection.inspectionId}
                    </strong>

                  </td>

                  <td>
                    {inspection.castId}
                  </td>

                  <td>
                    {inspection.operatorId}
                  </td>

                  <td>

                    <span
                      className={
                        inspection.result === "PASS"
                          ? "status-pass"
                          : "status-fail"
                      }
                    >
                      {inspection.result}
                    </span>

                  </td>

                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(inspection)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          inspection.inspectionId
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

export default QualityInspections;