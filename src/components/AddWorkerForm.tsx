import React, { useState } from "react";

type Props = {
  isWorkerAdded: boolean;
  setIsWorkerAdded: (isWorkerAdded: boolean) => void;
};

function AddWorkerForm({ isWorkerAdded, setIsWorkerAdded }: Props) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    department: "IT",
    amount: "",
    currency: "USD",
  });
  const [errors, setErrors] = useState({ fistNameError: "", lastNameError: "", amountError: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    let firstNameError = "";
    let lastNameError = "";
    let amountError = "";

    if (formValues.firstName.length < 3) {
      firstNameError = "First name should be at least 3 characters long";
    }

    if (formValues.lastName.length < 3) {
      lastNameError = "Last name should be at least 3 characters long";
    }

    if (formValues.amount.length < 1) {
      amountError = "Amount should be at least 1 character long";
    }

    if (formValues.amount.length > 0 && isNaN(Number(formValues.amount))) {
      amountError = "Amount should be a number";
    }

    if (firstNameError || lastNameError || amountError) {
      setErrors({
        fistNameError: firstNameError,
        lastNameError: lastNameError,
        amountError: amountError,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateForm();
    console.log(isValid);
    if (isValid) {
      let workers = JSON.parse(localStorage.getItem("workers") || "[]");
      workers.push(formValues);
      localStorage.setItem("workers", JSON.stringify(workers));
      setFormValues({ firstName: "", lastName: "", department: "IT", amount: "", currency: "USD" });
      setIsWorkerAdded(!isWorkerAdded);
      setErrors({ fistNameError: "", lastNameError: "", amountError: "" });
    }
  };

  return (
    <div>
      <h2>Add worker</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="firstName" className="form-label">
          <div className="form-error">{errors.fistNameError}</div>
          First name
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-input"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="lastName" className="form-label">
          <div className="form-error">{errors.lastNameError}</div>
          Last name
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-input"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="department" className="form-label">
          Department{" "}
          <select
            id="department"
            name="department"
            className="form-input"
            value={formValues.department}
            onChange={handleChange}
          >
            <option value="It">IT</option>
            <option value="Sales">Sales</option>
            <option value="Administration">Administration</option>
          </select>
        </label>
        <fieldset className="form-fieldset">
          <legend>Salary</legend>
          <label htmlFor="amount" className="form-label">
            <div className="form-error">{errors.amountError}</div>
            Amount
            <input
              type="text"
              id="amount"
              name="amount"
              className="form-input"
              value={formValues.amount}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="currency" className="form-label">
            Currency
            <select
              id="currency"
              name="currency"
              className="form-input"
              value={formValues.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
            </select>
          </label>
        </fieldset>
        <button type="submit" className="form-button">
          Add worker
        </button>
      </form>
    </div>
  );
}

export default AddWorkerForm;
