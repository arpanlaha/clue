import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { Game, GameRoom, Home } from "./pages";

const { Content, Header } = Layout;

function App(): ReactElement {
  return (
    <Layout>
      <Header>
        <a href="/">
          <h1>Clue</h1>
        </a>
      </Header>
      <Content>
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
      </Content>
    </Layout>
  );
}

export default App;
