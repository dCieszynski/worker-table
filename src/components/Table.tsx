import React, { useEffect, useState } from "react";
import { TWorker } from "../types";

type Props = {
  workers: TWorker[];
};

function Table({ workers }: Props) {
  const [summary, setSummary] = useState(0);

  useEffect(() => {
    let summary = 0;
    workers.forEach((worker) => {
      let amount = worker.amount;
      if (worker.currency === "EUR") {
        amount = (parseFloat(worker.amount) * 1.07).toFixed(2);
      } else if (worker.currency === "PLN") {
        amount = (parseFloat(worker.amount) * 0.23).toFixed(2);
      }
      summary += parseFloat(amount);
    });
    setSummary(summary);
  }, [workers]);

  return (
    <div>
      <h2>Workers table</h2>
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-cell">#</th>
            <th className="table-cell">First name</th>
            <th className="table-cell">Last name</th>
            <th className="table-cell">Department</th>
            <th className="table-cell">Salary</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{index + 1}.</td>
              <td className="table-cell">{worker.firstName}</td>
              <td className="table-cell">{worker.lastName}</td>
              <td className="table-cell">{worker.department}</td>
              <td className="table-cell">
                {parseFloat(worker.amount).toFixed(2)} {worker.currency}
              </td>
            </tr>
          ))}
          <tr className="table-row">
            <td></td>
            <td></td>
            <td></td>
            <td className="table-cell">Summary:</td>
            <td className="table-cell">{summary} USD</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
