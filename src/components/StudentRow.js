import React from "react";

class StudentRow extends React.Component {
	constructor(){
		super();
    this.calculateAvg = this.calculateAvg.bind(this);
  }

  calculateAvg(grades){
    //add all student grades together...
    let sum = 0;
    let average;
    for(let i = 0; i < grades.length; i++){
      sum = sum + grades[i];
    }
    // and then divide them by the amount of grades to get the average
    average = sum/grades.length;
    return average;
  }
  //   city: "Fushë-Muhurr"
  // company: "Yadel"
  // email: "iorton0@imdb.com"
  // firstName: "Ingaberg"
  // grades: (8) ["78", "100", "92", "86", "89", "88", "91", "87"]
  // id: "1"
  // lastName: "Orton"
  // pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg"
  // skill: "Oracle"
  
	render(){
		const student = this.props.studentData;
		return(
			<>
				<img src={student.pic} />
        <h1>{student.firstName} {student.lastName}</h1>
        <h3>Email: {student.email}</h3>
        <h3>Company: {student.company}</h3>
        <h3>Skill: {student.skill}</h3>
        <h3>Average: {this.calculateAvg(student.grades)}</h3>
			</>
		)
	}
}

export default StudentRow;