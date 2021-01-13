import React, { Component } from "react";
import PostDataService from "../services/post.service";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getPost = this.getPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);

        this.state = {
            currentPost: {
                id:null,
                title: "",
                author: "",
                description: "",
                published: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentPost: { 
                    ...prevState.currentPost,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentPost: {
                ...prevState.currentPost,
                description: description
            }
        }));
    }

    getPost(id) {
        PostDataService.get(id)
            .then(response => {
                this.setState({
                    currentPost: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePost() {
        PostDataService.update(
            this.state.currentPost.id,
            this.state.currentPost)
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The post was updated successfully"
            });
        })
            .catch(e => {
                console.log(e);
        });
    }

    deletePost() {
        PostDataService.delete(this.state.currentPost.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/posts')
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    render() {
        const { currentPost } = this.state;

        return (
            <div>
                {currentPost ? (
                    <div className="edit-form">
                        <h4>Post</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title"><strong>Title</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentPost.title}
                                    onChange={this.onChangeTitle} />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Author:</strong>
                                </label>
                                <br />{currentPost.author}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description"><strong>Description</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentPost.description}
                                    onChange={this.onChangeDescription} />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Published:</strong>
                                </label> 
                                <br />{currentPost.published}
                            </div>
                        </form>
                        
                        <button className="badge badge-danger mr-2" onClick={this.deletePost}>Delete</button>
                        <button type="submit" className="badge badge-success" onClick={this.updatePost}>Update</button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Click on a Post</p>
                    </div>
                )}
            </div>
        );
    }
}