import {Form, NavLink} from "react-router-dom";
import  logomark from "../assets/logomark.svg"
import {TrashIcon} from '@heroicons/react/24/solid'
const Nav=(props)=>{
    const username=props.username;
    return(
        <nav>
            <NavLink to="/"aria-label="Go to home">
                <img src={logomark} alt="" height={30} />
                <span>HomeBudget</span>
            </NavLink>
            {username && (
                <Form method="post" action="logout" onSubmit={(e)=>
                    {
                        if(!window.confirm("Delete user and All Data"))
                        {
                            e.preventDefault();
                        }
                    }

                }>
                    <button type="submit" className="btn btn--warning">
                        <span>Delete User</span>
                        <TrashIcon width={20} />
                    </button>
                </Form>
            )
}
        </nav>
    );
};
export default Nav;