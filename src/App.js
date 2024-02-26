import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Signup from "./pages/Signup";
import SignupGuest from "./pages/SignupStudent";
import SignupStudent from "./pages/SignupStudent";
import SignupOrganizer from "./pages/SignupOrganizer";

export default function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup/guest"
            element={<SignupStudent type="guest" />}
          />
          <Route
            path="/signup/student"
            element={<SignupStudent type="native" />}
          />
          <Route path="/signup/organizer" element={<SignupOrganizer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
