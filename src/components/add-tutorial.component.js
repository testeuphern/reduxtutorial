import React, { Component } from "react";
import { connect } from "react-redux";
import { createTutorial } from "../actions/tutorials";

class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);
    this. onChangeUserID=this.onChangeUserID.bind(this);
    this.state = {
      id: null,
      title: "",
      body: "",
      published: false,
      userId:"",
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeUserID(e) {
    this.setState({
      userId: e.target.value,
    });
  }


  onChangeDescription(e) {
    this.setState({
      body: e.target.value,
    });
  }

  saveTutorial() {
    const { title, body,userId } = this.state;

    this.props
      .createTutorial(title, body,userId)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,
          userId:data.userId,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      body: "",
      published: false,
      userId:"",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="title">User ID</label>
              <input
                type="text"
                className="form-control"
                id="userId"
                required
                value={this.state.userId}
                onChange={this.onChangeUserID}
                name="title"
              />
            </div>


            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="body"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createTutorial })(AddTutorial);
