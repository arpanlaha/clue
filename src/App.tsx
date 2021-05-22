import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game, GameRoom, Home } from "./pages";

function App(): ReactElement {
  return (
    <Router>
      <Switch>
        <Route path="/:game/:character">
          <Game />
        </Route>
        <Route path="/:game">
          <GameRoom />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
