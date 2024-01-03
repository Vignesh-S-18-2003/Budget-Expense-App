import React from 'react';
import {Link, useLoaderData} from "react-router-dom"
import {createBudget,createExpense, deleteExpenseItem, fetchData} from "../helpers"
import {toast} from "react-toastify"
import Intro from "../components/Intro";
import AddBudgetForm from '../components/AddBudgetFrom';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from "../components/BudgetITem";
import Table from '../components/Table';
export function dashboardLoader()
{
const username=fetchData("username");
const budget=fetchData("budget");
const expense=fetchData("expense")
return {username,budget,expense}
}
export async function dashboardAction({request}){
  const data= await request.formData();
  const { _action, ...values}=Object.fromEntries(data);
  console.log(values.newBudgetAmount);
  if(_action==="newuser")
  {
  try{
  localStorage.setItem("username",JSON.stringify(values.username));
  return toast.success(`Welcome, ${values.username}`);
  }
  catch(e)
  {
    throw new Error("There was a problem in Creating your Account.");
  }
  }
  if(_action==="createBudget")
  {
    try{
      createBudget(
        {
          name:values.newBudget,
          amount:values.newBudgetAmount,
        }
      )
      return toast.success("Budget Created")
    }
    catch(e){
      throw new Error("There was a problem in Creating budget");
    }
  }
  if(_action==="createExpense")
  {
    try{
      createExpense({
        name:values.newExpense,
        amount :values.newExpenseAmount,
        budgetId:values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} Created!`)
    }
    catch(e){
      throw new Error("There was a problem in creating your Expense.")
    }
  }
  if(_action==="deleteExpense")
  {
    try{
      console.log(values.expenseId)
      deleteExpenseItem({
      key:"expense",
      id:values.expenseId,
      })

      return toast.success("Expense Deleted!")
    }
    catch(e){
      throw new Error("There was a problem in creating your Expense.")
    }
  }
}

const Dashboard = () => {
   const {username,budget,expense}= useLoaderData()
  return (
    <>
    {username ? (<div className="dashboard">
      <h1>Welcome back,<span className="accent">{username}</span></h1>
      <div className="grid-sa">
        {
          //just for representing starting with new budget
          budget && budget.length>0 
          ?
        (
        <div className="grid-lg">
          <div className="flex-lg">
            <AddBudgetForm />
            <AddExpenseForm budget={budget}/>
          </div>
          <h2>Existing Budgets</h2>
          <div className="budgets">
            {
              budget.map((budget)=>
              (
                <BudgetItem key={budget.id} budget={budget} />
              ))
              }
          </div>
          {
            expense && expense.length>0 &&(
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table expense={expense.slice(0,8)} showBudget={true}/>
                {
                  expense.length>0 && (
                    <Link to="expenses" className="btn btn--dark">View All Expenses</Link>
                  )
                }
                 </div>
            )
          } 
        </div>
        ):
        (
          <div className="grid-sm">
            <p>Personal budgting os secret to financial freedom.</p>
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div> 
        )
}
      </div>
    </div>):<Intro />}
    </>
  );
};

export default Dashboard;