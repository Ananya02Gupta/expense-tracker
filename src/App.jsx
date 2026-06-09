import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Default page */}
      <Route path="/" element={<Register />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard page (after login) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;