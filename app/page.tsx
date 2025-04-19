import { Button } from "@/components/ui/button";
import Link from "next/link";
import {RegisterForm} from "@/components/auth/register-form";
export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <RegisterForm  />
    </div>
  );
}
