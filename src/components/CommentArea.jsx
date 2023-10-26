import { Component } from "react";
import { ListGroup } from "react-bootstrap";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

class CommentArea extends Component {
  state = {
    comments: [],
    elementId: "",
  };
  getComments = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/comments/${this.state.elementId}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNzViYmY2ZTNkZDAwMTQ5NWU0OTkiLCJpYXQiOjE2OTgzMzAwNTYsImV4cCI6MTY5OTUzOTY1Nn0.9x9RmmRurBGsr9KlkTIfv2m8q0aPS8fV5fyW7MmLyK8",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error while recieving Comments");
        }
      })
      .then((datas) => {
        console.log(datas);
        this.setState({ comments: datas });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  componentDidMount() {
    this.getComments();
  }

  render() {
    return (
      <ListGroup>
        <ListGroup.Item className="text-center py-2">
          <h6 className="py-0 my-0">Commenti: </h6>
        </ListGroup.Item>
        {this.state.comments.map((comment) => {
          return (
            <div>
              <CommentList />
              <ListGroup.Item key={comment.elementId} className="py-1">
                {comment.comment} - {comment.author} | {comment.rate}
              </ListGroup.Item>{" "}
            </div>
          );
        })}
        <AddComment />
      </ListGroup>
    );
  }
}
export default CommentArea;
