import { Switch, Route, Link } from "react-router-dom";

import Page1 from "../screens/Page1";
import Page2 from "../screens/Page2";
import { useEffect, useState } from "react";

const DataComponent = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => (setTimeout(() => setAnimate(true), 2000), []));

  return (
    <Switch>
      <Route path="/" exact>
        <div className="App">
          <h1 className={animate ? "animate-header-message" : "header-message"}>
            Are you vaccinated yet?!
          </h1>
          <Page1 />
        </div>
      </Route>
      <Route path="/update">
        <Page2 />
      </Route>
    </Switch>
  );
};

export default DataComponent;
