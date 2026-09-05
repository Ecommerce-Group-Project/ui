import { useEffect,useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { authApi } from "../api/authApi";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";

type TokenState = 'checking' | 'valid' | 'invalid'

export const useResetPassword = ()=>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [tokenState,setTokenState] = useState<TokenState>('checking');
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string|null>(null);


    useEffect(()=>{
        if(!token){
            setTokenState('invalid');
            return;
        }

        let cancelled = false;

        authApi.validateResetToken(token).then(()=>{
            if(!cancelled) setTokenState('valid');
        }).catch(()=>{
            if(!cancelled) setTokenState('invalid');
        })

        return ()=>{
            cancelled = true;
        }
    },[token]);

    const resetPassword = async (newPassword:string)=>{
        if(!token) return;

        setIsLoading(true);
        setError(null);

        try{
            await authApi.resetPassword({token,newPassword});
            navigate('/login?status=password_reset',{replace:true});
        }catch(error:any){
            setError(getErrorMessage(error));
            setTokenState('invalid');
        }finally{
            setIsLoading(false);
        }

        
    }

    return {tokenState,resetPassword,isLoading,error}
}