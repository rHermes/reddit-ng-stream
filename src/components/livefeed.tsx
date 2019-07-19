import React, { useEffect, useState } from "react";
import { Submission } from "../models/submission";

interface Props {
  subreddits: ReadonlyArray<string>;
  rating?: string;
}

export function LiveFeed(props: Props) {
  const [subs, setSubs] = useState<ReadonlyArray<Submission>>([]);

  useEffect(() => {
    console.log("creating websocket");

    let urlParts: string[] = [];

    let url = "ws://localhost:8222/ws";
    const subFilter = props.subreddits.join(",");
    if (subFilter !== "") {
      urlParts.push("subreddits=" + subFilter);
    }

    if (props.rating !== undefined) {
      urlParts.push("rating=" + props.rating);
    }
    if (urlParts.length > 0) {
      url += "?" + urlParts.join("&");
    }
    const s = new WebSocket(url);

    s.addEventListener("message", m => {
      const jr: Submission = JSON.parse(m.data);
      console.log({ sub: jr.subreddit, title: jr.title });
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
