import React from 'react'
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';


const StudentList = (props) => {
    return (
    <div>
      <h3>Students:</h3>
      {console.log(props.students)}
      <ul>
        {props.students.map(student => (
            <li key={student.id}>
            <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
               :
              <img src={student.imageURL} height="70" width="70" /> 
            </li>
          ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.list
})

const StudentListContainer = withRouter(connect(mapStateToProps)(StudentList))

export default StudentListContainer
