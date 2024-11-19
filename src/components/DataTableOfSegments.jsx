import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import example_tree from "./../files/exampleTree.json";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/mira/theme.css";
import "primereact/resources/primereact.css";
import { MagicMotion } from "react-magic-motion";

export default function DataTableOfSegments({
  send_from_table_to_tab,
  idxs_of_checked_segments,
}) {
  const paginator_left = <Button type="button" icon="pi pi-refresh" text />;
  const paginator_right = <Button type="button" icon="pi pi-download" text />;
  const rows_per_page = 10;

  let number_of_segments = example_tree["segments"].length;
  let data_arr_segments = [];
  for (let i = 0; i < number_of_segments; i++) {
    let idx_of_segment = String(i);
    let id_of_segment = example_tree["segments"][i]["segment_id"];
    let chromosome_of_segment = example_tree["segments"][i]["chromosome"];
    let start_of_segment = example_tree["segments"][i]["start"];
    let stop_of_segment = example_tree["segments"][i]["stop"];
    let number_of_mutations_on_this_segment = 0;
    let number_of_mutations = example_tree["snvs"].length;
    for (let j = 0; j < number_of_mutations; j++) {
      if (example_tree["snvs"][j]["segment_id"] == id_of_segment) {
        number_of_mutations_on_this_segment++;
      }
    }
    data_arr_segments.push({
      idx: idx_of_segment,
      id: id_of_segment,
      chr: chromosome_of_segment,
      start: start_of_segment,
      stop: stop_of_segment,
      num_mutations: number_of_mutations_on_this_segment,
    });
  }

  let data_arr_of_checked_segments = [];
  for (let i = 0; i < number_of_segments; i++) {
    let idx_of_segment = String(i);
    let id_of_segment = example_tree["segments"][i]["segment_id"];
    let chromosome_of_segment = example_tree["segments"][i]["chromosome"];
    let start_of_segment = example_tree["segments"][i]["start"];
    let stop_of_segment = example_tree["segments"][i]["stop"];
    let number_of_mutations_on_this_segment = 0;
    let number_of_mutations = example_tree["snvs"].length;
    for (let j = 0; j < number_of_mutations; j++) {
      if (example_tree["snvs"][j]["segment_id"] == id_of_segment) {
        number_of_mutations_on_this_segment++;
      }
    }
    if (idxs_of_checked_segments.includes(i)) {
      data_arr_of_checked_segments.push({
        idx: idx_of_segment,
        id: id_of_segment,
        chr: chromosome_of_segment,
        start: start_of_segment,
        stop: stop_of_segment,
        num_mutations: number_of_mutations_on_this_segment,
      });
    }
  }
  const [selected_segment_rows, set_selected_segment_rows] = useState(
    data_arr_of_checked_segments
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
            value={data_arr_segments}
            stripedRows
            paginator
            rows={rows_per_page}
            removableSort
            sortField="id"
            selection={selected_segment_rows}
            onSelectionChange={(e) => {
              set_selected_segment_rows(e.value);
              send_from_table_to_tab("segment", e.value);
            }}
            tableStyle={{ height: "35vh", width: "30vw", overflow: "scroll" }}
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
              field="chr"
              sortable
              style={{ width: "25%" }}
              header="Chr"
            ></Column>
            <Column
              field="start"
              sortable
              style={{ width: "25%" }}
              header="Start"
            ></Column>
            <Column
              field="stop"
              sortable
              style={{ width: "25%" }}
              header="Stop"
            ></Column>
            <Column
              field="num_mutations"
              sortable
              style={{ width: "25%" }}
              header="# Muts"
            ></Column>
          </DataTable>
        </div>
      </MagicMotion>
    </>
  );
}
