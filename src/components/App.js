import React from "react";
import StudentContainer from "./StudentContainer.js";
import "../styles/App.css";

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			studentInformation:[],
		};
	}
	componentDidMount(){
		// fetch data from the student api
		fetch("https://www.hatchways.io/api/assessment/students",{
			method: "GET",
			headers:{
				Accept: "application/json",
				"content-type": "application/json",
			}
		})

		// translate the response object we've recieved from our api
			.then((gotData)=>{
				return gotData.json();
			})

		// store the translated student content in state
			.then((gotReadableData)=>{
				this.setState({
					studentInformation : gotReadableData.students,
				});
			});
	}

	render(){
		return(
			<>
				<StudentContainer studentInformation = {this.state.studentInformation}/>
			</>
		);
	}
}

export default App;