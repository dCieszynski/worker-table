import React, { useEffect, useState } from "react";
import { TWorker } from "../types";

type TSummary = {
  name: string;
  salary: number;
};

const departments = [
  { name: "IT", salary: 0 },
  { name: "Sales", salary: 0 },
  { name: "Administration", salary: 0 },
];

type Props = {
  isWorkerAdded: boolean;
};

const handleSummaries = (summaries: TSummary[], workers: TWorker[]) => {
  return summaries.map((summary) => {
    const salary: number = workers.reduce((acc: number, worker: TWorker) => {
      if (worker.department === summary.name) {
        let amount = worker.amount;
        if (worker.currency === "EUR") {
          amount = (parseFloat(worker.amount) * 1.07).toFixed(2);
        } else if (worker.currency === "PLN") {
          amount = (parseFloat(worker.amount) * 0.23).toFixed(2);
        }
        return acc + parseFloat(amount);
      }
      return acc;
    }, 0);
    return { name: summary.name, salary };
  });
};

function Summary({ isWorkerAdded }: Props) {
  const [summaries, setSummaries] = useState<TSummary[]>(departments);

  useEffect(() => {
    const workers = JSON.parse(localStorage.getItem("workers") || "[]");
    setSummaries(handleSummaries(summaries, workers));
  }, []);

  useEffect(() => {
    const workers = JSON.parse(localStorage.getItem("workers") || "[]");
    setSummaries(handleSummaries(summaries, workers));
  }, [isWorkerAdded]);

  return (
    <div>
      <h2>Summaries</h2>
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-cell">Department</th>
            <th className="table-cell">Salary</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary) => (
            <tr key={summary.name} className="table-row">
              <td className="table-cell">{summary.name}</td>
              <td className="table-cell">{summary.salary} USD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Summary;
