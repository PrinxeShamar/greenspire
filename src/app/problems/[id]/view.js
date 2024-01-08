"use client";

import cytoscape from "cytoscape";
import { useEffect } from "react";
import avsdf from "cytoscape-avsdf";

function getElements(adjacencyList) {
  let elements = [];
  Object.entries(adjacencyList).forEach(([node, edges]) => {
    elements.push({
      data: {
        id: node,
      },
    });
    edges.edges.forEach((edge) => {
      elements.push({
        data: {
          id: `${node}${edge.node}`,
          label: edge.relation,
          source: node,
          target: edge.node,
        },
      });
    });
  });
  return elements;
}

function createGraph(container, elements) {
  console.log(container);
  cytoscape({
    container: document.getElementById(container),
    elements: elements,
    layout: {
      name: "circle",
      avoidOverlap: true,
      fit: false,
    },
    wheelSensitivity: 0.5,
    style: [
      {
        selector: "node",
        style: {
          label: "data(id)",
          width: "50px",
          height: "50px",
        },
      },
      {
        selector: "edge",
        style: {
          label: "data(label)",
          "curve-style": "straight",
          "target-arrow-shape": "triangle",
          "text-rotation": "autorotate",
          "text-margin-y": "-20%",
        },
      },
    ],
  });
}

export default function View({ problem }) {
  useEffect(() => {
    createGraph("before", getElements(problem.adjacency_list.before));
    createGraph("after", getElements(problem.adjacency_list.after));
  }, []);

  return (
    <div className="flex-1 flex flex-col text-xs gap-2">
      <video height="200px" width="200px" controls>
        <source
          src={`https://hpvhyormhqzyycknztly.supabase.co/storage/v1/object/public/videos/${problem.id}-output.mp4`}
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col">
        <div className="font-black text-green-400">Problem</div>
        <div className="">{problem.problem}</div>
      </div>
      <div className="flex flex-col">
        <div className="font-black text-yellow-300">Solution</div>
        <div className="">{problem.solution}</div>
      </div>
      <div className="flex flex-col">
        <div className="font-black text-green-400">Metric Analysis</div>
        <div className="flex gap-4 justify-center my-4">
          {Object.entries(problem.gpt).map(([metric, value], index) => {
            if (
              metric === "Water Use" ||
              metric === "Waste Generation" ||
              metric === "Energy-Generation Mix" ||
              metric === "Greenhouse Gas Emissions"
            ) {
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
                  <div className="text-[10px] text-center w-64">
                    {value.Reason}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="flex h-fit flex-col">
        <div className="font-black text-yellow-300">Economy Graphs</div>
        <div className="flex justify-center">
          <div id="before" className="h-[500px] w-[500px]"></div>
          <div id="after" className="h-[500px] w-[500px]"></div>
        </div>
      </div>
    </div>
  );
}
