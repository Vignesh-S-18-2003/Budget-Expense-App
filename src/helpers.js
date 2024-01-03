export const fetchData=(key)=>{
    return JSON.parse(localStorage.getItem(key));
}
export const createBudget=({name, amount})=>{
     const newItem={
        id: crypto.randomUUID(),
        name:name,
        createdAt: Date.now(),
        amount: +amount,
     }
     const existingBudget=fetchData("budget") ?? [];
     return localStorage.setItem("budget",JSON.stringify([...existingBudget,newItem]))
}
export const createExpense=({name, amount, budgetId})=>{
    const newItem={
       id: crypto.randomUUID(),
       name:name,
       createdAt: Date.now(),
       amount: +amount,
       budgetId: budgetId
    }
    const existingExpense=fetchData("expense") ?? [];
    return localStorage.setItem("expense",JSON.stringify([...existingExpense,newItem]))
}
export const deleteItem=({key})=>{
    return localStorage.removeItem(key);
}
//total spent by budget
export const calculateSpentByBudget=(budgetId)=>{
    const expenses=fetchData("expense") ?? [];
    const budgetSpent=expenses.reduce((acc,expense)=>{         if(expense.budgetId !==budgetId)
         return acc
        return acc+=expense.amount
    },0)
    return budgetSpent;
}
//percentage formatting
export const formatPercentage=(amt)=>{
    return amt.toLocaleString(undefined,{
      style:"percent",
      minimumFractionDigits:0,  
    })
}
//getting items from local Storage
export const getAllMatchingItems=({category,key,value})=>{
    const data=fetchData(category)??[];
    return data.filter((item)=>(item[key]===value))
}
//Date formatting
export const formatDateToLocaleString=(date)=>{
   return new Date(date).toLocaleDateString();
}
// expense deletion
export const deleteExpenseItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        console.log(id);
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
}

//currency formatting
export const formatCurrency=(amt)=>{
    return amt.toLocaleString(undefined,{
        style:"currency",
        currency:"USD",    
    })
}