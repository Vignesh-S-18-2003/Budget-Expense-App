import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useRef,useEffect } from "react";
import { useFetcher } from "react-router-dom";

const AddExpenseForm=({budget})=>{
    const fetcher=useFetcher()
    const isSubmitting= fetcher.state==="submitting";
    const formRef=useRef();
    const focusRef=useRef();

useEffect(()=>{
    if(!isSubmitting)
    {
        //to clear the text once submitted
        formRef.current.reset()
        //to focus (i.e) we can type directly after submitting
        focusRef.current.focus()
    }
},[isSubmitting])
    return(
        <div className="form-wrapper">
            <h2 className="h3"> Add New <span className="accent">
                {
                    budget.length===1 && `${budget.map((budg)=>budg.name)}`
                }</span>{" "}
                Expense
                </h2>
                <fetcher.Form method="post" className="grid-sm" ref={formRef} >
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" name="newExpense" id="newExpense" placeholder="e.g., Coffee" ref={focusRef} required />                
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input type="number" step="0.01" inputMode="decimal" name="newExpenseAmount" id="newExpenseAmount" placeholder="e.g., 3.50" required/>
                    </div>
                    <div className="grid-xs" hidden={budget.length===1}>
                        <label htmlFor="newExpenseBudget">Budget Category</label>
                        <select name="newExpenseBudget" id="newExpenseBudget">
                        {
                            budget.sort((a,b)=>a.createdAt-b.createdAt
                            ).map((budg)=>{
                                return(
                                   <option value={budg.id}>
                                    {budg.name}
                                   </option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <input type="hidden" name="_action" value="createExpense" />
                    <button type="submit" className="btn btn--dark">
                    <span>Create Expense</span>
                    <PlusCircleIcon width={20} />
                </button>
                </fetcher.Form>
        </div>
    )
}
export default AddExpenseForm;