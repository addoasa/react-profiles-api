/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import React from "react";
import "../styles/StudentRow.css";
class StudentRow extends React.Component {
	constructor(){
		super();
		this.state = {
			userWantsToSeeScores : false,
			tagToAdd:"",
			tagArray:[]
		};
		this.calculateAvg = this.calculateAvg.bind(this);
		this.toggleScores = this.toggleScores.bind(this);
		this.addTag = this.addTag.bind(this);
		this.getTagInput = this.getTagInput.bind(this);
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
  
	toggleScores(){
		if(this.state.userWantsToSeeScores){
			this.setState({userWantsToSeeScores : false,});
		}else{
			this.setState({userWantsToSeeScores : true,});
		}
	}
  
	// -----------------------------
	// Tag Methods
	// -----------------------------
	getTagInput(event){
		// the input of the user adding tags
		this.setState({tagToAdd:event.target.value});
	}
	addTag(event){
		event.preventDefault();

		// Create a copy of the current tags for a student...
		// so that we don't directly mutate state
		const copyOfTagArray = this.state.tagArray.slice();
		copyOfTagArray.push(this.state.tagToAdd);

		// store the array of tags the user has inputted in state
		// and reset input field
		// send tag data to the parent when a new tag is addedgit add    
		// Do this along with setting state to avoid state updating one step behind
		this.setState({
			tagArray: copyOfTagArray,
			tagToAdd:"",
		},()=> this.props.extractTagsFromRow(this.props.index, this.state.tagArray));

	}


	render(){
		const student = this.props.studentData;
		const stylesObj = {
			backgroundImage: `url(${student.pic})`
		};
		//-------------------------------
		// Store the students testscores 
		// for later conditional rendering
		//-------------------------------

		const testScores = []; 
		for(let i = 0; i < student.grades.length; i++){
			testScores.push(<li key = {`${student.firstName}-${student.grades[i]}`}>
				<span>Test{i}:</span>
				<span >{student.grades[i]}%</span>
			</li>);
		}
    
		//-------------------------------
		// Create a UI item for each tag stored in Parent's state 
		//-------------------------------
		let arrOfTags = [];
		if(this.props.tags){

			arrOfTags = this.props.tags.map((tag, index)=>{
				return(<div className = "student-tag" key= {`${tag} ${index}`}>{tag}</div>);
			});
		}


		return(
			<div className = "student-row">
				<div className = "student-row-image" style={stylesObj} ></div>
				<div className = "student-row-specs-and-btn">  
					<div className = "student-row-specs">
						<h1 className = "student-row-name">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h1>
						<ul className = "student-row-listinfo">
							<li>Email: {student.email}</li>
							<li>Company: {student.company}</li>
							<li>Skill: {student.skill}</li>
							<li>Average: {this.calculateAvg(student.grades)} %</li>
						</ul>

						{
							// ---------------------------------------------------
							//if the user wants to see scores... show them student scores and the add tag input field
							// ---------------------------------------------------
							this.state.userWantsToSeeScores ? 
								<>
									<ul className = "student-row-scores">{testScores}</ul> 
									<div className = "tags-container">{arrOfTags}</div>
									<form onSubmit ={this.addTag}>
									  <input className = "add-tag-input" value = {this.state.tagToAdd} type="text" placeholder="Add a tag" onChange = {this.getTagInput}/>
									</form>
								</>
								: 
								<></>
						}
					</div>
					{
						// ---------------------------------------------------
						// if the user wants to see scores show them the minus icon for a button... otherwise show a plus icon
						// ---------------------------------------------------
						this.state.userWantsToSeeScores ?
							<i className="fa fa-minus expand-btn" aria-hidden="true" onClick = {this.toggleScores}></i>
							:
							<i className="fa fa-plus expand-btn" aria-hidden="true" onClick = {this.toggleScores}></i>
					}
				</div>
			</div>
		);
	}
}

export default StudentRow;