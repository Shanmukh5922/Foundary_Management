import { useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../api";
import ApiStatus from "../components/ApiStatus";
import gsap from "gsap";

const API_URL = "/batch-alloys";

function BatchAlloys() {
  const pageRef = useRef(null);

  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [alloyFilter, setAlloyFilter] = useState("ALL");
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================
     FETCH REAL BATCH ALLOY DATA
  ========================================= */

  const fetchBatches = () => {
    api
      .get(API_URL)
      .then((response) => {
        setBatches(response.data);
        setError("");
      })
      .catch((err) => {
        console.error("Batch Alloy API Error:", err);
        setError("Unable to load alloy and melt data.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBatches();
  }, []);


  /* =========================================
     GSAP PAGE ANIMATION
  ========================================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".alloys-header", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".alloy-summary-card", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.15,
        ease: "power3.out",
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);


  /* =========================================
     GET UNIQUE ALLOY TYPES
  ========================================= */

  const alloyTypes = [
    "ALL",
    ...new Set(
      batches.map(
        (batch) => batch.alloyClassification
      )
    ),
  ];


  /* =========================================
     FILTER
  ========================================= */

  const filteredBatches = batches.filter(
    (batch) => {

      const meltId =
        String(batch.meltId || "").toLowerCase();

      const alloy =
        String(
          batch.alloyClassification || ""
        ).toLowerCase();

      const baseElement =
        String(
          batch.baseElement || ""
        ).toLowerCase();

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        meltId.includes(searchText) ||
        alloy.includes(searchText) ||
        baseElement.includes(searchText);

      const matchesAlloy =
        alloyFilter === "ALL" ||
        batch.alloyClassification === alloyFilter;

      return matchesSearch && matchesAlloy;
    }
  );


  /* =========================================
     OPEN DETAILS
  ========================================= */

  const openDetails = (batch) => {

    setSelectedBatch(batch);

    requestAnimationFrame(() => {

      gsap.fromTo(
        ".alloy-detail-panel",

        {
          opacity: 0,
          y: 25,
          scale: 0.97,
        },

        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      );

    });
  };


  /* =========================================
     SUMMARY DATA
  ========================================= */

  const totalBatches = batches.length;

  const uniqueAlloys =
    new Set(
      batches.map(
        (batch) =>
          batch.alloyClassification
      )
    ).size;

  const uniqueBaseElements =
    new Set(
      batches.map(
        (batch) =>
          batch.baseElement
      )
    ).size;

  const linkedFurnaces =
    new Set(
      batches.map(
        (batch) =>
          batch.furnaceNo
      )
    ).size;


  return (

    <div
      ref={pageRef}
      className="alloys-page"
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="alloys-header">

        <div>

          <span className="dashboard-label">
            MELTING & ALLOYING
          </span>

          <h2>
            Alloys & Melts
          </h2>

          <p>
            Monitor alloy batches produced by
            the foundry's smelting furnaces.
          </p>

        </div>


        <ApiStatus loading={loading} error={error} />

      </section>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <section className="alloy-summary">

        <div className="alloy-summary-card">

          <span>
            TOTAL MELTS
          </span>

          <strong>
            {loading ? "..." : totalBatches}
          </strong>

          <small>
            Registered alloy batches
          </small>

        </div>


        <div className="alloy-summary-card">

          <span>
            ALLOY TYPES
          </span>

          <strong>
            {loading ? "..." : uniqueAlloys}
          </strong>

          <small>
            Classifications
          </small>

        </div>


        <div className="alloy-summary-card">

          <span>
            BASE ELEMENTS
          </span>

          <strong>
            {loading ? "..." : uniqueBaseElements}
          </strong>

          <small>
            Different base elements
          </small>

        </div>


        <div className="alloy-summary-card">

          <span>
            FURNACES USED
          </span>

          <strong>
            {loading ? "..." : linkedFurnaces}
          </strong>

          <small>
            Connected smelting units
          </small>

        </div>

      </section>


      {/* =====================================
          SEARCH + FILTER
      ===================================== */}

      <section className="alloy-controls">

        <div className="alloy-search">

          <span>
            🔎
          </span>

          <input
            type="text"
            placeholder="Search melt ID, alloy or base element..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={alloyFilter}
          onChange={(e) =>
            setAlloyFilter(e.target.value)
          }
        >

          {alloyTypes.map(
            (type) => (

              <option
                key={type}
                value={type}
              >

                {type === "ALL"
                  ? "All Alloy Types"
                  : type}

              </option>

            )
          )}

        </select>

      </section>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (

        <div className="alloy-error">
          {error}
        </div>

      )}


      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (

        <div className="alloy-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading alloy batches...
          </p>

        </div>

      )}


      {/* =====================================
          BATCH GRID
      ===================================== */}

      {!loading && !error && (

        <section className="alloy-grid">

          {filteredBatches.map(
            (batch, index) => (

              <div
                className="alloy-card"
                key={batch.meltId}
                onClick={() =>
                  openDetails(batch)
                }
                style={{
                  animationDelay:
                    `${index * 0.08}s`,
                }}
              >

                {/* CARD TOP */}

                <div className="alloy-card-top">

                  <div className="melt-icon">
                    ◇
                  </div>

                  <span className="melt-status">
                    ACTIVE
                  </span>

                </div>


                {/* MELT ID */}

                <div className="alloy-card-title">

                  <span>
                    MELT / BATCH
                  </span>

                  <h3>
                    {batch.meltId}
                  </h3>

                </div>


                {/* ALLOY */}

                <div className="alloy-classification">

                  <span>
                    ALLOY CLASSIFICATION
                  </span>

                  <strong>
                    {batch.alloyClassification}
                  </strong>

                </div>


                {/* DETAILS */}

                <div className="alloy-card-info">

                  <div>

                    <span>
                      BASE ELEMENT
                    </span>

                    <strong>
                      {batch.baseElement}
                    </strong>

                  </div>


                  <div>

                    <span>
                      FURNACE
                    </span>

                    <strong>
                      {batch.furnaceNo}
                    </strong>

                  </div>

                </div>


                {/* MOLD */}

                <div className="alloy-mold">

                  <span>
                    CASTING MOLD TYPE
                  </span>

                  <strong>
                    {batch.castingMoldType}
                  </strong>

                </div>


                <button
                  className="view-alloy"
                  onClick={(event) => {

                    event.stopPropagation();

                    openDetails(batch);

                  }}
                >
                  VIEW MELT DETAILS →
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
        filteredBatches.length === 0 && (

          <div className="no-alloys">

            <div>
              ◌
            </div>

            <h3>
              No alloy batches found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        )}


      {/* =====================================
          DETAIL MODAL
      ===================================== */}

      {selectedBatch && (

        <div
          className="alloy-modal-overlay"
          onClick={() =>
            setSelectedBatch(null)
          }
        >

          <div
            className="alloy-detail-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="alloy-close"
              onClick={() =>
                setSelectedBatch(null)
              }
            >
              ×
            </button>


            <div className="detail-melt-icon">
              ◇
            </div>


            <span className="dashboard-label">
              MELT DETAILS
            </span>


            <h2>
              {selectedBatch.meltId}
            </h2>


            <div className="detail-status">

              <span></span>

              ACTIVE BATCH

            </div>


            <div className="alloy-detail-main">

              <span>
                ALLOY CLASSIFICATION
              </span>

              <strong>
                {selectedBatch.alloyClassification}
              </strong>

            </div>


            <div className="alloy-detail-grid">

              <div>

                <span>
                  BASE ELEMENT
                </span>

                <strong>
                  {selectedBatch.baseElement}
                </strong>

              </div>


              <div>

                <span>
                  FURNACE
                </span>

                <strong>
                  {selectedBatch.furnaceNo}
                </strong>

              </div>


              <div>

                <span>
                  CASTING MOLD
                </span>

                <strong>
                  {selectedBatch.castingMoldType}
                </strong>

              </div>


              <div>

                <span>
                  MELT ID
                </span>

                <strong>
                  {selectedBatch.meltId}
                </strong>

              </div>

            </div>


            <div className="alloy-detail-footer">

              <span>
                RELATIONSHIP
              </span>

              <strong>
                Furnace → Melt → Casting
              </strong>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default BatchAlloys;