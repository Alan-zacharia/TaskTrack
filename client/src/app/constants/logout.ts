import axios from "axios";
import { toast } from "sonner";

export const userLogout = async(message : string | null)=>{
    localStorage.removeItem('authToken');   
    message ? toast.success(message) : null;
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`).catch((error)=>{
        console.error(error);
    })
 }