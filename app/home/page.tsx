"use client"
import { CardCover } from "@/components/reusable/card-cover";
import Footer from "@/components/reusable/Footer";
import { MeasurementCard } from "@/components/reusable/measurement";
import { Navbar } from "@/components/reusable/navbar";
import { StoreCard } from "@/components/reusable/store-card";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {
    return ( 
    <div>
        <Navbar />
        <div className="w-full h-[700px] flex flex-col items-center justify-end px-10 xl:flex-row xl:gap-52 lg:flex-col lg:gap-20 md:gap-4 md:flex-col sm:flex-col gap-12 ">
            <div className="w-full flex items-center flex-col gap-8 xl:items-start px-32">
                <h2 className="text-6xl font-bold text-center lg:text-center xl:text-start xl:text-nowrap">Welcome to our Traditional <br />Thoab Clothing </h2>
                <Button className="rounded-2xl ">Explore More</Button>
            </div>
            <div className="w-full flex justify-end px-10 ">
             <video autoPlay muted loop src="/HeroVideo.mp4" className="rounded-4xl  lg:min-w-75"></video>

            </div>
        </div>
        <h1 className="flex justify-center text-3xl mt-8 font-bold px-10 xl:mt-0 sm:mt-8 ">Our Partner Stores</h1>
            <StoreCard/>
        <div className="mt-8 w-full flex justify-center px-10 xl:justify-start mb-50 flex-col gap-5">
        <h1 className="text-3xl font-bold px-10 xl:mt-10 sm:mt-8 xl:justify-start text-center">How to Measure</h1>
            <MeasurementCard title="Meausre Your hand"  discription="place the tape around your hand make sure to keep it tight" imageSource="/arm.jpg"/>
            <MeasurementCard title="Meausre Your hand" discription="place the tape around your hand make sure to keep it tight" imageSource="/arm.jpg"/>
        </div>
        <Footer />
    </div> 
    );
}
 
export default Home;