import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game, GameRoom, Home } from "./pages";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:game/:character" children={<Game />} />
        <Route path="/:game" children={<GameRoom />} />
        <Route exact path="/" children={<Home />} />
      </Switch>
    </Router>
  );
}

export default App;
