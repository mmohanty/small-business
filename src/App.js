import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Header from "./components/Header";
import DrawerMenu from "./components/DrawerMenu";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Template from "./components/Template";
import LoanDetails from "./components/Aggregator";
import ApproveTemplate from "./components/ApproveTemplate";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("authenticated");
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Header toggleDrawer={toggleDrawer} />
        <DrawerMenu isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <main style={{ marginTop: "80px", padding: "20px" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/template"
              element={
                <PrivateRoute>
                  <Template />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />

            <Route
              path="/services"
              element={
                <PrivateRoute>
                  <Services />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/approve-template"
              element={
                <PrivateRoute>
                  <ApproveTemplate />
                </PrivateRoute>
              }
            />
            <Route
              path="/loan-details"
              element={
                <PrivateRoute>
                  <LoanDetails />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
