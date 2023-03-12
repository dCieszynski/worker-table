import React, { useState } from "react";
import { TWorker } from "../types";

type Props = {
  setWorkers: React.Dispatch<React.SetStateAction<TWorker[]>>;
};

type TCheckboxValues = {
  [key: string]: boolean;
};

function SearchForm({ setWorkers }: Props) {
  const [formValues, setFormValues] = useState({
    person: "",
    department: ["All"],
    min: 0,
    max: 5000,
  });
  const [checkboxValues, setCheckboxValues] = useState<TCheckboxValues>({
    it: false,
    sales: false,
    administration: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formValues.department.includes(value)) {
      setFormValues({
        ...formValues,
        department: formValues.department.filter((department) => department !== value),
      });
    } else {
      setFormValues({ ...formValues, department: [...formValues.department, value] });
    }
    setCheckboxValues({ ...checkboxValues, [name]: !checkboxValues[name] });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let workers: TWorker[] = JSON.parse(localStorage.getItem("workers") || "[]");
    const filteredWorkers = workers.filter((worker) => {
      const { person, department, min, max } = formValues;
      const { firstName, lastName, department: workerDepartment, amount } = worker;
      const isPersonMatch =
        firstName.toLocaleLowerCase().includes(person) ||
        lastName.toLocaleLowerCase().includes(person);
      const isDepartmentMatch =
        formValues.department.length === 1 && formValues.department[0] === "All"
          ? true
          : department.includes(workerDepartment);
      const isSalaryMatch = parseFloat(amount) >= min && parseFloat(amount) <= max;
      return isPersonMatch && isDepartmentMatch && isSalaryMatch;
    });
    console.log(formValues);
    console.log(filteredWorkers);
    setFormValues({ person: "", department: ["All"], min: 0, max: 5000 });
    setCheckboxValues({ it: false, sales: false, administration: false });
    setWorkers(filteredWorkers);
  };

  return (
    <div>
      <h2>Search</h2>
      <form className="form search" onSubmit={handleSubmit}>
        <label htmlFor="person" className="form-label">
          Person
          <input
            type="text"
            id="person"
            name="person"
            className="form-input"
            value={formValues.person}
            onChange={handleChange}
          />
        </label>
        <fieldset className="form-fieldset">
          <legend>Department</legend>
          <div>
            <label htmlFor="it">
              <input
                type="checkbox"
                id="it"
                name="it"
                value="IT"
                checked={checkboxValues.it}
                onChange={handleCheckboxChange}
              />
              IT
            </label>
          </div>
          <div>
            <label htmlFor="sales">
              <input
                type="checkbox"
                id="sales"
                name="sales"
                value="Sales"
                checked={checkboxValues.sales}
                onChange={handleCheckboxChange}
              />
              Sales
            </label>
          </div>
          <div>
            <label htmlFor="administration">
              <input
                type="checkbox"
                id="administration"
                name="administration"
                value="Administration"
                checked={checkboxValues.administration}
                onChange={handleCheckboxChange}
              />
              Administration
            </label>
          </div>
        </fieldset>
        <fieldset className="form-fieldset">
          <legend>Salary</legend>
          <label htmlFor="min" className="form-label range">
            Min
            <input
              type="number"
              id="min"
              name="min"
              className="form-input"
              value={formValues.min}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="max" className="form-label range">
            Max{" "}
            <input
              type="number"
              id="max"
              name="max"
              className="form-input"
              value={formValues.max}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <button type="submit" className="form-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
