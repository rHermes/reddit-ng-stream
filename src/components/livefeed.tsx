import React, { useEffect, useState } from "react";
import { Submission } from "../models/submission";

interface Props {
  subreddits: ReadonlyArray<string>;
}

export function LiveFeed(props: Props) {
  const [subs, setSubs] = useState<ReadonlyArray<Submission>>([]);

  useEffect(() => {
    console.log("creating eventsource");

    let url = "http://stream.pushshift.io";
    const subFilter = props.subreddits.join(",");
    if (subFilter !== "") {
      url += "?subreddit=" + subFilter;
    }

    const s = new EventSource(url);

    s.addEventListener("rs", (ev: MessageEvent | Event) => {
      if (!("data" in ev)) {
        throw Error("Not a message type");
      }
      const rs: Submission = JSON.parse(ev.data);
    });

    return () => {
      console.log("closing eventsource");
      s.close();
    };
  }, [props.subreddits.join(",")]);

  return (
    <div>
      <ul>
        {props.subreddits.map(r => (
          <li key={r}>/r/{r}</li>
        ))}
      </ul>
    </div>
  );
}
