import { useState } from "react";

function BudgetTracker({ totalExpense }) {
  const [budget, setBudget] = useState("");

  const exceeded =
    budget && Number(totalExpense) > Number(budget);

  return (
    <div className="card">
      <h3>🎯 Monthly Budget</h3>

      <input
        type="number"
        placeholder="Enter Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <p style={{ marginTop: "10px" }}>
        Budget: ₹{budget || 0}
      </p>

      <p>
        Expenses: ₹{totalExpense}
      </p>

      {exceeded && (
        <p
          style={{
            color: "#ff6b6b",
            fontWeight: "bold",
          }}
        >
          ⚠ Budget Limit Exceeded
        </p>
      )}
    </div>
  );
}

export default BudgetTracker;