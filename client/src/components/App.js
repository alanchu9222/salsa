import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./videos/StreamCreate";
import StreamEdit from "./videos/StreamEdit";
import StreamDelete from "./videos/StreamDelete";
import StreamList from "./videos/StreamList";
import StreamShow from "./videos/StreamShow";
import Header from "./Header2";
import history from "../history";
import "./App.css";
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/videos/new" exact component={StreamCreate} />
            <Route path="/videos/edit/:id" exact component={StreamEdit} />
            <Route path="/videos/delete/:id" exact component={StreamDelete} />
            <Route path="/videos/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
