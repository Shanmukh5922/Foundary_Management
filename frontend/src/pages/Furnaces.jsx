import { useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../api";
import ApiStatus from "../components/ApiStatus";
import gsap from "gsap";

const API_URL = "/smelting-furnaces";

function Furnaces() {
  const pageRef = useRef(null);

  const [furnaces, setFurnaces] = useState([]);
  const [search, setSearch] = useState("");
  const [heatingSource, setHeatingSource] = useState("ALL");
  const [selectedFurnace, setSelectedFurnace] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================
     FETCH FURNACES
  ========================================= */

  const fetchFurnaces = () => {
    api
      .get(API_URL)
      .then((response) => {
        setFurnaces(response.data);
        setError("");
      })
      .catch((err) => {
        console.error("Furnace API Error:", err);
        setError("Unable to load furnace data.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFurnaces();
  }, []);


  /* =========================================
     GSAP PAGE ANIMATION
  ========================================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".furnaces-header", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".furnace-summary-card", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.15,
        ease: "power3.out",
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);


  /* =========================================
     FILTER DATA
  ========================================= */

  const filteredFurnaces = furnaces.filter((furnace) => {

    const matchesSearch =
      furnace.furnaceNo
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesHeatingSource =
      heatingSource === "ALL" ||
      furnace.heatingSource === heatingSource;

    return matchesSearch && matchesHeatingSource;
  });


  /* =========================================
     HEATING SOURCES
  ========================================= */

  const heatingSources = [
    "ALL",
    ...new Set(
      furnaces.map(
        (furnace) => furnace.heatingSource
      )
    ),
  ];


  /* =========================================
     OPEN DETAILS
  ========================================= */

  const openDetails = (furnace) => {

    setSelectedFurnace(furnace);

    requestAnimationFrame(() => {

      gsap.fromTo(
        ".furnace-detail-panel",

        {
          opacity: 0,
          y: 20,
          scale: 0.97,
        },

        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      );

    });
  };


  return (
    <div
      ref={pageRef}
      className="furnaces-page"
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="furnaces-header">

        <div>

          <span className="dashboard-label">
            SMELTING OPERATIONS
          </span>

          <h2>
            Furnaces
          </h2>

          <p>
            Monitor and manage all registered
            melting furnaces in the foundry.
          </p>

        </div>

        <ApiStatus loading={loading} error={error} />

      </section>


      {/* =====================================
          SUMMARY
      ===================================== */}

      <section className="furnace-summary">

        <div className="furnace-summary-card">

          <span>
            TOTAL FURNACES
          </span>

          <strong>
            {loading ? "..." : error ? "—" : furnaces.length}
          </strong>

          <small>
            Registered units
          </small>

        </div>


        <div className="furnace-summary-card">

          <span>
            ELECTRIC ARC
          </span>

          <strong>
            {loading ? "..." : error ? "—" : (
              furnaces.filter(
                (f) =>
                  f.heatingSource ===
                  "Electric-Arc"
              ).length
            )}
          </strong>

          <small>
            Arc heating units
          </small>

        </div>


        <div className="furnace-summary-card">

          <span>
            INDUCTION
          </span>

          <strong>
            {loading ? "..." : error ? "—" : (
              furnaces.filter(
                (f) =>
                  f.heatingSource ===
                  "Induction-Loop"
              ).length
            )}
          </strong>

          <small>
            Induction units
          </small>

        </div>


        <div className="furnace-summary-card">

          <span>
            HIGHEST TARGET
          </span>

          <strong>

            {loading
              ? "..."
              : error || furnaces.length === 0
                ? "—"
                : `${Math.max(
                  ...furnaces.map(
                    (f) =>
                      f.targetTemperatureC
                  )
                )}°`}

          </strong>

          <small>
            Maximum target temperature
          </small>

        </div>

      </section>


      {/* =====================================
          FILTER BAR
      ===================================== */}

      <section className="furnace-controls">

        <div className="furnace-search">

          <span>
            🔎
          </span>

          <input
            type="text"
            placeholder="Search furnace number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={heatingSource}
          onChange={(e) =>
            setHeatingSource(e.target.value)
          }
        >

          {heatingSources.map(
            (source) => (

              <option
                key={source}
                value={source}
              >
                {source === "ALL"
                  ? "All Heating Sources"
                  : source}
              </option>

            )
          )}

        </select>

      </section>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (

        <div className="furnace-error">
          {error}
        </div>

      )}


      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (

        <div className="furnace-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading furnace data...
          </p>

        </div>

      )}


      {/* =====================================
          FURNACE GRID
      ===================================== */}

      {!loading && !error && (

        <section className="furnace-grid">

          {filteredFurnaces.map(
            (furnace, index) => (

              <div
                className="furnace-card"
                key={furnace.furnaceNo}
                onClick={() =>
                  openDetails(furnace)
                }
                style={{
                  animationDelay:
                    `${index * 0.08}s`,
                }}
              >

                <div className="furnace-card-top">

                  <div className="furnace-card-icon">
                    🔥
                  </div>

                  <span className="furnace-registered">
                    REGISTERED
                  </span>

                </div>


                <div className="furnace-card-title">

                  <span>
                    FURNACE UNIT
                  </span>

                  <h3>
                    {furnace.furnaceNo}
                  </h3>

                </div>


                <div className="furnace-temperature">

                  <span>
                    TARGET TEMPERATURE
                  </span>

                  <strong>
                    {furnace.targetTemperatureC}
                    <small>
                      °C
                    </small>
                  </strong>

                </div>


                <div className="furnace-card-info">

                  <div>

                    <span>
                      HEATING
                    </span>

                    <strong>
                      {furnace.heatingSource}
                    </strong>

                  </div>


                  <div>

                    <span>
                      LINER
                    </span>

                    <strong>
                      {furnace.structuralLinerType}
                    </strong>

                  </div>

                </div>


                <button
                  className="view-furnace"
                  onClick={(event) => {

                    event.stopPropagation();

                    openDetails(furnace);

                  }}
                >
                  VIEW DETAILS →
                </button>

              </div>

            )
          )}

        </section>

      )}


      {/* =====================================
          NO RESULTS
      ===================================== */}

      {!loading &&
        !error &&
        filteredFurnaces.length === 0 && (

          <div className="no-furnaces">

            <div>
              ◌
            </div>

            <h3>
              No furnaces found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        )}


      {/* =====================================
          DETAIL MODAL
      ===================================== */}

      {selectedFurnace && (

        <div
          className="furnace-modal-overlay"
          onClick={() =>
            setSelectedFurnace(null)
          }
        >

          <div
            className="furnace-detail-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="furnace-close"
              onClick={() =>
                setSelectedFurnace(null)
              }
            >
              ×
            </button>


            <div className="detail-furnace-icon">
              🔥
            </div>


            <span className="dashboard-label">
              FURNACE DETAILS
            </span>


            <h2>
              {selectedFurnace.furnaceNo}
            </h2>


            <div className="detail-status">
              <span></span>
              REGISTERED
            </div>


            <div className="detail-temperature">

              <span>
                TARGET TEMPERATURE
              </span>

              <strong>
                {selectedFurnace.targetTemperatureC}
                <small>
                  °C
                </small>
              </strong>

            </div>


            <div className="detail-grid">

              <div>

                <span>
                  HEATING SOURCE
                </span>

                <strong>
                  {selectedFurnace.heatingSource}
                </strong>

              </div>


              <div>

                <span>
                  STRUCTURAL LINER
                </span>

                <strong>
                  {selectedFurnace.structuralLinerType}
                </strong>

              </div>

            </div>


            <div className="detail-footer">

              <span>
                SOURCE
              </span>

              <strong>
                Spring Boot REST API
              </strong>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Furnaces;