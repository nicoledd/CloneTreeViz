import React, {useState, useEffect} from 'react'
import './App.css'
import example_tree from './files/exampleTree.json'
import CloneTree from './components/CloneTree.jsx';
import ImportFile from './components/ImportFile.jsx';
import Tabs from './components/Tabs.jsx';
import {unionFind} from "./utils/unionfind.jsx";

function App() {

  const [displayed_nodes, set_displayed_nodes] = useState([]);
  const [displayed_edges, set_displayed_edges] = useState([]);

  function obtainInitGraph(){
    let num_nodes = example_tree['tree']['nodes'].length
    let num_edges = example_tree['tree']['edges'].length
    let init_nodes = []
    let init_edges = []
    for (let i=0; i<num_nodes; i++){
      let nodeId = example_tree['tree']['nodes'][i]['node_id']
      init_nodes.push({id: parseInt(nodeId), label: String(nodeId)})
    }
    for (let i=0; i<num_edges; i++){
      let u = example_tree['tree']['edges'][i][0]
      let v = example_tree['tree']['edges'][i][1]
      init_edges.push({from: parseInt(u), to: parseInt(v)})
    }
    return [init_nodes, init_edges]
  }

  const get_from_tab_to_app = (idxs_of_checked_segments, idxs_of_checked_mutations) => {

    let number_of_mutations = example_tree["snvs"].length;
    let number_of_segments = example_tree["segments"].length;

    let [initial_nodes, initial_edges] = obtainInitGraph();
    if (idxs_of_checked_segments.length==number_of_segments && idxs_of_checked_mutations.length==number_of_mutations){
      set_displayed_nodes(initial_nodes);
      set_displayed_edges(initial_edges);
      return;
    }
    let [new_nodes, new_edges] = unionFind(initial_nodes, initial_edges, idxs_of_checked_segments, idxs_of_checked_mutations);
    set_displayed_nodes(new_nodes);
    set_displayed_edges(new_edges);
  }

  useEffect(() => {
    let [initial_nodes, initial_edges] = obtainInitGraph();
    set_displayed_nodes(initial_nodes);
    set_displayed_edges(initial_edges);
  }, []);


  return (
    <>
      <div style={{width:'100vw',height:'100vh', display:'flex'}}>
        <div style={{flexDirection:"column", justifyContent:'space-around', alignItems:"center", display:'flex', width:'35vw',height:'80vh'}}>
            <h1>CloneTreeViz</h1>
            <ImportFile/>
            <Tabs send_from_tab_to_app={get_from_tab_to_app}/>
        </div>

        <hr/>
        <div style={{display:'flex', flexDirection:"row", width:'50vw',height:'80vh', marginRight:"2vw"}}>
            <div style={{height:'40vh'}}>
              <CloneTree nodes={displayed_nodes} edges={displayed_edges}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default App;
