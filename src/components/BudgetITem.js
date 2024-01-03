import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
    const { id, name, amount } = budget;
    console.log(id);
    console.log(name);
    console.log(amount);
    const spent = calculateSpentByBudget(id);

    return (
        <div className="budget">
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)}... spent - </small>
                <small>{formatCurrency(amount - spent)}... Remaining</small>
            </div>
            {showDelete ? (
                <Form
                    method="post"
                    action="delete"
                    onSubmit={(event) => {
                        if (!window.confirm("Are you sure you want to permanently delete this budget?")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type="submit" className="btn">
                        <span>Delete Budget</span>
                    </button>
                </Form>
            ) : (
                <Link to={`/budget/${id}`} className="btn">
                    <span>View Details</span>
                </Link>
            )}
        </div>
    );
};

export default BudgetItem;
