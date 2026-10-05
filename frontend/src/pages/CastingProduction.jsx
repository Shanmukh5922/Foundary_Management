import { useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../api";
import ApiStatus from "../components/ApiStatus";
import gsap from "gsap";

const API_URL = "/casting-productions";

function CastingProduction() {
  const pageRef = useRef(null);

  const [productions, setProductions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduction, setSelectedProduction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductions = () => {
    api
      .get(API_URL)
      .then((response) => {
        setProductions(response.data);
        setError("");
      })
      .catch((err) => {
        console.error("Production API Error:", err);
        setError("Unable to load casting production data.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".production-header", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".production-summary-card", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.15,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filteredProductions = productions.filter((production) => {
    const text = search.toLowerCase();

    return (
      String(production.productionId || "")
        .toLowerCase()
        .includes(text) ||
      String(production.meltId || "")
        .toLowerCase()
        .includes(text) ||
      String(production.castingMoldType || "")
        .toLowerCase()
        .includes(text)
    );
  });

  const openDetails = (production) => {
    setSelectedProduction(production);

    requestAnimationFrame(() => {
      gsap.fromTo(
        ".production-detail-panel",
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
    <div ref={pageRef} className="production-page">

      {/* HEADER */}

      <section className="production-header">

        <div>
          <span className="dashboard-label">
            PRODUCTION OPERATIONS
          </span>

          <h2>Casting Production</h2>

          <p>
            Monitor casting production batches and
            their associated melts and molds.
          </p>
        </div>

        <ApiStatus loading={loading} error={error} />

      </section>


      {/* SUMMARY */}

      <section className="production-summary">

        <div className="production-summary-card">
          <span>TOTAL PRODUCTIONS</span>

          <strong>
            {loading ? "..." : productions.length}
          </strong>

          <small>Registered production records</small>
        </div>

        <div className="production-summary-card">
          <span>UNIQUE MELTS</span>

          <strong>
            {loading
              ? "..."
              : new Set(
                  productions.map(
                    (p) => p.meltId
                  )
                ).size}
          </strong>

          <small>Melts used in production</small>
        </div>

        <div className="production-summary-card">
          <span>UNIQUE MOLDS</span>

          <strong>
            {loading
              ? "..."
              : new Set(
                  productions.map(
                    (p) => p.castingMoldType
                  )
                ).size}
          </strong>

          <small>Mold types used</small>
        </div>

        <div className="production-summary-card">
          <span>ACTIVE RECORDS</span>

          <strong>
            {loading ? "..." : productions.length}
          </strong>

          <small>Production entries</small>
        </div>

      </section>


      {/* SEARCH */}

      <section className="production-controls">

        <div className="production-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Search production ID, melt or mold..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </section>


      {/* ERROR */}

      {error && (
        <div className="production-error">
          {error}
        </div>
      )}


      {/* LOADING */}

      {loading && (
        <div className="production-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading production data...
          </p>

        </div>
      )}


      {/* PRODUCTION GRID */}

      {!loading && !error && (

        <section className="production-grid">

          {filteredProductions.map(
            (production, index) => (

              <div
                className="production-card"
                key={
                  production.productionId ||
                  index
                }
                style={{
                  animationDelay:
                    `${index * 0.08}s`,
                }}
                onClick={() =>
                  openDetails(production)
                }
              >

                <div className="production-card-top">

                  <div className="production-icon">
                    ⚙
                  </div>

                  <span className="production-status">
                    ACTIVE
                  </span>

                </div>


                <div className="production-card-title">

                  <span>
                    PRODUCTION ID
                  </span>

                  <h3>
                    {production.productionId}
                  </h3>

                </div>


                <div className="production-main-info">

                  <span>
                    MELT ID
                  </span>

                  <strong>
                    {production.meltId}
                  </strong>

                </div>


                <div className="production-card-info">

                  <div>
                    <span>CASTING MOLD</span>

                    <strong>
                      {production.castingMoldType}
                    </strong>
                  </div>

                  <div>
                    <span>PRODUCTION ID</span>

                    <strong>
                      {production.productionId}
                    </strong>
                  </div>

                </div>


                <button
                  className="view-production"
                  onClick={(event) => {
                    event.stopPropagation();
                    openDetails(production);
                  }}
                >
                  VIEW PRODUCTION →
                </button>

              </div>

            )
          )}

        </section>
      )}


      {/* EMPTY */}

      {!loading &&
        !error &&
        filteredProductions.length === 0 && (

          <div className="no-productions">

            <div>◌</div>

            <h3>
              No production records found
            </h3>

            <p>
              Try changing your search.
            </p>

          </div>
        )}


      {/* DETAIL MODAL */}

      {selectedProduction && (

        <div
          className="production-modal-overlay"
          onClick={() =>
            setSelectedProduction(null)
          }
        >

          <div
            className="production-detail-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="production-close"
              onClick={() =>
                setSelectedProduction(null)
              }
            >
              ×
            </button>


            <div className="detail-production-icon">
              ⚙
            </div>


            <span className="dashboard-label">
              PRODUCTION DETAILS
            </span>


            <h2>
              {selectedProduction.productionId}
            </h2>


            <div className="detail-status">
              <span></span>
              ACTIVE PRODUCTION
            </div>


            <div className="production-detail-main">

              <span>MELT ID</span>

              <strong>
                {selectedProduction.meltId}
              </strong>

            </div>


            <div className="production-detail-grid">

              <div>

                <span>PRODUCTION ID</span>

                <strong>
                  {selectedProduction.productionId}
                </strong>

              </div>


              <div>

                <span>MELT ID</span>

                <strong>
                  {selectedProduction.meltId}
                </strong>

              </div>


              <div>

                <span>CASTING MOLD</span>

                <strong>
                  {selectedProduction.castingMoldType}
                </strong>

              </div>

            </div>


            <div className="production-detail-footer">

              <span>FLOW</span>

              <strong>
                Furnace → Melt → Production
              </strong>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default CastingProduction;