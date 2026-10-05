import { useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useLocation, Link } from "react-router-dom";
import {
  BadgeCheck,
  Boxes,
  ClipboardList,
  Factory,
  Flame,
  Layers,
  LayoutDashboard,
  Menu,
  PackageCheck,
  ShoppingCart,
  TriangleAlert,
  Truck,
  Users,
  X,
} from "lucide-react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Furnaces from "./pages/Furnaces";
import Suppliers from "./pages/Suppliers";
import CustomerOrders from "./pages/CustomerOrders";
import Procurement from "./pages/Procurement";
import BatchAlloys from "./pages/BatchAlloys";
import Operators from "./pages/Operators";
import Shipments from "./pages/Shipments";
import CastingProduction from "./pages/CastingProduction";
import CastingMolds from "./pages/CastingMolds";
import Defects from "./pages/Defects";
import QualityInspections from "./pages/QualityInspections";

const navigationItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/furnaces", label: "Furnaces", icon: Flame },
  { to: "/alloys", label: "Alloys & Melts", icon: Layers },
  { to: "/production", label: "Production", icon: Factory },
  { to: "/molds", label: "Casting Molds", icon: Boxes },
  { to: "/operators", label: "Operators", icon: Users },
  { to: "/quality-inspection", label: "Quality Inspection", icon: BadgeCheck },
  { to: "/defects", label: "Defects", icon: TriangleAlert },
  { to: "/procurement", label: "Procurement", icon: ShoppingCart },
  { to: "/suppliers", label: "Suppliers", icon: ClipboardList },
  { to: "/orders", label: "Orders", icon: PackageCheck },
  { to: "/shipments", label: "Shipments", icon: Truck },
];

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const currentPage = navigationItems.find((item) => item.to === pathname)?.label ?? "Page not found";

  return (
    <div className="app">
      <aside className={`sidebar${menuOpen ? " sidebar-open" : ""}`}>
        <div className="sidebar-heading">
          <Link className="sidebar-logo" to="/" onClick={() => setMenuOpen(false)}>
            <h1>FOUNDRY<span>.</span></h1>
            <p>OPERATIONS SYSTEM</p>
          </Link>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav id="primary-navigation" aria-label="Primary navigation">
          {navigationItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => isActive ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="app-header">
          <div>
            <p>FOUNDRY OPERATIONS</p>
            <h1>{currentPage}</h1>
          </div>
          <span className="app-header-note">Management console</span>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/furnaces" element={<Furnaces />} />
          <Route path="/alloys" element={<BatchAlloys />} />
          <Route path="/production" element={<CastingProduction />} />
          <Route path="/molds" element={<CastingMolds />} />
          <Route path="/operators" element={<Operators />} />
          <Route path="/quality-inspection" element={<QualityInspections />} />
          <Route path="/defects" element={<Defects />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="*" element={<section className="empty-route"><h2>Page not found</h2><Link to="/">Return to dashboard</Link></section>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;