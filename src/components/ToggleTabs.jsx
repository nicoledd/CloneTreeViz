import "bootstrap/dist/css/bootstrap.css";
import { Tab, Tabs, Form } from "react-bootstrap";
import React, { useState } from "react";
import exampleTree from "./../files/exampleTree.json";

export default function ToggleTabs({ filtersSetter }) {

  let numSegments = exampleTree["segments"].length;
  const [filtersSeg, setFiltersSeg] = useState(
    new Array(numSegments).fill(true)
  );
  let optionsSegments = [];
  for (let i = 0; i < numSegments; i++) {
    let segmentId = "Id ".concat(String(i));
    let segmentChromosome = ", Chromosome ".concat(
      exampleTree["segments"][i]["chromosome"]
    );
    let segmentStart = ", Start ".concat(exampleTree["segments"][i]["start"]);
    let segmentStop = ", Stop ".concat(exampleTree["segments"][i]["stop"]);
    optionsSegments.push(
      <Form.Check
        type={"checkbox"}
        key={"segment".concat(String(i))}
        id={String(i)}
        name={exampleTree["segments"][i]["segment_id"]}
        checked={filtersSeg[String(i)]}
        label={segmentId
          .concat(segmentChromosome)
          .concat(segmentStart)
          .concat(segmentStop)}
        onChange={(e) => {
          let tmpArr = filtersSeg;
          tmpArr[String(i)] = !tmpArr[String(i)];
          setFiltersSeg(tmpArr);
          filtersSetter("segment", e.target.id, e.target.checked);
        }}
      />
    );
  }

  let numMutations = exampleTree["snvs"].length;
  let optionsMutations = [];
  const [filtersMut, setFiltersMut] = useState(
    new Array(numMutations).fill(true)
  );
  for (let i = 0; i < numMutations; i++) {
    let mutationId = "Mutation ".concat(String(i));
    let mutationSegmentId = ", Segment Id ".concat(
      exampleTree["snvs"][i]["segment_id"]
    );
    optionsMutations.push(
      <Form.Check
        type={"checkbox"}
        key={"mutation".concat(String(i))}
        id={String(i)}
        name={exampleTree["snvs"][i]["snv_id"]}
        label={mutationId.concat(mutationSegmentId)}
        checked={filtersMut[String(i)]}
        onChange={(e) => {
          let tmpArr = filtersMut;
          tmpArr[String(i)] = !tmpArr[String(i)];
          setFiltersMut(tmpArr);
          filtersSetter("mutation", e.target.id, e.target.checked);
        }}
      />
    );
  }

  return (
    <>
      <Tabs
        defaultActiveKey="segments"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="segments" title="Segments">
          <div style={{ height: "35vh", width: "30vw", overflow: "scroll" }}>
            {optionsSegments}
          </div>
        </Tab>
        <Tab eventKey="mutations" title="Mutations">
          <div style={{ height: "35vh", width: "30vw", overflow: "scroll" }}>
            {optionsMutations}
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
