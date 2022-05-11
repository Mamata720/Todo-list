import React, { Component } from 'react';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      todo: "",
      category: "",
      records: [],
      id: "",
      task:''
    //   email: props.user._json.email,
    };
  }
  handleChange = (event) => {
    this.setState({ task: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createTask(this.state.task);
    this.setState({ task: '' });
  };

  addRecord = (event) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var body = JSON.stringify({ todo: this.state.name, location: this.state.location, email:this.state.email });
            console.log(body)
            fetch("http://localhost:8000/api/create",{
                method: "POST",
                headers: myHeaders,
                body: body,
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        todo: "",
                        location: "",
                        showAlert: true,
                        alertMsg: result.response,
                        alertType: "success",
                    });
                });
   };

   fetchAllRecords = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:8000/api/view", {
        method: "GET",
        headers: headers,
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("result", result);
            this.setState({
                records: result.response,
            });
        })
        .catch((error) => console.log("error", error));
};


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Enter ToDo" onChange={this.handleChange} value={this.state.task}></input>
                <button className="add_btn" onClick={this.addRecord}>save</button>
        {/* <input
          type="text"
          placeholder="Enter task"
          value={this.state.name}
          onChange={this.handleChange}
          autoFocus
        />
        <button className="add" type="submit" onClick={this.addRecord}>
          Add
        </button> */}
      </form>
    );
  }
}
