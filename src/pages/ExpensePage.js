import { useLoaderData } from "react-router";
import { deleteExpenseItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";
export function ExpenseLoader()
{
const expense=fetchData("expense")
return {expense}
}
//action once deleted
export async function ExpenseAction({request})
{
const data=await request.formData();
const {_action, ...values}=Object.fromEntries(data);
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
const ExpensePage=()=>
{
    const {expense}=useLoaderData();
    console.log(expense);
    return <div className="grid-lg">
        <h1>All Expenses</h1>
        {
            expense && expense.length>0 ?(
                <div className="grid-md">
                    <h2>
                        Recent Expenses <small>({expense.length} Total)</small>
                    </h2>
                        <Table expense={expense}/>  
                      </div>
            ):(
                <p>No Expenses to show.</p>
            )
        }
    </div>
}
export default ExpensePage;