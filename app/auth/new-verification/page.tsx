import { NewVerifiationForm } from "@/components/auth/verification-form";
import { Suspense } from "react";

const NewVerificationPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewVerifiationForm />
        </Suspense>
    );
};

export default NewVerificationPage;