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

  const totalIncome = 50000;
  const balance = totalIncome - totalExpense;

  return (
    <div className="container">

      {/* HEADER */}
      <h1>💰 Expense Tracker Pro</h1>

      {/* ACTION BUTTONS */}
      <div className="flex">
        <Logout />
        <ExportCSV />
      </div>

      {/* STATS CARDS */}
      <div className="flex">
        <div className="card">
          <h3>Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card">
          <h3>Expense</h3>
          <p>₹{totalExpense}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      {/* FORM */}
      <ExpenseForm />

      {/* MAIN SECTION */}
      <div className="flex" style={{ marginTop: "20px" }}>

        {/* CHART */}
        <div className="chart-box">
          <h3>📊 Expense Analytics</h3>
          <ExpenseChart />
        </div>

        {/* LIST */}
        <div className="card" style={{ flex: 1 }}>
          <h3>📋 Expense List</h3>
          <ExpenseList />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;