import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-teal-400 to-gray-500">
      <Link href="/home"><Button className="bg-white text-black shadow-2xl transition ease-in duration-300 hover:bg-black hover:text-white ">Go to Home page</Button></Link>
      <Link href="/admin/dashboard"><Button className="bg-white text-black shadow-2xl transition ease-in duration-300 hover:bg-black hover:text-white ">Go to Admin page</Button></Link>
    </div>
  );
}
