import { useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
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
        createdAt: Timestamp.now()
      });

      alert("Expense Added Successfully 🎉");

      // clear form
      setAmount("");
      setCategory("");
      setNote("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ Add Expense</h2>

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
    background: "#fff",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    outline: "none"
  },
  button: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default ExpenseForm;