import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/posts" className="navbar-brand">
            Blog
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add post
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Contact
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "posts"]} component={PostsList} />
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/post/:id" component={Post} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
