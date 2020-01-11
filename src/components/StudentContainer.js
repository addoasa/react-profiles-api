import React from "react";
import StudentRow from "./StudentRow"

class StudentContainer extends React.Component {
	constructor(){
		super();
	}
  
	render(){
    // save fetched students array to a variable
    const fetchedStudents = this.props.studentInformation;
    
    // iterate over array of fetched data in props WHEN we have recieved it
      const setOfStudents = fetchedStudents.map((studentData,index)=>{
      
      // create a unique UI component for each object in the array
      return (
        <StudentRow 
          key = {studentData.firstName + index} 
          studentData={studentData} 
        />
      );
    });
		return(
			<>
				{setOfStudents ? setOfStudents : <h2>Please wait a moment...</h2>}
			</>
		);
	}
}

export default StudentContainer;