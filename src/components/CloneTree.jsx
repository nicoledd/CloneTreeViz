import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import React, { useState, useEffect } from "react";
import dagre from "cytoscape-dagre";
import Graph from "./Graph.jsx"
import Button from 'react-bootstrap/Button';

export default function CloneTree({ nodes, edges }) {
  cytoscape.use(dagre);

  const [all_ints_in_current_clicked_node, set_all_ints_in_current_clicked_node] = useState([])
  const [curr_node_to_display_graph_for, set_curr_node_to_display_graph_for] = useState(null);

  useEffect(() => {
    set_all_ints_in_current_clicked_node([])
    set_curr_node_to_display_graph_for(null)
  }, [nodes]);

  const elements = [];
  for (let i = 0; i < nodes.length; i++) {
    elements.push({ data: { id: nodes[i].id, label: nodes[i].label } });
  }
  for (let i = 0; i < edges.length; i++) {
    elements.push({
      data: { source: edges[i].from, target: edges[i].to, label: String(i) },
    });
  }

  let myCyRef;

  const layout = {
    name: "dagre",
    directed: true,
    animate: true,
    avoidOverlap: true,
  };

  let styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "white",
        width: 75,
        height: 30,
        label: "data(label)",
        color: "black",
        fontSize: 15,
        shape: "round-rectangle",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#4a56a6",
        "text-valign" : "center",
        "text-halign" : "center"
      }
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        color: "black",
        width: 75,
        height: 30,

      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#AAD8FF",
        "target-arrow-color": "#AAD8FF",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
    }
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "auto",
          height: "90vh",
          overflow: "scroll",
        }}
      >
        <div
          id="per-node-buttons"
          style={{
            height: "80vh",
            width: "auto",
            display:"flex",
            flexDirection:"row",
            border: "2px solid darkblue",
            borderRadius: "0.65rem",
            overflow: "scroll",
          }}
        >
          <CytoscapeComponent
            elements={elements}
            style={{ width: "30vw", height: "60vh" }}
            autounselectify={false}
            layout={layout}
            boxSelectionEnabled={true}
            stylesheet={styleSheet}
            cy={(cy) => {
              myCyRef = cy;
              cy.on("tap", "node", (evt) => {
                var node = evt.target;
                let raw_node_label = node.data().label
                let node_label_parts = raw_node_label.split(',')
                let int_node_label_parts = []
                for(let i=0; i<node_label_parts.length; i++){
                  int_node_label_parts.push(parseInt(node_label_parts[i]))
                }

                // if there's only one int, make this empty
                if (int_node_label_parts.length <= 1){
                  set_all_ints_in_current_clicked_node([])
                  let node_label = node.data().label;
                  set_curr_node_to_display_graph_for(node_label);
                }
                else{
                  set_curr_node_to_display_graph_for(null)
                  set_all_ints_in_current_clicked_node(int_node_label_parts)
                }
              });
              var layout = cy.makeLayout({ name: "dagre" });
              layout.run();
            }}
          />
          <div
            style={{
              display:"flex",
              flexDirection:"column",
              height:"30vh",
              gap: "10px",
              marginTop: "5rem",
              flexWrap: "wrap",
            }}
          >
            {all_ints_in_current_clicked_node.map((ele) => (
              <Button class="btn btn-sm" variant="outline-secondary" onClick={() => {set_curr_node_to_display_graph_for(ele); console.log("ele is", ele)}}>Node {ele}</Button>
            ))}
          </div>
        </div>
        <div
          style={{
            height: "35vh",
            width: "auto",
            border: "2px solid darkblue",
            borderRadius: "0.65rem",
            overflow: "scroll",
            marginTop: "1rem",
            paddingLeft:"2rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            paddingRight:"3rem",
          }}
        >
          <Graph curr_node={curr_node_to_display_graph_for}/>
        </div>
      </div>
    </>
  );
}
