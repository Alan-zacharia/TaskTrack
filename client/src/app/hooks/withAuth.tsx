import React, { useEffect } from "react";
import { useRouter , usePathname  } from "next/navigation";
import useAuth from "../utils/useAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent : React.FC = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(()=>{
      if (!isAuthenticated && pathname !== "/auth") {
        router.push("/auth");
      }else if(isAuthenticated && pathname !== "/auth"){
        router.push("/")
      }
    },[isAuthenticated , router])
    
      return <WrappedComponent {...props}/>;
  };

  return AuthenticatedComponent;
};

export default withAuth; 