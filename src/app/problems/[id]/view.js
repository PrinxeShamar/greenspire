"use client";

export default function View({ problem }) {
  return (
    <div className="overflow-y-scroll flex-1 flex flex-col text-xs gap-2">
      <div className="flex flex-col">
        <div className="font-black text-green-400">Problem</div>
        <div className="">{problem.problem}</div>
      </div>
      <div className="flex flex-col">
        <div className="font-black text-yellow-300">Solution</div>
        <div className="">{problem.solution}</div>
      </div>
      <div className="flex gap-4 justify-center my-4">
        {Object.entries(problem.gpt).map(([metric, value], index) => {
          if (metric === "Industry") return;
          let total = value.After + value.Before;
          return (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className="font-black">{metric}</div>
              <div className="flex h-32 w-32 border-b-2 border-black items-end">
                <div className="flex-grow" />
                <div
                  className={`w-6 bg-red-400`}
                  style={{
                    height: `${(value.Before / total) * 100}%`,
                  }}
                ></div>
                <div className="flex-grow" />
                <div
                  className={`w-6 h-1/5 bg-blue-400`}
                  style={{
                    height: `${(value.After / total) * 100}%`,
                  }}
                ></div>
                <div className="flex-grow" />
              </div>
              <div className="text-[10px] text-center w-64">{value.Reason}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
