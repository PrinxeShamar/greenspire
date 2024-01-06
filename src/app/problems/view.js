"use client";

import { useRouter } from "next/navigation";

export default function View({ problems }) {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll flex-1 flex flex-col">
      {problems.map((problem, index) => {
        return (
          <div
            key={index}
            className="text-xs hover:bg-yellow-200 p-1"
            onClick={() => router.push(`/problems/${problem.id}`)}
          >
            <span className="bg-red-200 p-1 rounded-md mr-1 text-[8px] text-black">
              {problem.gpt.Industry}
            </span>

            {problem.problem}
          </div>
        );
      })}
    </div>
  );
}
