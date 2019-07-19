import React from "react";
import ReactDOM from "react-dom";
import Toy from "./components/toy";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw Error("Could not find root element");
}

const elm = <Toy />;
ReactDOM.render(elm, rootElement);
