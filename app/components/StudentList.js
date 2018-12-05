import React from 'react'
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios'
import {getStudents} from '../reducers/students-reducer'

class StudentList extends React.Component {
  constructor () {
    super()
    this.removeStudent = this.removeStudent.bind(this)
  }
  async removeStudent(studentId){
    try {
      const {data} = await axios.delete(`/api/students/${studentId}`)
      this.props.getStudents(data)
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <div>
        <h3>Students:</h3>
        <Link to="/students/add">Add a Student</Link>
        {console.log(this.props.students)}
        <ul>
          {this.props.students.map(student => (
              <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                :
                <img src={student.imageURL} height="70" width="70" />
                <button type="button" onClick={() => this.removeStudent(student.id)}>X</button>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  students: state.students.list
})
const mapDispatchToProps = dispatch => ({
  getStudents: (students) => dispatch(getStudents(students))
})

const StudentListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList))

export default StudentListContainer
