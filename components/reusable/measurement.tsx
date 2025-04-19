import Image from "next/image";
interface MeasurementProps {
    step?:string,
    title:string,
    discription:string,
    imageSource:string,
}
export const MeasurementCard = ({discription,imageSource,step,title}:MeasurementProps) => {
    return (
        <div className="flex flex-col gap-4 justify-center w-full items-center">
            <h1 className="text-2xl font-bold text-center">{step && `Step ${step || ''}`}</h1>
        <div className="flex md:w-[800px] md:h-[120px] border-y shadow-sm justify-center items-center gap-4 rounded-lg sm:p-2">
            <div className="text-start grow-1 text-lg px-5">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p>{discription}</p>
            </div>
            <div className="p-5 object-cover">
                <Image src={imageSource} alt={title} width={100} height={100}  className="rounded-md"/>
            </div>
        </div>
        </div> 
     );
}
 
