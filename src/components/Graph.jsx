import React from "react";
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import example_tree from "./../files/exampleTree.json";

function obtain_series_for_segment_x_of_curr_node(node_idx, segment_idx){
  
    let curr_segment_id = example_tree['tree']['nodes'][node_idx]['segments'][segment_idx]['segment_id']
    let curr_segment_number_of_maternal_copies = example_tree['tree']['nodes'][node_idx]['segments'][segment_idx]['x']
    let curr_segment_number_of_paternal_copies = example_tree['tree']['nodes'][node_idx]['segments'][segment_idx]['y']
    if(curr_segment_number_of_maternal_copies == 0){
      curr_segment_number_of_maternal_copies += 0.05
    }
    if(curr_segment_number_of_paternal_copies == 0){
      curr_segment_number_of_paternal_copies += 0.05
    }
    if(curr_segment_number_of_maternal_copies == curr_segment_number_of_paternal_copies){
      curr_segment_number_of_paternal_copies += 0.05
    }
    let start = -1
    let end = -1

    let number_of_segments = example_tree['segments'].length
    for(let i=0; i<number_of_segments; i++){
        if(example_tree['segments'][i]['segment_id'] == curr_segment_id){
           start = example_tree['segments'][i]['start'] / 10**7
           end = example_tree['segments'][i]['stop'] / 10**7
           break
        }
    }

    start = Math.round(start * 10) / 10
    end = Math.round(end * 10) / 10
    let number_of_nucleotide_bases_in_each_chromosome = [24, 24, 20, 19, 18, 17, 15, 14, 13, 13, 13, 13, 11, 10, 10, 9, 8, 7, 6, 6, 4, 4]
    let prefix_sum_number_of_nucleotide_bases_in_each_chromosome = [0]
    for(let i=1; i<number_of_nucleotide_bases_in_each_chromosome.length; i++){
        prefix_sum_number_of_nucleotide_bases_in_each_chromosome.push(prefix_sum_number_of_nucleotide_bases_in_each_chromosome[i-1] + number_of_nucleotide_bases_in_each_chromosome[i]);
    }
    let number_of_nucleotide_bases_in_genome = prefix_sum_number_of_nucleotide_bases_in_each_chromosome[prefix_sum_number_of_nucleotide_bases_in_each_chromosome.length-1];
    let categories = ['0']
    for (let i=0; i<number_of_nucleotide_bases_in_genome; i++){
        categories.push((i+0.1).toString())
        categories.push((i+0.2).toString())
        categories.push((i+0.3).toString())
        categories.push((i+0.4).toString())
        categories.push((i+0.5).toString())
        categories.push((i+0.6).toString())
        categories.push((i+0.7).toString())
        categories.push((i+0.8).toString())
        categories.push((i+0.9).toString())
        categories.push((i+1).toString())
    }

    let start_index_in_categories = -1
    let end_index_in_categories = -1

    for (let i=0; i<categories.length; i++){
        if (categories[i] == start.toString()){
            start_index_in_categories = i
        }
        if (categories[i] == end.toString()){
            end_index_in_categories = i
        }
    }
    
    let data_maternal = new Array(categories.length).fill(null)
    for(let i=start_index_in_categories; i<end_index_in_categories+1; i++){
        data_maternal[i] = curr_segment_number_of_maternal_copies;
    }
    let data_paternal = new Array(categories.length).fill(null)
    for(let i=start_index_in_categories; i<end_index_in_categories+1; i++){
        data_paternal[i] = curr_segment_number_of_paternal_copies;
    }
    let series_maternal = {
        name: "# Maternal Copies",
        type: "line",
        color: "#32a852",
        data: data_maternal,
    }
    let series_paternal = {
        name: "# Paternal Copies",
        type: "line",
        color: "#E91E63",
        data: data_paternal,
    }
    let series = [series_maternal, series_paternal]
    return series
}

function obtain_series_for_all_checked_segments_of_curr_node(curr_node_idx, idxs_of_checked_segments){
    let series_for_all_checked_segments_of_curr_node = []
    for(let i=0; i<idxs_of_checked_segments.length; i++){
      let [series_maternal, series_paternal] = obtain_series_for_segment_x_of_curr_node(curr_node_idx, idxs_of_checked_segments[i])
      series_for_all_checked_segments_of_curr_node.push(series_maternal)
      series_for_all_checked_segments_of_curr_node.push(series_paternal)
    }
    return series_for_all_checked_segments_of_curr_node;
}


export default function Graph({curr_clone, idxs_of_checked_mutations, idxs_of_checked_segments}) {

    if(curr_clone == null){
        return (
            <>
            </>
        );
    }

  const myLabels = [];
  for (let i = 0; i < 1000; i++) {
    myLabels.push(i.toString());
  }

  let number_of_nucleotide_bases_in_each_chromosome = [24, 24, 20, 19, 18, 17, 15, 14, 13, 13, 13, 13, 11, 10, 10, 9, 8, 7, 6, 6, 4, 4]
  let prefix_sum_number_of_nucleotide_bases_in_each_chromosome = [0]
  for(let i=1; i<number_of_nucleotide_bases_in_each_chromosome.length; i++){
    prefix_sum_number_of_nucleotide_bases_in_each_chromosome.push(prefix_sum_number_of_nucleotide_bases_in_each_chromosome[i-1] + number_of_nucleotide_bases_in_each_chromosome[i]);
  }
  let number_of_nucleotide_bases_in_genome = prefix_sum_number_of_nucleotide_bases_in_each_chromosome[prefix_sum_number_of_nucleotide_bases_in_each_chromosome.length-1];
  let categories = ['0']
  for (let i=0; i<number_of_nucleotide_bases_in_genome; i++){
    categories.push((i+0.1).toString())
    categories.push((i+0.2).toString())
    categories.push((i+0.3).toString())
    categories.push((i+0.4).toString())
    categories.push((i+0.5).toString())
    categories.push((i+0.6).toString())
    categories.push((i+0.7).toString())
    categories.push((i+0.8).toString())
    categories.push((i+0.9).toString())
    categories.push((i+1).toString())
  }

  let curr_node_idx = -1
  for (let i=0; i<example_tree['tree']['nodes'].length; i++){
    if(example_tree['tree']['nodes'][i]['node_id'] == curr_clone){
        curr_node_idx = i
    }
  }

  // obtain series for all segments of curr node
  let series = obtain_series_for_all_checked_segments_of_curr_node(curr_node_idx, idxs_of_checked_segments);

  let snv_data = []
  for(let i=0; i<idxs_of_checked_mutations.length; i++){
    let position = example_tree['snvs'][idxs_of_checked_mutations[i]]['position']/10**7
    position = Math.round(position * 10) / 10
    snv_data.push([position*10, 0])
  }
  series.push({
    type: 'scatter',
    name: 'Mutation',
    data: snv_data,
    color: "#79abe4",
  })

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false,
    },
    labels: myLabels,
    markers: {
      size: 0,
    },
    xAxis: {
      categories: categories,
      labels: {
        //step:1,
        formatter: function() {
          let number_of_nucleotide_bases_in_each_chromosome = [24, 24, 20, 19, 18, 17, 15, 14, 13, 13, 13, 13, 11, 10, 10, 9, 8, 7, 6, 6, 4, 4]
          let prefix_sum_number_of_nucleotide_bases_in_each_chromosome = [0]
          for(let i=1; i<number_of_nucleotide_bases_in_each_chromosome.length; i++){
            prefix_sum_number_of_nucleotide_bases_in_each_chromosome.push(prefix_sum_number_of_nucleotide_bases_in_each_chromosome[i-1] + number_of_nucleotide_bases_in_each_chromosome[i]);
          }
          for(let i=0; i<prefix_sum_number_of_nucleotide_bases_in_each_chromosome.length-1; i++){
            if(this.value.toString() == prefix_sum_number_of_nucleotide_bases_in_each_chromosome[i].toString()){
              return "Chrom ".concat(i.toString());
            }
          }
          return '';
        },
      }
    },
    yAxis: {
      title: {
        text: "Number of Copies",
      },
    },
    series: series,
    tooltip: {
      formatter: function(){
        let number_of_mutations = example_tree['snvs'].length;
        let position_mapped_to_ids_of_snvs = {}
        for(let i=0; i<number_of_mutations; i++){
          let position = example_tree['snvs'][i]['position']/10**7
          let id = example_tree['snvs'][i]['snv_id']
          position = Math.round(position * 10) / 10
          position_mapped_to_ids_of_snvs[position*10] = id
        }
        if (this.series.name == "Mutation"){
          return this.series.name + " ID: " + position_mapped_to_ids_of_snvs[this.x*10]
        }
        else{
          return this.series.name;
        }
      }
    }
  };

  return (
    <>
        <HighchartsReact highcharts={Highcharts} options={options} height={200} width={700} />
    </>
  );
}
