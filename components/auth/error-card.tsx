import { CardWrapper } from "@/components/auth/card-wrapper";
import { TriangleAlert } from 'lucide-react';

export const ErrorCard = () => {
    return ( 
       <CardWrapper headerLabel="Oops! something went wrong!" backButtonHref="/auth/login" backButtonLabel="Back to login">
            <div className="flex justify-center items-center w-full">
                <TriangleAlert className="text-destructive"/>
            </div>
       </CardWrapper>
     );
}
 
