import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ReflectionPage from "./pages/ReflectionPage";
import RewardsPage from "./pages/RewardsPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/reflect/:questTitle"
          element={isAuthenticated ? <ReflectionPage /> : <Navigate to="/" />}
        />
        <Route
          path="/rewards"
          element={isAuthenticated ? <RewardsPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
