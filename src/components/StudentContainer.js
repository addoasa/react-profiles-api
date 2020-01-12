import React from "react";
import StudentRow from "./StudentRow";
import "../styles/StudentContainer";

class StudentContainer extends React.Component {
	constructor(){
		super();
		this.state = {
      searchTerm:'',
      tagSearchTerm:'',
      allStudentTags:{}
		}
		this.searchForName = this.searchForName.bind(this);
		this.searchByTag = this.searchByTag.bind(this);
		this.extractTagsFromRow = this.extractTagsFromRow.bind(this);
  }
  //--------------------------------------------------
  // Seaching methods
  //--------------------------------------------------
	searchForName(event){
    // remove any white spaces and store search input into state
		this.setState({searchTerm : event.target.value.replace(/ /g,'')}) 
  }
  
  searchByTag(event){
    // remove any white spaces and store search input into state
    this.setState({tagSearchTerm : event.target.value.replace(/ /g,'')}) 
  }

  extractTagsFromRow(studentIndex, gotStudentTags){
    // this function will be used to grab the tags of a student for filtering
    // The filter method below will update tempSetOfTags with a new set of tags to filter as it iterates through the <StudentRow /> components
    this.setState((state)=>{
      // make a copy of all students and their tags already in state
      let copyOfAllStudentTagsArr = JSON.parse(JSON.stringify(state.allStudentTags));

      // update OR create a spot in the allStudentTags object
      // When a <StudentRow /> mounts this function will create a spot for that student to store their tags in the allStudentsObject
      // when a tag is added this funtion will update that unique student's tags
      copyOfAllStudentTagsArr[studentIndex] = gotStudentTags;
      // update state object with new updated object
      return {allStudentTags : copyOfAllStudentTagsArr}; 
      })
  }

	render(){
		// save fetched students array to a variable
		const fetchedStudents = this.props.studentInformation;
		let studentsToShow= [];

		//--------------------------------------------------
		// iterate over array of fetched data in props WHEN fetched data is recieved
		// create a unique UI component for each object in the array
		//--------------------------------------------------
		const setOfStudents = fetchedStudents.map((studentData,index)=>{
			return (
				<StudentRow 
					key = {studentData.firstName + index} 
          studentData={studentData} 
          index = {index}
          extractTagsFromRow = {this.extractTagsFromRow}
          tags = {this.state.allStudentTags[index]}
				/>
			);
    });
    
		//--------------------------------------------------
		// Filter through array of already made UI components ... Return only the components that match the search conditions
		//--------------------------------------------------
		// const filteredSetOfStudents = setOfStudents.filter((studentRow, index)=>{
    //   // tap into the props object of a each <StudentRow />...and extract the first and last name of each student
    //   // (use toUpperCase() for case insensitive search)
     
    //   const studentFirstName= studentRow.props.studentData.firstName.toUpperCase()
    //   const studentLastName= studentRow.props.studentData.lastName.toUpperCase()
    //   // return UI Components where the extracted names (AND tags in state) match against the search input
		// 	const searchQuery = this.state.searchTerm.toUpperCase();
		// 	const tagQuery = this.state.tagSearchTerm.toUpperCase();
    //   // iterate through each tag for the current student
    //   let that = this;
    //   function checkForTagMatches(){
    //     console.log(tagQuery)
    //     console.log(that.state.allStudentTags[0])
    //     if(!that.state.allStudentTags[index]){
    //       return true;
    //     }else{
    //       for(let i = 0 ; i < that.state.allStudentTags[index].length; i++){
    //         // if any of this students tags match the tag search query
    //         if(that.state.allStudentTags[index][i].toUpperCase().includes(tagQuery)){
    //           return true;
    //         }
    //       }
    //     }
    //     return false;
    //   }
		//   return(	
    //     // show ui item if input matches first name, last name or both


    //     studentFirstName.includes(searchQuery) && (this.state.tagSearchTerm ? checkForTagMatches() : true)  || studentLastName.includes(searchQuery) && (this.state.tagSearchTerm ? checkForTagMatches() : true) || ((studentFirstName + studentLastName).includes(searchQuery) && (this.state.tagSearchTerm ? checkForTagMatches() : true) || (this.state.tagSearchTerm ? checkForTagMatches() : true) )
    //   );
    // });
    const filteredSetByTag = setOfStudents.filter((studentRow, index)=>{
      
			const tagQuery = this.state.tagSearchTerm.toUpperCase();
      // iterate through each tag for the current student
      let that = this;
      function checkForTagMatches(){
        console.log(tagQuery)
        console.log(that.state.allStudentTags)
        if(that.state.allStudentTags[index]){
          for(let i = 0 ; i < that.state.allStudentTags[index].length; i++){
            // if any of this students tags match the tag search query
            if(that.state.allStudentTags[index][i].toUpperCase().includes(tagQuery)){
              return true;
            }
          }
        }
        return false;
      }
		  return(	
        this.state.tagSearchTerm ? checkForTagMatches() : false
      );
    });

		return(
			<main className = "student-set-container">
				<input className="search-input search-fields" type="text" placeholder="Search by name" onChange = {this.searchForName}></input>
				<input className="tag-input search-fields" type="text" placeholder="Search by tag" onChange = {this.searchByTag}></input>
				<div className = "student-set">
				  {this.state.tagSearchTerm ? filteredSetByTag : setOfStudents}
				</div>
			</main>
		);
	}
}

export default StudentContainer;