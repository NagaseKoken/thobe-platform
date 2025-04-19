'use client'

import { useState, useTransition } from 'react';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import Link from 'next/link';


export const RegisterForm = () => {
   
    return (
        // <CardWrapper headerLabel="Create an account" backButtonHref="/auth/login" backButtonLabel="Already have an account" showSocial>
        //     <Form>
        //         <form className='space-y-6' >
        //            <div className='space-y-4'>
        //            <FormField  name='name' render={({field}) => (
        //                 <FormItem>
        //                     <FormLabel>Name</FormLabel>
        //                     <FormControl>
        //                         <Input {...field} placeholder='John Deo' type='name' disabled={false}/>
        //                     </FormControl>
        //                     <FormMessage />
        //                 </FormItem>
        //             )}/>
        //              <FormField  name='email' render={({field}) =>(
        //                     <FormItem>
        //                         <FormLabel>Email</FormLabel>
        //                         <FormControl>
        //                             <Input {...field} placeholder='john.deo@example.com' type='email' disabled={false}/>
        //                         </FormControl>
        //                         <FormMessage />
        //                     </FormItem>
        //                 )}/>
        //                 <FormField  name='password' render={({field}) =>(
        //                     <FormItem>
        //                         <FormLabel>Password</FormLabel>
        //                         <FormControl>
        //                             <Input {...field} placeholder='******' type='password' disabled={false}/>
        //                         </FormControl>
        //                         <FormMessage />
        //                     </FormItem>
        //                 )}/>
        //            </div>
                   
        //            <Button type='submit' className='w-full' disabled={false}>
        //                 Create an account
        //            </Button>
        //         </form>
        //     </Form>
        // </CardWrapper>
    
        <CardWrapper headerLabel="Create an account" backButtonHref="/auth/login" backButtonLabel="Already have an account" showSocial >
        
                <form className='space-y-6' >
                   <div className='space-y-4'>
                            <label>Name</label>
                                <Input  placeholder='John Deo' type='name' disabled={false}/>
                                <label>Email</label>
                                    <Input  placeholder='john.deo@example.com' type='email' disabled={false}/>
                                <label>Password</label>
                                    <Input placeholder='******' type='password' disabled={false}/>
                   </div>

                   <Button  className='w-full' disabled={false} >
                        <Link href="/home">Create an account</Link>
                   </Button>
                   <div className="relative flex items-center py-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500">or continue with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                </form>
           
        </CardWrapper>
    )
}