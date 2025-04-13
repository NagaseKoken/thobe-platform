import Navbar from "@/components/reusable/navbar";
import { Button } from "@/components/ui/button";
const Home = () => {
    return ( 
    <div>
        <Navbar />
        <div className="w-full h-[700px] flex items-center justify-end gap-24 px-6">
            <div className="flex items-start flex-col gap-8">
            <h2 className="text-6xl font-bold text-start">Welcome to our Traditional <br />Thoab Clothing </h2>
            <Button className="rounded-2xl ">Explore More</Button>
            </div>
            <video autoPlay muted loop src="/HeroVideo.mp4" className="rounded-4xl w-4xl "></video>
        </div>
        <h1>Recently Added</h1>
        <div className="grid grid-cols-1 sm:grid-cols-">

        </div>
    </div> );
}
 
export default Home;