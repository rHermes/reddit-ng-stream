import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { keyframes, style } from "typestyle";
import { Submission } from "../models/submission";
import { useTransition, animated } from "react-spring";

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

export function PrettySubmissionsTable(props: TableProps) {
  const transitions = useTransition(props.subs, item => item.id, {
    from: {
      opacity: 0,
      height: "0em"
    },
    leave: {
      opacity: 0,
      height: "0em"
    },
    enter: {
      opacity: 1,
      height: "1em"
    }
  });

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
        {transitions.map((v, index) => (
          <animated.tr key={v.key} style={v.props}>
            <td>{v.item.subreddit}</td>
            <td>{v.item.author}</td>
            <td>
              <a href={v.item.url}>{v.item.title}</a>
            </td>
          </animated.tr>
        ))}
      </tbody>
    </table>
  );
}
