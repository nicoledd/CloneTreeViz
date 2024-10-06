import Graph from 'react-vis-network-graph'

export default function CloneTree(props) {

    let graph = {
        nodes: props.nodes,
        edges: props.edges
    }
    let option = {
        nodes: {
            size: 50
        },
        layout: {
        hierarchical: {
            sortMethod: 'directed',
            shakeTowards: 'roots'
        }
        },
        interaction: {
        navigationButtons: true
        },
        edges: {
        color: "blue"
        },
        height: "900px"
    }

    const events = {
        hoverNode: function(event) {
            console.log("hoverNode", event, event.node);
        }
    };

    return (
      <>
        <Graph graph={graph} options={option} events={events}/>
      </>
    );
}
  