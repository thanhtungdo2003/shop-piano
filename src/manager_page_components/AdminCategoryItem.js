import axios from "axios";
import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getUri } from "../js/site";
import { useManager } from "./AdminContext";

function AdminCategoryItem({id, displayName, amount, slug}){
    const nav = useNavigate();
    const clickHandle = ()=>{
        nav("/manager/product/"+slug);
    }
    const {trigger, onTrigger} = useManager();
    const deleteCate = () => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Xóa danh mục "+displayName,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(getUri()+"/category/delete", {categoryId: id}, { withCredentials: true }).then((res) => {
                    onTrigger(Math.floor(Math.random()*10));
                }).catch((err) => {
                    toast.error(err.response.data.message, { position: "top-right" });
                })
            }
        })
    }
    return (<>
        <div className="category-admin-item" onClick={clickHandle}>
            <div className="category-admin-item-name">
                {displayName}
            </div>
            <div className="category-admin-item-amount">
                {amount}
            </div>
            <div className="category-admin-item-option">
                <button onClick={deleteCate}><Delete color="rgb(233, 59, 59)"/></button>
            </div>
        </div>
    </>)
}
export default AdminCategoryItem;