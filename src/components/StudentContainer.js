import React from "react";
import StudentRow from "./StudentRow";
import "../styles/StudentContainer";

class StudentContainer extends React.Component {
	constructor(){
		super();
		this.state = {
			searchTerm:'',
		}
		this.searchForName = this.searchForName.bind(this);
	}
	searchForName(event){
    // remove any white spaces and store search input into state
		this.setState({searchTerm : event.target.value.replace(/ /g,'')}) 
	}
	render(){
		// save fetched students array to a variable
		const fetchedStudents = this.props.studentInformation;
		let studentsToShow= [];

		//--------------------------------------------------
		// iterate over array of fetched data in props WHEN we have recieved it
		// create a unique UI component for each object in the array
		//--------------------------------------------------
		const setOfStudents = fetchedStudents.map((studentData,index)=>{
			return (
				<StudentRow 
					key = {studentData.firstName + index} 
					studentData={studentData} 
				/>
			);
		});
		//--------------------------------------------------
		// Filter through array of UI components
		// Return only the components that match the search conditions
		//--------------------------------------------------
		const filteredSetOfStudents = setOfStudents.filter((studentRow, index)=>{
     
      // tap into the props object of a each <StudentRow />... 
      // and extract the first and last name of each student
      // (use toUpperCase() for caseinsensitive search)
     
      const studentFirstName= studentRow.props.studentData.firstName.toUpperCase()
      const studentLastName= studentRow.props.studentData.lastName.toUpperCase()

      // return UI Components where the extracted names match against the search input
			const searchQuery = this.state.searchTerm.toUpperCase();
		  return(	
        // show ui item if input matches first name, last name or both
        studentFirstName.includes(searchQuery) || studentLastName.includes(searchQuery) || ((studentFirstName + studentLastName).includes(searchQuery))
      );
		});
		return(
			<main className = "student-set-container">
				<input className="searchBar" type="text" placeholder="Search by name" onChange = {this.searchForName}></input>
				<div className = "student-set">
				  {this.state.searchTerm ? filteredSetOfStudents : setOfStudents}
				</div>
			</main>
		);
	}
}

export default StudentContainer;