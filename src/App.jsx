import React, { useState, useEffect } from "react";
import "./App.css";
import example_tree from "./files/exampleTree.json";
import CloneTree from "./components/CloneTree.jsx";
import ImportFile from "./components/ImportFile.jsx";
import Tabs from "./components/Tabs.jsx";
import { unionFind } from "./utils/unionfind.jsx";
import { MagicMotion } from "react-magic-motion";

function App() {
  const [displayed_nodes, set_displayed_nodes] = useState([]);
  const [displayed_edges, set_displayed_edges] = useState([]);
  const [saved_idxs_of_checked_segments, set_saved_idxs_of_checked_segments] = useState([]);
  const [saved_idxs_of_checked_mutations, set_saved_idxs_of_checked_mutations] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function obtainInitGraph() {
    let num_nodes = example_tree["tree"]["nodes"].length;
    let num_edges = example_tree["tree"]["edges"].length;
    let init_nodes = [];
    let init_edges = [];
    for (let i = 0; i < num_nodes; i++) {
      let nodeId = example_tree["tree"]["nodes"][i]["node_id"];
      init_nodes.push({ id: parseInt(nodeId), label: String(nodeId) });
    }
    for (let i = 0; i < num_edges; i++) {
      let u = example_tree["tree"]["edges"][i][0];
      let v = example_tree["tree"]["edges"][i][1];
      init_edges.push({ from: parseInt(u), to: parseInt(v) });
    }
    return [init_nodes, init_edges];
  }

  const get_from_tab_to_app = (
    idxs_of_checked_segments,
    idxs_of_checked_mutations
  ) => {
    let number_of_mutations = example_tree["snvs"].length;
    let number_of_segments = example_tree["segments"].length;

    let [initial_nodes, initial_edges] = obtainInitGraph();
    if (
      idxs_of_checked_segments.length == number_of_segments &&
      idxs_of_checked_mutations.length == number_of_mutations
    ) {
      set_displayed_nodes(initial_nodes);
      set_displayed_edges(initial_edges);
      set_saved_idxs_of_checked_mutations(idxs_of_checked_mutations);
      set_saved_idxs_of_checked_segments(idxs_of_checked_segments)
      return;
    }
    let [new_nodes, new_edges] = unionFind(
      initial_nodes,
      initial_edges,
      idxs_of_checked_segments,
      idxs_of_checked_mutations
    );
    set_displayed_nodes(new_nodes);
    set_displayed_edges(new_edges);
    set_saved_idxs_of_checked_mutations(idxs_of_checked_mutations);
    set_saved_idxs_of_checked_segments(idxs_of_checked_segments)
  };

  useEffect(() => {
    let [initial_nodes, initial_edges] = obtainInitGraph();
    set_displayed_nodes(initial_nodes);
    set_displayed_edges(initial_edges);
    let number_of_mutations = example_tree["snvs"].length;
    let number_of_segments = example_tree["segments"].length;
    set_saved_idxs_of_checked_mutations(Array.from(Array(number_of_mutations).keys()));
    set_saved_idxs_of_checked_segments(Array.from(Array(number_of_segments).keys()))
  }, []);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            width: isCollapsed ? "7vw" : "40vw",
            display: "flex",
            flexDirection: "column",
            paddingTop: "2rem",
            marginLeft: "1rem",
          }}
        >
          <MagicMotion>
            <aside
              style={{
                width: isCollapsed ? "1rem" : "50rem",
                display: "flex",
                flexDirection: "row",
                paddingLeft: isCollapsed ? "1.5rem" : "5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  justifyItems: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {!isCollapsed && (
                  <h1 style={{ margin: 0, fontFamily: "courier new" }}>
                    Clone Tree Viz
                  </h1>
                )}
                <div
                  style={{
                    display: "flex",
                    paddingLeft: "1rem",
                    alignItems: "auto",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      cursor: "pointer",
                      padding: 0,
                      border: 0,
                      backgroundColor: "white",
                    }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    {isCollapsed ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 12.9999V10.9999H15.4853L12.2427 7.75724L13.6569 6.34303L19.3137 11.9999L13.6569 17.6567L12.2427 16.2425L15.4853 12.9999H1Z"
                          fill="currentColor"
                        />
                        <path
                          d="M20.2877 6V18H22.2877V6H20.2877Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        style={{ minWidth: "24px", minHeight: "24px" }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.2877 11.0001V13.0001H7.80237L11.045 16.2428L9.63079 17.657L3.97394 12.0001L9.63079 6.34326L11.045 7.75748L7.80236 11.0001H22.2877Z"
                          fill="currentColor"
                        />
                        <path d="M3 18V6H1V18H3Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </aside>
          </MagicMotion>
          <MagicMotion>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100vw",
              }}
            >
              <aside
                style={{
                  backgroundColor: "white",
                  border: "2px solid darkblue",
                  padding: "1rem",
                  margin: "1rem 2rem 2rem",
                  borderRadius: "0.65rem",
                  width: isCollapsed ? "1.3rem" : "36vw",
                  height: "auto",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  overflow: "scroll",
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "start",
                    display: "flex",
                    width: "35vw",
                    height: "80vh",
                  }}
                >
                  <ImportFile />
                  <Tabs
                    key="exclude"
                    send_from_tab_to_app={get_from_tab_to_app}
                  />
                </div>
              </aside>
            </div>
          </MagicMotion>
        </div>

        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: isCollapsed ? "100vw" : "70vw",
            height: "83.5vh",
            margin: "1rem 0rem",
            marginTop: isCollapsed ? "4.6rem" : "5.7rem",
            marginRight: "3rem",
            borderRadius: "0.65rem",
            overflow: "scroll",
          }}
        >
          <CloneTree nodes={displayed_nodes} edges={displayed_edges} idxs_of_checked_mutations={saved_idxs_of_checked_mutations} idxs_of_checked_segments={saved_idxs_of_checked_segments}/>
        </div>
      </div>
    </>
  );
}

export default App;
