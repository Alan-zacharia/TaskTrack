import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { userLogout } from "../constants/logout";



const useLogout = ()=>{
    const router = useRouter();
    const logout = async(message : string)=>{
        await userLogout(message)
       router.push("/auth")
    }
    return logout;
}

export default useLogout;