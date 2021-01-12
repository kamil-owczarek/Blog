import React, { Component } from "react";
import PostDataService from "../services/post.service";
import { Link } from "react-router-dom";

export default class PostsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePost = this.setActivePost.bind(this);
        this.removeAllPosts = this.removeAllPosts.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            posts: [],
            currentPost: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrievePosts();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrievePosts() {
        PostDataService.getAll()
            .then(response => {
                this.setState({
                    posts: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrievePosts();
        this.setState({
            currentPost: null,
            currentIndex: -1
        });
    }

    setActivePost(post, index) {
        this.setState({
            currentPost: post,
            currentIndex: index
        });
    }

    removeAllPosts() {
        PostDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        PostDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    posts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, posts, currentPost, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" 
                                    type="button" 
                                    onClick={this.searchTitle}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Posts List</h4>

                    <ul className="list-group">
                        {posts && posts.map((post, index) => (
                            <li className={"list-group-item" + (index === currentIndex ? "active" : "")} 
                                onClick={() => this.setActivePost(post, index)}
                                key={index}>
                                {post.title}
                            </li>
                        ))}
                    </ul>

                    <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllPosts}>
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentPost ? (
                        <div>
                            <h4>Post</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentPost.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Author:</strong>
                                </label>{" "}
                                {currentPost.author}
                            </div>
                            <div>
                                <label>
                                    <strong>Published:</strong>
                                </label>{" "}
                                {currentPost.published}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentPost.description}
                            </div>

                            <Link to={"/posts/" + currentPost.id} className="badge badge-warning">Edit</Link>
                        </div>
                    ) : ( 
                        <div>
                            <br />
                            <p>Click on a Post</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}