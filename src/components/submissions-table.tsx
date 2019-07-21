import React from "react";
import { style, keyframes } from "typestyle";
import { Submission } from "../models/submission";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface TableProps {
  subs: ReadonlyArray<Submission>;
}

const tableStyle = style({
  tableLayout: "fixed",
  width: "98vw",
  $nest: {
    "& td": {
      whiteSpace: "nowrap"
    },
    "& th:nth-child(1)": {
      width: "20%"
    },
    "& th:nth-child(2)": {
      width: "20%"
    },
    "& th:nth-child(3)": {
      width: "60%",
      overflow: "hidden"
    }
  }
});

const rowStyle = style({
  height: "1em",
  overflow: "hidden",
  $nest: {
    "&:nth-child(2n)": {
      backgroundColor: "lightgray"
    }
  }
});

const mageAnimationUpLeave = keyframes({
  from: {
    transform: "translate3d(0, 0, 0)"
  },
  to: {
    opacity: 0,
    transform: "translate3d(0, -100%, 0)"
  }
});

const mageAnimationUpEnter = keyframes({
  from: {
    opacity: 0,
    visibility: "hidden",
    transform: "translate3d(0, 100%, 0)"
  },
  to: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)"
  }
});

const mageStyle = style({
  $nest: {
    "&-enter": {
      opacity: 0
    },
    "&-enter-active": {
      opacity: 1,
      transition: "opacity 100ms ease-in"
    },
    "&-exit": {
      opacity: 1
    },
    "&-exit-active": {
      opacity: 0,
      transition: "opacity 100ms ease-in"
    }
  }
});

const mageStyleDelux = style({
  $nest: {
    "&-enter": {
      animationDuration: "300ms",
      animationFillMode: "both"
    },
    "&-enter-active": {
      animationName: mageAnimationUpEnter
    },
    "&-exit": {
      animationDuration: "300ms",
      animationFillMode: "both"
    },
    "&-exit-active": {
      transition: "all 300ms ease-out",
      animationName: mageAnimationUpLeave
    }
  }
});

export function SubmissionsTable(props: TableProps) {
  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th>subreddit</th>
          <th>author</th>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup component={null}>
          {props.subs.map(r => (
            <CSSTransition classNames={mageStyleDelux} key={r.id} timeout={300}>
              <tr key={r.id} className={rowStyle}>
                <td>{r.subreddit}</td>
                <td>{r.author}</td>
                <td>
                  <a href={r.url}>{r.title}</a>
                </td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </tbody>
    </table>
  );
}
