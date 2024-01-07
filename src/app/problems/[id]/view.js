"use client";

import cytoscape from "cytoscape";
import { useEffect } from "react";

export default function View({ problem }) {
  useEffect(() => {
    cytoscape({
      container: document.getElementById("cy"),

      elements: [
        // flat array of nodes and edges
        {
          // node n1
          group: "nodes", // 'nodes' for a node, 'edges' for an edge
          // NB the group field can be automatically inferred for you but specifying it
          // gives you nice debug messages if you mis-init elements

          data: {
            // element data (put json serialisable dev data here)
            id: "n1", // mandatory (string) id for each element, assigned automatically on undefined
            parent: "nparent", // indicates the compound node parent id; not defined => no parent
            // (`parent` can be effectively changed by `eles.move()`)
          },

          // scratchpad data (usually temp or nonserialisable data)
          scratch: {
            _foo: "bar", // app fields prefixed by underscore; extension fields unprefixed
          },

          position: {
            // the model position of the node (optional on init, mandatory after)
            x: 100,
            y: 100,
          },

          selected: false, // whether the element is selected (default false)

          selectable: false, // whether the selection state is mutable (default true)

          locked: true, // when locked a node's position is immutable (default false)

          grabbable: false, // whether the node can be grabbed and moved by the user

          pannable: false, // whether dragging the node causes panning instead of grabbing

          classes: ["foo", "bar"], // an array (or a space separated string) of class names that the element has

          // DO NOT USE THE `style` FIELD UNLESS ABSOLUTELY NECESSARY
          // USE THE STYLESHEET INSTEAD
          style: {
            // style property overrides
            "background-color": "red",
          },
        },

        {
          // node n2
          data: { id: "n2" },
          renderedPosition: { x: 200, y: 200 }, // can alternatively specify position in rendered on-screen pixels
        },

        {
          // node n3
          data: { id: "n3", parent: "nparent" },
          position: { x: 123, y: 234 },
        },

        {
          // node nparent
          data: { id: "nparent" },
        },

        {
          // edge e1
          data: {
            id: "e1",
            // inferred as an edge because `source` and `target` are specified:
            source: "n1", // the source node id (edge comes from this node)
            target: "n2", // the target node id (edge goes to this node)
            // (`source` and `target` can be effectively changed by `eles.move()`)
          },

          pannable: false, // whether dragging on the edge causes panning
        },
      ],

      layout: {
        name: "preset",
      },

      // so we can see the ids
      style: [
        {
          selector: "node",
          style: {
            label: "data(id)",
          },
        },
      ],
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col text-xs gap-2">
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
      <div id="cy" className="h-64">
        Hello
      </div>
    </div>
  );
}
