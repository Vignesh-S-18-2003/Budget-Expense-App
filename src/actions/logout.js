import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  deleteItem({
    key: "username",
  });
  deleteItem({
    key:"budget",
  });
  deleteItem({
    key:"expense"
  });
  toast.success("You've deleted your Account");
  return redirect("/");
}