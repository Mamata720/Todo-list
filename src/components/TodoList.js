
import React from "react";
import '../ToDo.css'
class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            records: [],
            showAlert: false,
            update:false,
            id:"",
            alertMsg: "",
            alertType: "success",
            email:props.user._json.email
            
        };
        this.addRecord = this.addRecord.bind(this);
    }
    
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,

        });
    };
    
    componentWillMount() {
        this.fetchAllRecords();
    }
    addRecord = (event) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify({ name: this.state.name, location: this.state.location, email:this.state.email });
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
                    name: "",
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


    editRecord = (id) => {
        fetch("http://localhost:8000/api/view/" + id, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    id: id,
                    update: true,
                    name: result.response[0].todo,
                    location: result.response[0].location,
                });
            })
            .catch((error) => console.log("error", error));
    };

    // update record
    updateRecord = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var body = JSON.stringify({ id: this.state.id, todo: this.state.name, location: this.state.location });
		fetch("http://localhost:8000/api/update", {
			method: "PUT",
			headers: myHeaders,
			body: body,
		})
			.then((response) => response.json())
			.then((result) => {
				this.setState({
					showAlert: true,
					alertMsg: result.response,
					alertType: "success",
					update: false,
					id: "",
                    todo: "",
					category: "",
				});
				this.fetchAllRecords();
			})
			.catch((error) => console.log("error", error));
	};
    deleteRecord = (id) => {
        fetch("http://localhost:8000/api/delete/" + id, {
            method: "DELETE",
            
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    showAlert: true,
                    alertMsg: result.response,
                    alertType: "danger",
                });
                this.fetchAllRecords();
            })
            .catch((error) => console.log("error", error));
    };
    render(props) {
        
        


        return (
            <div className="">

            <div className="mainContainer">
            {/* <input type="text" placeholder="Enter a new name" ref={(ref) => this.nameTextInput = ref} className="form-control"onChange={this.handleChange} value={this.state.name} />
            <br />
            <button type="button" className="btn btn-success" onClick={this.addRecord}>Add</button>
            <br/>
            <div>{names}</div>
                             */}
                <input type="text" name="name" placeholder="Enter ToDo" onChange={this.handleChange} value={this.state.name}></input> 
                 {this.state.update === true ? < button className="add_btn" onClick={this.updateRecord}>+</button> : <button className="add_btn" onClick={this.addRecord}>save</button>}

            

                {this.state.showAlert === true ? (
                    <div
                        variant={this.state.alertType}
                        onClose={() => {
                            this.setState({
                                showAlert: false,
                            });
                        }}
                        dismissible
                    >
                    </div>
                ) : null}
                {this.state.records.map((record,index) => {
                    return (
                        <li className="list-item" key={index}>

                            <div className="list" style={{textDecorationLine: 'line-through'}} >{record.name}</div>
                            <div>

                                <button className="button-edit"onClick={() => this.editRecord(record.id)}>
                                    <i className="fa fa-edit"></i>
                                </button>

                                <button className="button-delete task-button"  onClick={() => this.deleteRecord(record.id)}>
                                     <i className="fa fa-trash"></i>
                                 </button>
                    
                            </div>
                        </li>
                    )
                })}
            </div>
        </div>
        );
    }
}
export default TodoList;
