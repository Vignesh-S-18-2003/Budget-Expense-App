import logo from './logo.svg';
import React from "react";
import Main, {MainLoader} from './layouts/Main';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import { logoutAction } from './actions/logout';
import Error from './pages/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import ExpensePage, { ExpenseAction, ExpenseLoader } from './pages/ExpensePage';
import BudgetPage, { BudgetAction, BudgetLoader, ExpenseActions } from './pages/BudgetPage';
import { deleteBudget } from './actions/deleteBudget';
const router = createBrowserRouter([
  { 
    path: "/",
    element: <Main />,
    loader:MainLoader,
    errorElement:<Error />,
    children: [
      {
        index:true,
        element:<Dashboard />, 
        loader: dashboardLoader,
        action:  dashboardAction,
        errorElement:<Error />
      },
      {
        path:"expenses",
        element:<ExpensePage />,
        loader: ExpenseLoader,
        action:ExpenseAction, 
        errorElement:<Error />
      },{
        path:"budget/:id",
        element:<BudgetPage />,
        loader:BudgetLoader,
        action:BudgetAction,
        errorElement:<Error />,
        children:[
          {
          path:"delete",
          action:deleteBudget
        }
        ]
      },
      {
        path: "logout",
        action:logoutAction
      }
    ]
  },
  {
    path: "*",
    element: <Error />
  }
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} /> 
      <ToastContainer />
    </div>
  );
}

export default App;
