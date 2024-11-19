import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import example_tree from "./../files/exampleTree.json";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/mira/theme.css";
import "primereact/resources/primereact.css";
import { MagicMotion } from "react-magic-motion";

export default function DataTableOfSegments({
  send_from_table_to_tab,
  idxs_of_checked_mutations,
}) {
  const obtain_all_possible_options_for_mutations = () => {
    let number_of_mutations = example_tree["snvs"].length;
    let all_possible_options_for_mutations = [];
    for (let i = 0; i < number_of_mutations; i++) {
      let idx_of_mutation = String(i);
      let id_of_mutation = example_tree["snvs"][i]["snv_id"];
      let segment_id_of_mutation = example_tree["snvs"][i]["segment_id"];
      let position_of_mutation = example_tree['snvs'][i]["position"];
      all_possible_options_for_mutations.push({
        idx: idx_of_mutation,
        id: id_of_mutation,
        seg_id: segment_id_of_mutation,
        pos: position_of_mutation,
      });
    }
    return all_possible_options_for_mutations;
  };

  const obtain_all_checked_mutations = () => {
    let number_of_mutations = example_tree["snvs"].length;
    let data_arr_of_checked_mutations = [];
    for (let i = 0; i < number_of_mutations; i++) {
      let idx_of_mutation = i;
      let id_of_mutation = example_tree["snvs"][i]["snv_id"];
      let segment_id_of_mutation = example_tree["snvs"][i]["segment_id"];
      let position_of_mutation = example_tree['snvs'][i]["position"];
      if (idxs_of_checked_mutations.includes(i)) {
        data_arr_of_checked_mutations.push({
          idx: String(idx_of_mutation),
          id: id_of_mutation,
          seg_id: segment_id_of_mutation,
          pos: position_of_mutation,
        });
      }
    }
    return data_arr_of_checked_mutations;
  };

  const paginator_left = <Button type="button" icon="pi pi-refresh" text />;
  const paginator_right = <Button type="button" icon="pi pi-download" text />;
  const rows_per_page = 10;

  let all_possible_options_for_mutations =
    obtain_all_possible_options_for_mutations();
  let all_checked_mutations = obtain_all_checked_mutations();
  const [saved_checked_mutations, set_saved_checked_mutations] = useState(
    all_checked_mutations
  );

  return (
    <>
      <MagicMotion>
        <div
          style={{
            marginLeft: "1rem",
          }}
        >
          <DataTable
            key="exclude"
            value={all_possible_options_for_mutations}
            stripedRows
            paginator
            rows={rows_per_page}
            removableSort
            selection={saved_checked_mutations}
            onSelectionChange={(e) => {
              set_saved_checked_mutations(e.value);
              send_from_table_to_tab("mutation", e.value);
            }}
            tableStyle={{ height: "35vh", width: "653px", overflow: "scroll" }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            paginatorLeft={paginator_left}
            paginatorRight={paginator_right}
          >
            <Column
              selectionMode="multiple"
              field="id"
              style={{ width: "25%" }}
              headerStyle={{ width: "3rem" }}
              header="Select All"
            ></Column>
            <Column
              field="id"
              sortable
              style={{ width: "25%" }}
              header="ID"
            ></Column>
            <Column
              field="seg_id"
              sortable
              style={{ width: "25%" }}
              header="Segment ID"
            ></Column>
            <Column
              field="pos"
              sortable
              style={{ width: "25%" }}
              header="Position"
            ></Column>
          </DataTable>
        </div>
      </MagicMotion>
    </>
  );
}
