import { useEffect, useState } from "react";
import api from "../api";

function Operators() {

  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingOperator, setEditingOperator] = useState(null);

  const [formData, setFormData] = useState({
    operatorId: "",
    operatorName: "",
    shift: "",
    certificationLevel: ""
  });


  // =========================
  // GET ALL OPERATORS
  // =========================

  const fetchOperators = () => {

    api
      .get("/operators")

      .then((response) => {

        setOperators(response.data);
        setError("");
        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load operator data.");
        setLoading(false);

      });

  };


  useEffect(() => {
    fetchOperators();
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

    setEditingOperator(null);

    setFormData({
      operatorId: "",
      operatorName: "",
      shift: "",
      certificationLevel: ""
    });

    setShowForm(true);

  };


  // =========================
  // EDIT OPERATOR
  // =========================

  const handleEdit = (operator) => {

    setEditingOperator(operator);

    setFormData({
      operatorId: operator.operatorId,
      operatorName: operator.operatorName,
      shift: operator.shift || "",
      certificationLevel: operator.certificationLevel
    });

    setShowForm(true);

  };


  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {

    setShowForm(false);
    setEditingOperator(null);

    setFormData({
      operatorId: "",
      operatorName: "",
      shift: "",
      certificationLevel: ""
    });

  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();

    const operatorData = {
      operatorId: formData.operatorId,
      operatorName: formData.operatorName,
      shift: formData.shift,
      certificationLevel: formData.certificationLevel
    };


    // UPDATE

    if (editingOperator) {

      api
        .put(
          `/operators/${editingOperator.operatorId}`,
          operatorData
        )

        .then(() => {

          alert("Operator updated successfully!");

          closeForm();
          fetchOperators();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to update operator.");

        });

    }


    // ADD

    else {

      api
        .post(
          "/operators",
          operatorData
        )

        .then(() => {

          alert("Operator added successfully!");

          closeForm();
          fetchOperators();

        })

        .catch((error) => {

          console.error(error);

          alert("Failed to add operator.");

        });

    }

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (operatorId) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${operatorId}?`
    );

    if (!confirmDelete) {
      return;
    }


    api
      .delete(
        `/operators/${operatorId}`
      )

      .then(() => {

        alert("Operator deleted successfully!");

        fetchOperators();

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to delete operator. This operator may be used in a quality inspection."
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

          <p>WORKFORCE MANAGEMENT</p>

          <h2>
            Operators
          </h2>

        </div>


        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Operator
        </button>

      </div>



      {/* =========================
          FORM
      ========================= */}

      {showForm && (

        <div className="form-container">

          <div className="form-header">

            <div>

              <p>OPERATOR MANAGEMENT</p>

              <h3>
                {editingOperator
                  ? "Edit Operator"
                  : "Add Operator"}
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


              {/* OPERATOR ID */}

              <div className="form-group">

                <label>
                  Operator ID
                </label>

                <input
                  type="text"
                  name="operatorId"
                  placeholder="OP-106"
                  value={formData.operatorId}
                  onChange={handleChange}
                  required
                  disabled={editingOperator !== null}
                />

              </div>



              {/* OPERATOR NAME */}

              <div className="form-group">

                <label>
                  Operator Name
                </label>

                <input
                  type="text"
                  name="operatorName"
                  placeholder="John Smith"
                  value={formData.operatorName}
                  onChange={handleChange}
                  required
                />

              </div>



              {/* SHIFT */}

              <div className="form-group">

                <label>
                  Shift
                </label>

                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Shift
                  </option>

                  <option value="Morning">
                    Morning
                  </option>

                  <option value="Evening">
                    Evening
                  </option>

                  <option value="Night">
                    Night
                  </option>

                </select>

              </div>



              {/* CERTIFICATION */}

              <div className="form-group">

                <label>
                  Certification Level
                </label>

                <input
                  type="text"
                  name="certificationLevel"
                  placeholder="Senior Metallurgist"
                  value={formData.certificationLevel}
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

                {editingOperator
                  ? "Update Operator"
                  : "Add Operator"}

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
          Loading operator data...
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
                  Operator ID
                </th>

                <th>
                  Operator Name
                </th>

                <th>
                  Shift
                </th>

                <th>
                  Certification Level
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {operators.map((operator) => (

                <tr
                  key={operator.operatorId}
                >

                  <td>

                    <strong>
                      {operator.operatorId}
                    </strong>

                  </td>


                  <td>
                    {operator.operatorName}
                  </td>


                  <td>
                    {operator.shift || "-"}
                  </td>


                  <td>
                    {operator.certificationLevel}
                  </td>


                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(operator)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          operator.operatorId
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

export default Operators;