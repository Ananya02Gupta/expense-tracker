import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import Logout from "../components/Logout";
import ExportCSV from "../components/ExportCSV";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  // 🔥 Fetch user expenses
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setExpenses(data);
    });

    return () => unsubscribe();
  }, []);

  // 💰 Calculations
  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalIncome = 50000; // (future me user input karenge)
  const balance = totalIncome - totalExpense;

  return (
    <div style={styles.container}>
      <h1>💰 Expense Tracker Pro</h1>

      {/* 🔐 Actions */}
      <div style={styles.actions}>
        <Logout />
        <ExportCSV />
      </div>

      {/* 📊 Summary Cards */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Expense</h3>
          <p>₹{totalExpense}</p>
        </div>

        <div style={styles.card}>
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      {/* ➕ Add Expense */}
      <ExpenseForm />

      {/* 📊 Chart + List */}
      <div style={styles.bottom}>
        <ExpenseChart />
        <ExpenseList />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f4f6f9",
    minHeight: "100vh"
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  cards: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "150px"
  },

  bottom: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px"
  }
};

export default Dashboard;