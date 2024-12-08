import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { dispatch, currency, budget, expenses } = useContext(AppContext);

  const validateBudget = (event) => {
    const newBudget = event.target.value;
    
    if ( newBudget > 20000) {
      alert("The upper limit for budget is 20,000");
      return;
    };
    
    const totalExpenses = expenses.reduce((total, item) => {
      return (total = total + item.cost);
    }, 0);

    if (newBudget < totalExpenses) {
      alert("Budget amount can't be lower than amount spent so far")
      return;
    };

    dispatch({
      type: "SET_BUDGET",
      payload: parseInt(newBudget),
    });

    return;
  };

  return (
    <div className="alert alert-secondary">
      <span> Budget: {currency} </span> <input
        type="number" id="budget" step="10"
        value={budget} onChange={validateBudget}
      ></input>
    </div>
  );
};

export default Budget;
