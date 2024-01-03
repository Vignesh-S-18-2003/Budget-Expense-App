import {useRef,useEffect} from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm=()=>{
    const fetcher=useFetcher();
    const isSubmitting= fetcher.state==="submitting";
    const formref=useRef();
    const focusref=useRef();
    useEffect(()=>{
        if(!isSubmitting)
        {
            //to clear the text once submitted
            formref.current.reset()
            //to focus (i.e) we can type directly after submitting
            focusref.current.focus()
        }
    },[isSubmitting])
    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create Budget
            </h2>
            <fetcher.Form method ="post" className="grid-sm" ref={formref}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder="e.g., Groceries" required ref={focusref} />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder="e.g., $300" required inputMode="decimal"/>
                </div>
                <input type="hidden" name="_action" value="createBudget"/>
                <button type="submit" className="btn btn--dark">
                    <span>Create budget</span>
                    <CurrencyDollarIcon width={20} />
                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddBudgetForm;