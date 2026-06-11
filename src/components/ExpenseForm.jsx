import { useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category) {
      alert("Please fill Amount and Category");
      return;
    }

    try {
      await addDoc(collection(db, "expenses"), {
        amount: Number(amount),
        category,
        note,
        userId: auth.currentUser?.uid,
        createdAt: Timestamp.now(),
      });

      alert("Expense Added Successfully 🎉");

      setAmount("");
      setCategory("");
      setNote("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>➕ Add Expense</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Category (Food, Travel, Shopping)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Add Expense
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },

  heading: {
    color: "#ffffff",
    marginBottom: "15px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    background: "#ffffff",
    color: "#000000",
    fontSize: "16px",
    fontWeight: "500",
  },

  button: {
    padding: "12px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default ExpenseForm;