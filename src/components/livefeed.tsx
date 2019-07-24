import React, { useEffect, useRef, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { style } from "typestyle";
import { Submission } from "../models/submission";
import { SubmissionsTable } from "./submissions-table";
import { PrettySubmissionsTable } from "./pretty-submissions-table";

interface Props {
  subreddits: ReadonlyArray<string>;
  rating?: string;
}

const mageStyle = style({
  $nest: {
    "&-enter": {
      opacity: 0
    },
    "&-enter-active": {
      opacity: 1,
      transition: "opacity 500ms ease-in"
    }
  }
});

export function LiveFeed(props: Props) {
  const [subs, setSubs] = useState<ReadonlyArray<Submission>>([]);

  const savedSubs = useRef<ReadonlyArray<Submission>>(subs);

  useEffect(() => {
    savedSubs.current = subs;
  }, [subs]);

  useEffect(() => {
    console.log("creating websocket");

    const urlParts: string[] = [];

    let loc = window.location;
    let new_uri = "";
    if (loc.protocol === "https:") {
      new_uri = "wss:";
    } else {
      new_uri = "ws:";
    }
    new_uri += "//" + loc.host;
    new_uri += loc.pathname + "ws";

    let url = new_uri;
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
      try {
        const messages: string[] = m.data.split("\n");
        const jsubs: Submission[] = messages.map(v => JSON.parse(v));
        setSubs([...savedSubs.current, ...jsubs]);
      } catch (e) {
        console.log("We have the error: " + e);
        console.log(m.data);
      }
    });

    return () => {
      console.log("closing websocket");
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

      <PrettySubmissionsTable subs={subs.slice(-30)} />
    </div>
  );
}
