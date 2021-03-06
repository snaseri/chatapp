import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import ChatRoom from "./views/Room";
import RoomSelection from "./views/RoomSelection";


function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={RoomSelection} />
          <Route exact path="/:roomId" component={ChatRoom} />
        </Switch>
      </Router>
  );
}

export default App;
