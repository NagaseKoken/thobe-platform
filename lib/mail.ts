import {Resend} from 'resend'


const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email:string,token:string) => {
    //to detect the validity of the token
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">to confirm email.</a></p>`
    })
}

export const sendPasswordResetEmail = async (email:string,token:string) => {
    
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject: "Reset your password",
        html:`<p>Click <a href="${resetLink}">to reset your password.</a></p>`,
    })
}

export const sendTwoFactorEmail = async (email:string,token:string) =>{
    //No link because we are just sending the code
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"2FA code",
        html:`<p>Your 2FA code: ${token}</p>`
    })
}