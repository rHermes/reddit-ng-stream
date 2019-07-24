import React from "react";
import { LiveFeed } from "./livefeed";
import { Animu } from "./animu";

export default (props: {}) => {
  return (
    <div>
      <Animu />
      <LiveFeed subreddits={[]} rating="" />
    </div>
  );
};
