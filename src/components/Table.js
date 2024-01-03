import ExpenseItem from "./ExpenseItem";

const Table=({expense,showBudget})=>{

    return(
        <div className="table">
           <table>
            <thead>
                <tr>
                    {
                    ["Name","Amount","Date", showBudget?"Budget":"",""].map((i,index)=>(
                        <th key={index}>{i}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    expense.map((expense)=>(
                        <tr key={expense.id}>
                        <ExpenseItem expense={expense} showBudget={showBudget}/>
                        </tr>
                    ))
                }
            </tbody>
           </table>
         </div>
    )

}
export default Table;