import exampleTree from './../files/exampleTree.json'

export const find = node => {
    if (node.parent !== node) {
      node.parent = find(node.parent);
    }
    return node.parent;
  };
  
export const union = (node1, node2) => {
    const root1 = find(node1);
    const root2 = find(node2);
    if (root1 !== root2) {
        if (root1.rank < root2.rank) {
        root1.parent = root2;
        } else {
        root2.parent = root1;
        if (root1.rank === root2.rank) root1.rank += 1;
        }
    }
};

export const makeSet = (idInput) => {
    const singleton = {
      rank: 0,
      id: idInput
    };
    singleton.parent = singleton;
    return singleton;
};


// returns true if, while comparing u and v, finds that
// all relevant segments and mutations are the same
function computeIfNodesAreSame(u, v, segmentFilter, mutationFilter){
    let ans = true;
    // for every segment in the filter, if any are different, return false
    // for every mutation in the filter, if any are different, return false
    for(let idx=0; idx<segmentFilter.length; idx++){
        if(exampleTree['tree']['nodes'][u]['segments'][segmentFilter[idx]]['x'] != exampleTree['tree']['nodes'][v]['segments'][segmentFilter[idx]]['x']){
            return false;
        }
        if(exampleTree['tree']['nodes'][u]['segments'][segmentFilter[idx]]['y'] != exampleTree['tree']['nodes'][v]['segments'][segmentFilter[idx]]['y']){
            return false;
        }
    }
    for(let idx=0; idx<mutationFilter.length; idx++){
        if(exampleTree['tree']['nodes'][u]['snvs'][mutationFilter[idx]]['x_bar'] != exampleTree['tree']['nodes'][v]['snvs'][mutationFilter[idx]]['x_bar']){
            return false;
        }
        if(exampleTree['tree']['nodes'][u]['snvs'][mutationFilter[idx]]['y_bar'] != exampleTree['tree']['nodes'][v]['snvs'][mutationFilter[idx]]['y_bar']){
            return false;
        }
    }
    return ans;
}

export const unionFind = (initNodes, initEdges, segmentFilter, mutationFilter) => {
    
    // create a set for each node
    let sets = []
    for(let i=0; i<initNodes.length; i++){
      sets.push(makeSet(i));
    }

    // combine nodes where relevant segments+mutations are identical
    for(let i=0; i<initEdges.length; i++){
      let u = initEdges[i]['from'];
      let v = initEdges[i]['to'];
      let same = computeIfNodesAreSame(u,v,segmentFilter,mutationFilter);
      if(same){
        union(sets[u], sets[v])
      }
    }

    // obtain new node names
    let node_mapping = {}
    for(let i=0; i<initNodes.length; i++){
      let item = find(sets[i]).id
      if (item in node_mapping){
        node_mapping[item].push(i)
      }
      else{
        node_mapping[item] = [i]
      }
    }
    let node_names = {}
    for(const k in node_mapping){
      node_names[k] = node_mapping[k].join(",")
    }

    // obtain new edges
    let new_edges = []
    for(let i=0; i<initEdges.length; i++){
        let u = initEdges[i]['from'];
        let v = initEdges[i]['to'];
        // there is an edge if the two nodes are NOT part of the same set; i.e. part ! returns false
        let same = computeIfNodesAreSame(u,v,segmentFilter,mutationFilter);
        if(!same){
            let new_node_u = node_names[find(sets[u]).id]
            let new_node_v = node_names[find(sets[v]).id]
            new_edges.push([new_node_u, new_node_v])
        }

    }

    // obtain final names of nodes and edges
    let finalNodes = []
    let finalEdges = []
    let nameToId = {}
    let name_keys = Object.keys(node_names)
    for (let i=0; i<name_keys.length; i++){
      nameToId[node_names[name_keys[i]]] = i
      finalNodes.push({id: i, label: node_names[name_keys[i]]})
    }
    for (let i=0; i<new_edges.length; i++){
      finalEdges.push({from: nameToId[new_edges[i][0]], to: nameToId[new_edges[i][1]]})
    }
    return [finalNodes, finalEdges]
}
