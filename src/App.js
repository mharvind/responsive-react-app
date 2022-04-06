import "./App.css";

import { Switch, Route, Link } from "react-router-dom";

import Page1 from "./screens/Page1";
import Page2 from "./screens/Page2";
import { useEffect, useState } from "react";
import DataComponent from "./higherOrderComponents/DataComponent";
import Breadcrumb from "./components/BreadcrumbComponent";

function App() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => (setTimeout(() => setAnimate(true), 2000), []));

  return (
    <Switch>
      <Route path="/" exact>
        <div className="App">
          <h1 className={animate ? "animate-header-message" : "header-message"}>
            TOGETHER WE CAN REDUCE COVIDE-19, LET’S STOP IT !
          </h1>
          <Page1 />
        </div>
      </Route>
      <Route path="/update">
        <Page2 />
      </Route>
    </Switch>
  );
}

export default App;
