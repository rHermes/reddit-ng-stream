import React from "react";
import { Submission } from "../models/submission";

interface Props {
  sub: Submission;
}

export function SubmissionBrief(props: Props) {
  const sub = props.sub;

  return (
    <div>
      <h3>{sub.title}</h3>
    </div>
  );
}
