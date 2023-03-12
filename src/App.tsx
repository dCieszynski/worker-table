import React, { useState, useEffect } from "react";
import AddWorkerForm from "./components/AddWorkerForm";
import SearchForm from "./components/SearchForm";
import Summary from "./components/Summary";
import Table from "./components/Table";
import { TWorker } from "./types";

function App() {
  const [workers, setWorkers] = useState<TWorker[]>([]);
  const [isWorkerAdded, setIsWorkerAdded] = useState(false);

  useEffect(() => {
    const workers = JSON.parse(localStorage.getItem("workers") || "[]");
    setWorkers(workers);
  }, []);

  useEffect(() => {
    const workers = JSON.parse(localStorage.getItem("workers") || "[]");
    setWorkers(workers);
  }, [isWorkerAdded]);

  return (
    <div>
      <h1>Workers</h1>
      <div className="content">
        <div className="container">
          <Table workers={workers} />
          <Summary isWorkerAdded={isWorkerAdded} />
        </div>
        <div className="container forms">
          <SearchForm setWorkers={setWorkers} />
          <AddWorkerForm isWorkerAdded={isWorkerAdded} setIsWorkerAdded={setIsWorkerAdded} />
        </div>
      </div>
    </div>
  );
}

export default App;
