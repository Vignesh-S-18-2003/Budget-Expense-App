import { useLoaderData } from "react-router";
import { createExpense, deleteExpenseItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetITem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function BudgetLoader({params}){
    console.log(params.id);
    const budget=await getAllMatchingItems({
        category:"budget",
        key:"id",
        value:params.id
    })[0];
    const expense=await getAllMatchingItems({
        category:"expense",
        key:"budgetId",
        value:params.id
    });
    if(!budget){
        throw new Error("The budget you're trying to find does'nt Exist");
    }
    return {budget,expense};
    
}
//action once deleted
export async function BudgetAction({request})
{
const data=await request.formData();
const {_action, ...values}=Object.fromEntries(data);
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
const BudgetPage=()=>{
const {budget,expense}=useLoaderData();
return <div className="grid-lg">
    <h1 className="h2">
        <span className="accent">{budget.name}</span>
        Overview
    </h1>
    <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true}/>
        <AddExpenseForm budget={[budget]}/>
    </div>
    {
        expense && expense.length>0 &&(
            <div className="grid-md">
                <h2>
                    <span className="accent">{budget.name}</span>
                    Expenses
                </h2>
                <Table expense={expense} showBudget={false}/>
            </div>

        )
    }
</div>
}
export default BudgetPage;