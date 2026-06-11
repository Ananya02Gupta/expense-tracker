import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Successful 🎉");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #6a11cb 0%, #2575fc 50%, #00c6ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>💰 Expense Tracker</h1>
        <h2>Register</h2>

        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background:
                "linear-gradient(45deg, #ff6b6b, #ff8e53)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#ffe082",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;