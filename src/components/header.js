import Image from "next/image";

export default function Header() {
  return (
    <div className="flex text-black font-black text-md gap-16">
      <div className="flex flex-col justify-center items-center">
        <div className="flex">
          <Image src="/green.png" width="50" height="50" />
          <Image src="/inspire.png" width="50" height="50" />
        </div>
        <div className=" ">
          <span className="text-green-300">GREEN</span>
          <span className="text-yellow-300">SPIRE</span>
        </div>
      </div>
      <div className="flex flex-col justify-end text-neutral-500 hover:text-yellow-300">
        <div>Home</div>
      </div>
      <div className="flex flex-col justify-end text-neutral-500 hover:text-yellow-300">
        <div>Ideas</div>
      </div>
      <div className="flex flex-col justify-end text-neutral-500 hover:text-yellow-300">
        <div>Generators</div>
      </div>
    </div>
  );
}
