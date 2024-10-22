import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Header from "./components/Header";
import DrawerMenu from "./components/DrawerMenu";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Template from "./components/Template";
import ApproveTemplate from "./components/ApproveTemplate";
import ManageLoans from "./components/ManageLoans";
import { SnackbarProvider } from "./components/SnackbarProvider";
import { BackdropProvider } from "./components/BackdropProvider";

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
      <SnackbarProvider>
        <BackdropProvider>
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
              path="/createTemplates"
              element={
                <PrivateRoute>
                  <Template />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/approveLoans"
              element={
                <PrivateRoute>
                  <ApproveLoans />
                </PrivateRoute>
              }
            /> */}

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
              path="/approveTemplates"
              element={
                <PrivateRoute>
                  <ApproveTemplate />
                </PrivateRoute>
              }
            />
            <Route
              path="/manageLoans"
              element={
                <PrivateRoute>
                  <ManageLoans />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        {/* <Footer /> */}
        </BackdropProvider>
        </SnackbarProvider>
      </div>
    </Router>
  );
}

export default App;
