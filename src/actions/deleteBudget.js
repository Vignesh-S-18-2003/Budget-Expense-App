import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router";

export function deleteBudget({params}){
try{deleteItem({
    key:"budget",
    id:params.id
});
const associatedItems=getAllMatchingItems({
    category:"expense",
    key:"BudgetId",
    value:params.id
})
associatedItems.forEach((expense)=>{
    deleteItem({
        key:"expense",
        id:expense.id
    })
})
toast.success("Budget Deleted Successfully");
}
catch(e){
    throw new Error("There was a problem in deleting your Budget.");
}
return redirect("/");
}