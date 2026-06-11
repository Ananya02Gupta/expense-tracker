import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ expenses }) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Tracker Report", 14, 20);

    const tableData = expenses.map((item) => [
      item.category,
      item.amount,
      item.note || "-"
    ]);

    autoTable(doc, {
      head: [["Category", "Amount", "Note"]],
      body: tableData,
      startY: 30
    });

    doc.save("expense-report.pdf");
  };

  return (
    <button onClick={downloadPDF}>
      📄 Download PDF
    </button>
  );
}

export default ExportPDF;