import React from "react";
import "../styles/StudentRow.css";
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

			sum = sum + JSON.parse(grades[i]);
		}

		// and then divide them by the amount of grades to get the average
		average = sum/grades.length;
		return average.toFixed(2);
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
		const stylesObj = {
			backgroundImage: `url(${student.pic})`
		};
		return(
			<div className = "student-row">
				<div className = "student-row-image" style={stylesObj} ></div>
				<div className = "student-row-specs">
					<h1 className = "student-row-name">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h1>
					<ul className = "student-row-listinfo">
						<li>Email: {student.email}</li>
						<li>Company: {student.company}</li>
						<li>Skill: {student.skill}</li>
						<li>Average: {this.calculateAvg(student.grades)} %</li>

					</ul>
				</div>
			</div>
		)
	}
}

export default StudentRow;