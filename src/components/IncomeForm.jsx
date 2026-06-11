import { useState } from "react";

function IncomeForm({ setIncome }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return;

    setIncome(Number(value));
    setValue("");
  };

  return (
    <div className="card">
      <h3>💰 Monthly Income</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Income"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button type="submit">
          Save Income
        </button>
      </form>
    </div>
  );
}

export default IncomeForm;