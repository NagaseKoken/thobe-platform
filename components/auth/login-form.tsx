'use client'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useState, useTransition } from 'react';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { LoginSchema } from '@/schemas';
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { login } from "@/actions/login";

export const LoginForm = () => {
    const searchParams = useSearchParams()


    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider":""
    const [showTwoFactor,setShowTwoFactor] = useState(false)
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        
        setError("")
        setSuccess("")

        startTransition( ()=>{
            login(values)
            .then((data)=>{
                if(data?.error){
                    form.reset()
                    setError(data.error)
                }
                if(data?.success){
                    form.reset()
                    setError(data.success)
                }
                // if(data?.twoFactor){
                //     setShowTwoFactor(true)
                // }
            })
            .catch(()=> setError("Something went wrong"))
        })
    }
    return (
            
        <CardWrapper headerLabel='Welcome back!' backButtonLabel="Don't have an account?" backButtonHref='/auth/register' showSocial>
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                    {/* {showTwoFactor && (
                            <FormField control={form.control} name='code' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='123456' type='code' disabled={isPending}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                        )} */}
                        
                            <>
                                <FormField control={form.control} name='email' render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='john.deo@example.com' type='email' disabled={isPending}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name='password' render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='******' type='password' disabled={isPending}/>
                                        </FormControl>
                                        <Button size='sm' variant='link' asChild className='px-0 font-normal'>
                                            <Link href="/auth/reset">
                                                Forgot password?
                                            </Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                            )}/>
                            </>
                        
                        
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type='submit' className='w-full' disabled={isPending}>
                        Login
                        {/* {showTwoFactor ? 'Confirm':'Login'} */}
                    </Button>
                </form>
            </Form>
        </CardWrapper>

    )
}