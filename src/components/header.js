"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex font-black text-md gap-16 leading-5">
      <div className="flex flex-col justify-end items-center">
        <div className="flex">
          <Image src="/green.png" width="50" height="50" />
          <Image src="/inspire.png" width="50" height="50" />
        </div>
        <div className=" ">
          <span className="text-green-400 font-black">GREEN</span>
          <span className="text-yellow-300 font-black">SPIRE</span>
        </div>
      </div>
      <div className="text-xs flex flex-col justify-end text-neutral-500 hover:text-yellow-300">
        <div>Home</div>
      </div>
      <div className="text-xs flex flex-col justify-end text-neutral-500 hover:text-yellow-300">
        <div onClick={() => router.push("/problems")}>Problems</div>
      </div>
    </div>
  );
}
