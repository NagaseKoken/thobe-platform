"use client";
import { useState, useEffect } from "react";
import { CardCover } from "@/components/reusable/card-cover";
import Footer from "@/components/reusable/Footer";
import { MeasurementCard } from "@/components/reusable/measurement";
import Navbar from "@/components/reusable/navbar";
import { StoreCard } from "@/components/reusable/store-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import saveMeasurements from "@/lib/saveMeasurements";  
import { getMeasurements } from "@/lib/getMeasurements"; 

const Home = () => {
  const [measurements, setMeasurements] = useState<any>(null);
  const [formData, setFormData] = useState({
    chest: "",
    waist: "",
    hips: "",
    height: "",
  });

  const userId = 1; 

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const data = await getMeasurements(userId); // Fetch measurements from lib
        setMeasurements(data);
      } catch (error) {
        // Log the entire error object
        console.error("Error fetching measurements:", error);
      }
    };

    fetchMeasurements();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await saveMeasurements(
        userId,
        formData.chest,
        formData.waist,
        formData.hips,
        formData.height
      );
      setMeasurements(response); 
      alert("Measurements saved successfully!");
    } catch (error) {
      console.error("Error saving measurements:", error);
      alert("Failed to save measurements");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-[700px] flex flex-col items-center justify-end px-10 xl:flex-row xl:gap-52 lg:flex-col lg:gap-20 md:gap-4 md:flex-col sm:flex-col gap-12 ">
        <div className="w-full flex items-center flex-col gap-8 xl:items-start px-32">
          <h2 className="text-6xl font-bold text-center lg:text-center xl:text-start xl:text-nowrap">
            Welcome to our Traditional <br />Thoab Clothing
          </h2>
          <Button className="rounded-2xl ">Explore More</Button>
        </div>
        <div className="w-full flex justify-end px-10 ">
          <video autoPlay muted loop src="/HeroVideo.mp4" className="rounded-4xl lg:min-w-75"></video>
        </div>
      </div>

      <h1 className="flex justify-center text-3xl mt-8 font-bold px-10 xl:mt-0 sm:mt-8 ">Our Partner Stores</h1>
      <StoreCard />

      <div className="mt-8 w-full flex justify-center px-10 xl:justify-start mb-50 flex-col gap-5">
        <h1 className="text-3xl font-bold px-10 xl:mt-10 sm:mt-8 xl:justify-start text-center">
          How to Measure
        </h1>
        <MeasurementCard
          title="Measure Your hand"
          discription="Place the tape around your hand. Make sure to keep it tight."
          imageSource="/arm.jpg"
        />
        <MeasurementCard
          title="Measure Your hand"
          discription="Place the tape around your hand. Make sure to keep it tight."
          imageSource="/arm.jpg"
        />
      </div>

      {}
      <div className="mt-10 px-10">
        <h2 className="text-2xl font-bold">Add Customer Measurements</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block">Chest:</label>
          <input
            type="number"
            name="chest"
            value={formData.chest}
            onChange={handleChange}
            placeholder="Enter chest measurement"
            className="input-field"
          />
          <label className="block">Waist:</label>
          <input
            type="number"
            name="waist"
            value={formData.waist}
            onChange={handleChange}
            placeholder="Enter waist measurement"
            className="input-field"
          />
          <label className="block">Hips:</label>
          <input
            type="number"
            name="hips"
            value={formData.hips}
            onChange={handleChange}
            placeholder="Enter hips measurement"
            className="input-field"
          />
          
          <label className="block">Height:</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Enter height measurement"
            className="input-field"
          />
          <Button type="submit" className="mt-4">Save Measurements</Button>
        </form>
      </div>

      {}
      <div className="mt-10 px-10">
        <h2 className="text-2xl font-bold">Customer Measurements</h2>
        {measurements ? (
          <ul className="mt-4">
            <li>Chest: {measurements.chest} cm</li>
            <li>Waist: {measurements.waist} cm</li>
            <li>Hips: {measurements.hips} cm</li>
            <li>Height: {measurements.height} cm</li>
          </ul>
        ) : (
          <p>No measurements found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
