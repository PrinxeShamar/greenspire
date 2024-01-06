import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white w-full rounded-lg page p-6 flex flex-col">
      <Header />
      <div className="bg-green-300 rounded-lg h-1 my-2"></div>
    </div>
  );
}
