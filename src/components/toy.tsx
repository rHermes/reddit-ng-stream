import React, { useState } from "react";
import { LiveFeed } from "./livefeed";

export default (props: {}) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>This is the first line</h1>
      <p>You have clicked the button {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <LiveFeed subreddits={[]} />
    </div>
  );
};
