import "bootstrap/dist/css/bootstrap.css";
import React, {useState} from "react";
import example_tree from "./../files/exampleTree.json";
import { TabView, TabPanel } from "primereact/tabview";
import DataTableOfSegments from "./DataTableOfSegments.jsx";
import DataTableOfMutations from "./DataTableOfMutations.jsx";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.css";

export default function Tabs({ send_from_tab_to_app }) {

    let number_of_segments = example_tree["segments"].length;
    let number_of_mutations = example_tree["snvs"].length;
    let [saved_idxs_of_checked_segments, set_saved_idxs_of_checked_segments] = useState(Array.from(Array(number_of_segments).keys()));
    let [saved_idxs_of_checked_mutations, set_saved_idxs_of_checked_mutations] = useState(Array.from(Array(number_of_mutations).keys()));

    const obtain_idxs_of_mutations_corresponding_to_unchecked_segments = (idxs_of_checked_segments) => {
        let idxs_of_mutations_corresponding_to_checked_segments = []
        let number_of_mutations = example_tree["snvs"].length;
        let idxs_of_checked_segments_set = new Set(idxs_of_checked_segments)
        for (let i = 0; i < number_of_mutations; i++) {
            let idx_of_mutation = i;
            let segment_id_of_mutation = example_tree["snvs"][i]["segment_id"];
            if(!idxs_of_checked_segments_set.has(segment_id_of_mutation)){
                idxs_of_mutations_corresponding_to_checked_segments.push(idx_of_mutation)
            }
        }
        return idxs_of_mutations_corresponding_to_checked_segments;
    }

    const obtain_idxs_of_mutations_corresponding_to_newly_checked_segments = (idxs_of_checked_segments) => {
        let newly_checked_segments = idxs_of_checked_segments.filter(x => !saved_idxs_of_checked_segments.includes(x))
        let number_of_mutations = example_tree["snvs"].length;
        let idxs_of_mutations_corresponding_to_newly_checked_segments = []
        for (let i = 0; i < number_of_mutations; i++) {
            let idx_of_mutation = i;
            let segment_id_of_mutation = example_tree["snvs"][i]["segment_id"];
            if(newly_checked_segments.includes(segment_id_of_mutation)){
                idxs_of_mutations_corresponding_to_newly_checked_segments.push(idx_of_mutation)
            }
        }
        return idxs_of_mutations_corresponding_to_newly_checked_segments
    }


    const get_from_table_to_tab = (type, new_filters) => {
        if (type == "segment"){
            let idxs_of_checked_segments = []
            for(let i=0; i<new_filters.length; i++){
                idxs_of_checked_segments.push(parseInt(new_filters[i]['idx']))
            }
            set_saved_idxs_of_checked_segments(idxs_of_checked_segments)
            let idxs_of_mutations_corresponding_to_unchecked_segments = obtain_idxs_of_mutations_corresponding_to_unchecked_segments(idxs_of_checked_segments)

            // checked mutations = all mutations
            // - mutations corresponding to newly unchecked segments
            // - mutations that were previously unchecked
            // + mutations corresponding to newly checked segments

            let all_possible_mutations = Array.from(Array(number_of_mutations).keys())
            let old_unchecked_mutations = all_possible_mutations.filter(x => !saved_idxs_of_checked_mutations.includes(x))
            let new_and_old_mutations_to_uncheck = Array.from(new Set(old_unchecked_mutations.concat(idxs_of_mutations_corresponding_to_unchecked_segments)))
            let all_checked_mutations = all_possible_mutations.filter(x => !new_and_old_mutations_to_uncheck.includes(x))
            let idxs_of_mutations_corresponding_to_newly_checked_segments = obtain_idxs_of_mutations_corresponding_to_newly_checked_segments(idxs_of_checked_segments)
            all_checked_mutations = Array.from(new Set(all_checked_mutations.concat(idxs_of_mutations_corresponding_to_newly_checked_segments)))
            set_saved_idxs_of_checked_mutations(all_checked_mutations)
            send_from_tab_to_app(idxs_of_checked_segments, all_checked_mutations);
            set_saved_idxs_of_checked_segments(idxs_of_checked_segments)
        }

        if (type == "mutation"){
            let idxs_of_checked_mutations = [];
            for(let i=0; i<new_filters.length; i++){
                idxs_of_checked_mutations.push(parseInt(new_filters[i]['idx']))
            }
            set_saved_idxs_of_checked_mutations(idxs_of_checked_mutations);
            send_from_tab_to_app(saved_idxs_of_checked_segments, idxs_of_checked_mutations);
        }
    }

    return (
        <>
        <TabView>
            <TabPanel header="Segments">
                <DataTableOfSegments send_from_table_to_tab={get_from_table_to_tab} idxs_of_checked_segments={saved_idxs_of_checked_segments}/>
            </TabPanel>
            <TabPanel header="Mutations">
                <DataTableOfMutations send_from_table_to_tab={get_from_table_to_tab} idxs_of_checked_mutations={saved_idxs_of_checked_mutations}/>
            </TabPanel>
        </TabView>
        </>
  );
}
