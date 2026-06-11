import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import Logout from "../components/Logout";
import ExportCSV from "../components/ExportCSV";
import ExportPDF from "../components/ExportPDF";
import BudgetTracker from "../components/BudgetTracker";
import IncomeForm from "../components/IncomeForm";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(50000);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExpenses(data);
    });

    return () => unsubscribe();
  }, []);

  // Total Expense
  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  // Total Income
  const totalIncome = income;

  // Balance
  const balance = totalIncome - totalExpense;

  return (
    <div className="container">

      {/* HEADER */}
      <h1>💰 Expense Tracker Pro</h1>

      {/* TOP ACTIONS */}
      <div className="flex">
        <Logout />
        <ExportCSV />
        <ExportPDF expenses={expenses} />
      </div>

      {/* INCOME FORM */}
      <div style={{ marginTop: "20px" }}>
        <IncomeForm setIncome={setIncome} />
      </div>

      {/* SUMMARY CARDS */}
      <div className="flex" style={{ marginTop: "20px" }}>
        <div className="card">
          <h3>💰 Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card">
          <h3>📉 Expense</h3>
          <p>₹{totalExpense}</p>
        </div>

        <div className="card">
          <h3>💎 Balance</h3>
          <p>₹{balance}</p>
        </div>

        <BudgetTracker totalExpense={totalExpense} />
      </div>

      {/* EXPENSE FORM */}
      <div style={{ marginTop: "20px" }}>
        <ExpenseForm />
      </div>

      {/* CHART + LIST */}
      <div className="flex" style={{ marginTop: "20px" }}>

        <div className="chart-box">
          <h3>📊 Expense Analytics</h3>
          <ExpenseChart expenses={expenses} />
        </div>

        <div className="card" style={{ flex: 1 }}>
          <h3>📋 Expense List</h3>
          <ExpenseList />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;