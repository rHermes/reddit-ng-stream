import React from "react";
import { useSpring, animated } from "react-spring";

export function Animu({}) {
  const props = useSpring({
    from: {
      opacity: 0,
      color: "red"
    },
    to: {
      opacity: 1,
      color: "#ffaaee"
    }
  });

  return <animated.div style={props}>I will fade in {props.nn}</animated.div>;
}
