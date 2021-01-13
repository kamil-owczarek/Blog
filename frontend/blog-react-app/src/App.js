import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, Route, Switch } from "react-router-dom";
import PostsList from "../src/components/posts-list.component";
import AddPost from "../src/components/add-post.component";
import Post from "../src/components/post.component";
import ContactForm from "../src/ContactForm"

class App extends Component {
    render() {
        return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
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
                <Link to={"/contact"} className="nav-link">
                    Contact
                </Link>
                </li>
            </div>
            </nav>

            <div className="container mt-3">
            <Switch>
                <Route exact path="/posts" component={PostsList} />
                <Route exact path="/add" component={AddPost} />
                <Route exact path="/posts/:id" component={Post} />
                <Route exact path="/contact" component={ContactForm} />
            </Switch>
            </div>
        </div>
        );
    }
}

export default App;
