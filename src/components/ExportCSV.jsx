import { db, auth } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function ExportCSV() {
  const downloadCSV = async () => {
    const q = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const rows = snapshot.docs.map(doc => doc.data());

    let csv = "Amount,Category,Note\n";

    rows.forEach(r => {
      csv += `${r.amount},${r.category},${r.note}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  return (
    <button onClick={downloadCSV} style={btnStyle}>
      Download CSV
    </button>
  );
}

const btnStyle = {
  background: "blue",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
  marginLeft: "10px"
};

export default ExportCSV;