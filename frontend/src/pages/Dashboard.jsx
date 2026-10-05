import { useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../api";
import gsap from "gsap";

const dashboardResources = [
  ["furnaces", "/smelting-furnaces"],
  ["batches", "/batch-alloys"],
  ["procurements", "/material-procurements"],
  ["castings", "/casting-productions"],
  ["inspections", "/quality-inspections"],
  ["defects", "/defect-logs"],
  ["shipments", "/shipments"],
];

function Dashboard() {
  const dashboardRef = useRef(null);

  const [dashboardData, setDashboardData] = useState({
    records: {},
    loading: true,
    unavailable: [],
  });
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      const results = await Promise.allSettled(
        dashboardResources.map(([, endpoint]) => api.get(endpoint))
      );
      const records = {};
      const unavailable = [];

      results.forEach((result, index) => {
        const [key] = dashboardResources[index];

        if (result.status === "fulfilled" && Array.isArray(result.value.data)) {
          records[key] = result.value.data;
        } else {
          records[key] = [];
          unavailable.push(key);
        }
      });

      if (mounted) {
        setDashboardData({ records, loading: false, unavailable });
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);


  /* =========================================
     GSAP ANIMATIONS
  ========================================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".dashboard-intro", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".process-node", {
        opacity: 0,
        scale: 0.7,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.4,
        ease: "back.out(1.7)",
      });

      gsap.to(".node-core", {
        scale: 1.08,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".process-particle", {
        x: "70px",
        duration: 2.5,
        repeat: -1,
        ease: "none",
        stagger: 0.6,
      });

      gsap.to(".temperature-glow", {
        scale: 1.2,
        opacity: 0.7,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, dashboardRef);

    return () => ctx.revert();
  }, []);


  /* =========================================
     SELECTED STAGE DATA
  ========================================= */

  const records = dashboardData.records;
  const unavailable = new Set(dashboardData.unavailable);
  const activeFurnace = records.furnaces?.[0] ?? null;
  const inspections = records.inspections ?? [];
  const passCount = inspections.filter((item) => item.result?.toUpperCase() === "PASS").length;
  const failCount = inspections.filter((item) => item.result?.toUpperCase() === "FAIL").length;
  const qualityRate = inspections.length
    ? `${((passCount / inspections.length) * 100).toFixed(1)}%`
    : "—";
  const shipmentStatus = (shipment) => shipment.shipmentStatus?.toUpperCase() ?? "";
  const pendingShipments = (records.shipments ?? []).filter((shipment) => shipmentStatus(shipment).includes("PENDING")).length;
  const processingShipments = (records.shipments ?? []).filter((shipment) => shipmentStatus(shipment).includes("PROCESS")).length;
  const countFor = (key) => unavailable.has(key) ? "—" : (records[key]?.length ?? 0);

  const stages = {
    raw: {
      title: "Raw Material",
      label: "MATERIAL INPUT",
      icon: "◆",
      description: "Review procurement records and alloy batches entering production.",
      status: unavailable.has("procurements") || unavailable.has("batches") ? "UNAVAILABLE" : "RECORDS",
      details: [
        ["Procurement records", countFor("procurements")],
        ["Alloy batches", countFor("batches")],
      ],
    },
    furnace: {
      title: "Furnace",
      label: "SMELTING UNIT",
      icon: "🔥",
      description: "Registered furnace equipment and its target operating temperature.",
      status: unavailable.has("furnaces") ? "UNAVAILABLE" : dashboardData.loading ? "LOADING" : activeFurnace ? "REGISTERED" : "NO RECORDS",
      details: activeFurnace
        ? [
            ["Furnace No.", activeFurnace.furnaceNo],
            ["Heating Source", activeFurnace.heatingSource],
            ["Liner", activeFurnace.structuralLinerType],
            ["Target Temperature", `${activeFurnace.targetTemperatureC}°C`],
          ]
        : [["Registered units", countFor("furnaces")]],
    },
    melt: {
      title: "Melt",
      label: "MELT PROCESS",
      icon: "◇",
      description: "Alloy batch records associated with the melting process.",
      status: unavailable.has("batches") ? "UNAVAILABLE" : "RECORDS",
      details: [["Alloy batches", countFor("batches")]],
    },
    casting: {
      title: "Casting",
      label: "PRODUCTION",
      icon: "◈",
      description: "Casting production records retrieved from the backend.",
      status: unavailable.has("castings") ? "UNAVAILABLE" : "RECORDS",
      details: [
        ["Casting records", countFor("castings")],
        ["Molds represented", unavailable.has("castings") ? "—" : new Set((records.castings ?? []).map((item) => item.moldId).filter(Boolean)).size],
      ],
    },
    quality: {
      title: "Quality",
      label: "QUALITY CONTROL",
      icon: "✓",
      description: "Inspection results recorded for produced castings.",
      status: unavailable.has("inspections") ? "UNAVAILABLE" : `${qualityRate} PASS RATE`,
      details: [
        ["Inspections", countFor("inspections")],
        ["Passed", unavailable.has("inspections") ? "—" : passCount],
        ["Failed", unavailable.has("inspections") ? "—" : failCount],
        ["Defect records", countFor("defects")],
      ],
    },
    shipment: {
      title: "Shipment",
      label: "LOGISTICS",
      icon: "→",
      description: "Shipment statuses recorded for customer orders.",
      status: unavailable.has("shipments") ? "UNAVAILABLE" : "RECORDS",
      details: [
        ["Pending", unavailable.has("shipments") ? "—" : pendingShipments],
        ["Processing", unavailable.has("shipments") ? "—" : processingShipments],
        ["Total shipments", countFor("shipments")],
      ],
    },
  };


  const selected =
    selectedStage ? stages[selectedStage] : null;


  /* =========================================
     STAGE CLICK
  ========================================= */

  const handleStageClick = (stage) => {

    setSelectedStage(stage);

    requestAnimationFrame(() => {

      gsap.fromTo(
        ".stage-detail-panel",

        {
          opacity: 0,
          y: 20,
          scale: 0.98,
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


  return (

    <div
      ref={dashboardRef}
      className="dashboard"
    >

      {/* =====================================
          INTRO
      ===================================== */}

      <section className="dashboard-intro">

        <div>

          <span className="dashboard-label">
            OPERATIONS OVERVIEW
          </span>

          <h2>
            Foundry Control Center
          </h2>

          <p>
            Monitor melting, casting, quality and
            logistics operations from one central
            control system.
          </p>

        </div>


        <div className="system-status">

          <span className={`status-dot status-dot-${dashboardData.loading ? "checking" : dashboardData.unavailable.length === 0 ? "online" : "offline"}`} aria-hidden="true"></span>

          <div>

            <strong>
              {dashboardData.loading ? "Checking API" : dashboardData.unavailable.length === 0 ? "Backend connected" : "Live data unavailable"}
            </strong>

            <small>
              {dashboardData.loading ? "Checking operational data" : `${dashboardResources.length - dashboardData.unavailable.length} of ${dashboardResources.length} data sources available`}
            </small>

          </div>

        </div>

      </section>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            ◉
          </div>

          <div>

            <span>
              TOTAL CASTINGS
            </span>

            <strong>
              {dashboardData.loading ? "..." : countFor("castings")}
            </strong>

            <small>
              Recorded production entries
            </small>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ◈
          </div>

          <div>

            <span>
              REGISTERED FURNACES
            </span>

            <strong>
              {dashboardData.loading ? "..." : countFor("furnaces")}
            </strong>

            <small>
              Equipment records
            </small>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>

            <span>
              QUALITY RATE
            </span>

            <strong>
              {dashboardData.loading ? "..." : qualityRate}
            </strong>

            <small>
              {countFor("inspections")} recorded inspections
            </small>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            →
          </div>

          <div>

            <span>
              PENDING SHIPMENTS
            </span>

            <strong>
              {dashboardData.loading ? "..." : countFor("shipments") === "—" ? "—" : pendingShipments}
            </strong>

            <small>
              {unavailable.has("shipments") ? "Data unavailable" : `${processingShipments} processing`}
            </small>

          </div>

        </div>

      </section>


      {/* =====================================
          PRODUCTION FLOW
      ===================================== */}

      <section className="flow-section">

        <div className="section-heading">

          <div>

            <span>
              PRODUCTION PIPELINE
            </span>

            <h3>
              Foundry Process Flow
            </h3>

          </div>


          <div className="live-indicator">

            <span></span>

            {dashboardData.loading ? "LOADING" : dashboardData.unavailable.length === 0 ? "CONNECTED" : "PARTIAL DATA"}

          </div>

        </div>


        <div className="process-flow">


          {/* RAW MATERIAL */}

          <button
            className={`process-node ${
              selectedStage === "raw"
                ? "selected-node"
                : ""
            }`}
            onClick={() =>
              handleStageClick("raw")
            }
          >

            <div className="node-ring">

              <div className="node-core">
                ◆
              </div>

            </div>

            <h4>
              Raw Material
            </h4>

            <p>{countFor("procurements")} procurement records</p>

            <span className="node-status">
              {unavailable.has("procurements") ? "UNAVAILABLE" : "RECORDS"}
            </span>

          </button>


          <FlowConnection />


          {/* FURNACE */}

          <button
            className={`process-node active-node ${
              selectedStage === "furnace"
                ? "selected-node"
                : ""
            }`}
            onClick={() =>
              handleStageClick("furnace")
            }
          >

            <div className="node-ring furnace-ring">

              <div className="temperature-glow"></div>

              <div className="node-core">
                🔥
              </div>

            </div>

            <h4>
              Furnace
            </h4>

            <p>

              {activeFurnace
                ? `${activeFurnace.furnaceNo} · ${activeFurnace.targetTemperatureC}°C`
                : dashboardData.loading ? "Loading..." : unavailable.has("furnaces") ? "Backend unavailable" : "No records"}

            </p>

            <span className="node-status active">

              {unavailable.has("furnaces") ? "UNAVAILABLE" : dashboardData.loading ? "LOADING" : activeFurnace ? "REGISTERED" : "NO RECORDS"}

            </span>

          </button>


          <FlowConnection />


          {/* MELT */}

          <button
            className={`process-node ${
              selectedStage === "melt"
                ? "selected-node"
                : ""
            }`}
            onClick={() =>
              handleStageClick("melt")
            }
          >

            <div className="node-ring">

              <div className="node-core">
                ◇
              </div>

            </div>

            <h4>
              Melt
            </h4>

            <p>{countFor("batches")} alloy batches</p>

            <span className="node-status">
              {unavailable.has("batches") ? "UNAVAILABLE" : "RECORDS"}
            </span>

          </button>


          <FlowConnection />


          {/* CASTING */}

          <button
            className={`process-node ${
              selectedStage === "casting"
                ? "selected-node"
                : ""
            }`}
            onClick={() =>
              handleStageClick("casting")
            }
          >

            <div className="node-ring">

              <div className="node-core">
                ◈
              </div>

            </div>

            <h4>
              Casting
            </h4>

            <p>{countFor("castings")} casting records</p>

            <span className="node-status">
              {unavailable.has("castings") ? "UNAVAILABLE" : "RECORDS"}
            </span>

          </button>


          <FlowConnection />


          {/* QUALITY */}

          <button
            className={`process-node ${
              selectedStage === "quality"
                ? "selected-node"
                : ""
            }`}
            onClick={() =>
              handleStageClick("quality")
            }
          >

            <div className="node-ring">

              <div className="node-core">
                ✓
              </div>

            </div>

            <h4>
              Quality
            </h4>

            <p>{countFor("inspections")} inspections</p>

            <span className="node-status good">
              {unavailable.has("inspections") ? "—" : qualityRate}
            </span>

          </button>


          <FlowConnection />


          {/* SHIPMENT */}

          <button
            className={`process-node ${
              selectedStage === "shipment"
                ? "selected-node"
                : ""
            }`}
            onClick={() =>
              handleStageClick("shipment")
            }
          >

            <div className="node-ring">

              <div className="node-core">
                →
              </div>

            </div>

            <h4>
              Shipment
            </h4>

            <p>{unavailable.has("shipments") ? "— pending" : `${pendingShipments} pending`}</p>

            <span className="node-status">
              {unavailable.has("shipments") ? "UNAVAILABLE" : "RECORDS"}
            </span>

          </button>

        </div>


        {/* =================================
            API ERROR
        ================================= */}

        {dashboardData.unavailable.length > 0 && (

          <div
            className="dashboard-data-alert"
            role="status"
          >
            Live data is unavailable for {dashboardData.unavailable.join(", ")}. Values are shown as unavailable until the backend responds.
          </div>

        )}


        {/* =================================
            STAGE DETAIL PANEL
        ================================= */}

        {selected && (

          <div className="stage-detail-panel">

            <div className="stage-detail-main">

              <div className="stage-detail-icon">
                {selected.icon}
              </div>

              <div>

                <span>
                  {selected.label}
                </span>

                <h3>
                  {selected.title}
                </h3>

                <p>
                  {selected.description}
                </p>

              </div>

            </div>


            <div className="stage-detail-status">
              {selected.status}
            </div>


            <div className="stage-details-grid">

              {selected.details.map(
                ([label, value], index) => (

                  <div
                    className="detail-item"
                    key={index}
                  >

                    <span>
                      {label}
                    </span>

                    <strong>
                      {value}
                    </strong>

                  </div>

                )
              )}

            </div>


            <button
              className="close-stage"
              onClick={() =>
                setSelectedStage(null)
              }
            >
              CLOSE
            </button>

          </div>

        )}

      </section>


      {/* =====================================
          LOWER PANELS
      ===================================== */}

      <section className="dashboard-bottom">


        {/* =================================
            REAL FURNACE
        ================================= */}

        <div className="dashboard-panel furnace-panel">

          <div className="panel-header">

            <div>

              <span>
                REGISTERED EQUIPMENT
              </span>

              <h3>
                Furnace Overview
              </h3>

            </div>

            <span className={`online-badge ${unavailable.has("furnaces") ? "offline" : ""}`}>
              {dashboardData.loading ? "LOADING" : unavailable.has("furnaces") ? "OFFLINE" : activeFurnace ? "REGISTERED" : "NO RECORDS"}
            </span>

          </div>


          {activeFurnace ? (

            <div className="furnace-display">

              <div className="furnace-visual">

                <div className="furnace-outer">

                  <div className="furnace-inner">

                    <div className="furnace-flame">
                      🔥
                    </div>

                  </div>

                </div>

              </div>


              <div className="furnace-data">

                <span>
                  {activeFurnace.furnaceNo}
                </span>

                <strong>
                  {activeFurnace.targetTemperatureC}°
                </strong>

                <small>
                  Target Temperature
                </small>


                <div className="furnace-meta">{activeFurnace.heatingSource}</div>
                <div className="furnace-meta">{activeFurnace.structuralLinerType}</div>

              </div>

            </div>

          ) : (

            <div className="dashboard-empty-state">
              {dashboardData.loading ? "Loading furnace records..." : unavailable.has("furnaces") ? "Start the backend to load furnace records." : "No furnaces are registered."}
            </div>

          )}

        </div>


        {/* =================================
            QUALITY
        ================================= */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span>
                QUALITY CONTROL
              </span>

              <h3>
                Inspection Overview
              </h3>

            </div>

          </div>


          <div className="quality-overview">

            <div
              className="quality-circle"
              style={{ "--quality-angle": `${inspections.length ? (passCount / inspections.length) * 360 : 0}deg` }}
            >

              <div>

                <strong>
                  {unavailable.has("inspections") ? "—" : qualityRate}
                </strong>

                <span>
                  PASS
                </span>

              </div>

            </div>


            <div className="quality-details">

              <div>
                <span>
                  Passed
                </span>

                <strong>
                  {unavailable.has("inspections") ? "—" : passCount}
                </strong>
              </div>


              <div>
                <span>
                  Failed
                </span>

                <strong>
                  {unavailable.has("inspections") ? "—" : failCount}
                </strong>
              </div>


              <div>
                <span>
                  Defects
                </span>

                <strong>
                  {countFor("defects")}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  );
}


/* =========================================
   FLOW CONNECTION
========================================= */

function FlowConnection() {

  return (

    <div className="flow-connection">

      <div className="flow-track"></div>

      <div className="process-particle"></div>

      <div className="process-particle"></div>

    </div>

  );

}


export default Dashboard;