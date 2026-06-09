import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={btnStyle}>
      Logout
    </button>
  );
}

const btnStyle = {
  background: "black",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px"
};

export default Logout;