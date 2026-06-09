import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setExpenses(data);
    });

    return () => unsubscribe();
  }, []);

  // Group by category
  const categoryTotals = {};

  expenses.forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) + Number(item.amount);
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff"
        ]
      }
    ]
  };

  return (
    <div style={{ width: "300px", marginTop: "20px" }}>
      <h2>📊 Expense Chart</h2>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;