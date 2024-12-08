import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

// Add code to import the other components here under
import Budget from "./components/Budget";
import Remaining from "./components/Remaining.js";
import ExpenseTotal from "./components/ExpenseTotal.js";
import ExpenseList from "./components/ExpenseList.js";
import AllocationForm from "./components/AllocationForm.js";
import Currency from "./components/Currency";

import { AppProvider } from "./context/AppContext";
const App = () => {
  return (
    <AppProvider>
      <div className="container">
        <h1 className="mt-3">Company's Budget Allocation</h1>

        <div className="row mt-3">
          {/* Add Budget component here under */}
          <div className="col-sm">
            <Budget />
          </div>
          {/* Add Remaining component here under */}
          <div className="col-sm">
            <Remaining />
          </div>
          {/* Add ExpenseTotal component here under */}
          <div className="col-sm">
            <ExpenseTotal />
          </div>
          
          {/* Add Currency component here under */}
          <div className="col-sm">
            <Currency />
          </div>
          
        </div>

        {/* Add ExpenseList component here under */}
        <h3 className="mt-3">Allocation</h3>
        <div className="row">
          <div className="col-sm">
            <ExpenseList />
          </div>
        </div>

        {/* Add AllocationForm component here under */}
        <h3 className="mt-3">Change allocation</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <AllocationForm />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};
export default App;
