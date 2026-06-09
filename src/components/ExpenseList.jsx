import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setExpenses(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📊 Your Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        expenses.map((exp) => (
          <div
            key={exp.id}
            style={{
              background: "#fff",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px"
            }}
          >
            <p>💰 Amount: ₹{exp.amount}</p>
            <p>📂 Category: {exp.category}</p>
            <p>📝 Note: {exp.note}</p>

            <button
              onClick={() => handleDelete(exp.id)}
              style={{
                background: "red",
                color: "white",
                padding: "5px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;