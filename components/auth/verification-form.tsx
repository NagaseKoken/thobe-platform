"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

import { useCallback,useEffect, useState } from "react";
import { BarLoader } from 'react-spinners'
import { useSearchParams } from "next/navigation";
export const NewVerifiationForm = () => {

    const [error,setError] = useState<string | undefined>()
    const [success,setSuccess] = useState<string | undefined>()
    const  searchParams = useSearchParams()
    const token = searchParams.get("token") //because the url contains token=xxxxxxx


    const onSubmit = useCallback(()=>{
        if(success || error) return;
        if(!token) {
            setError("Missing token!")
            return
        }
        //this method is to run the method which assign verified email and delete the token
        newVerification(token)
        .then(data => {
            setSuccess(data.success)
            setError(data.error)
        }).catch(()=>{
            setError("Something went wrong!")
        })
    },[token,success,error])



    useEffect(()=>{
        onSubmit()
    })

    return ( 
        <CardWrapper headerLabel="Confirming your verification" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <div className="flex items-center justify-center w-full">
                {!success && !error && (
                    <BarLoader />
                )}
                <FormSuccess message={success} />
                {!success && (<FormError message={error}/>)}
            </div>
        </CardWrapper>
     );
}
