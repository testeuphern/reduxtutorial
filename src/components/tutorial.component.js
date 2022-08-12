import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTutorial, deleteTutorial } from "../actions/tutorials";
import TutorialDataService from "../services/tutorial.service";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTutorial = this.removeTutorial.bind(this);
    this.onChangeUserId=this.onChangeUserId.bind(this);
    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        body: "",
        userID:"",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title,
        },
      };
    });
  }

  onChangeUserId(e) {
    const userId = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          userId: userId,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
      },
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then((response) => {
        this.setState({
          currentTutorial: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      body: this.state.currentTutorial.body,
      userId:this.state.currentTutorial.userId,
      published: status,
    };

    this.props
      .updateTutorial(this.state.currentTutorial.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateTutorial(this.state.currentTutorial.id, this.state.currentTutorial)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeTutorial() {
    this.props
      .deleteTutorial(this.state.currentTutorial.id)
      .then(() => {
        this.props.history.push("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
            <div className="form-group">
                <label htmlFor="title">UsrID</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.userId}
                  onChange={this.onChangeuserId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.body}
                  onChange={this.onChangeDescription}
                />
              </div>

            </form>

            

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateTutorial, deleteTutorial })(Tutorial);
