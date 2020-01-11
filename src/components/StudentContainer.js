import React from "react";
import StudentRow from "./StudentRow"

class StudentContainer extends React.Component {
	constructor(){
		super();
	}
  
	render(){
		// iterate over array of fetched data in props
		const fetchedStudents = this.props.studentInformation;
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
				{setOfStudents}
			</>
		);
	}
}

export default StudentContainer;