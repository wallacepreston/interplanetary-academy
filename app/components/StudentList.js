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
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <h3>Students:</h3>
              <Link to="/students/add">(Click to Add a Student)</Link>
            </div>
          </div>
            <div className="container">
                <div className="row justify-content-center h3">
                  <div className="col text-center">
                    Name
                  </div>
                  <div className="col text-center">
                    Image
                  </div>
                  <div className="col text-center">
                    {''}
                  </div>
                </div>
              {this.props.students.map(student => (
                <div className="row justify-content-center h5" key={student.id}>
                  <div className="col text-center">
                    <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                  </div>
                  <div className="col text-center">
                    <img src={student.imageURL} height="70" width="70" />
                  </div>
                  <div className="col text-center">
                    <button type="button" className="btn btn-light" ><Link to={`/students/${student.id}`}>Details</Link></button>              
                  </div>
                  <div className="col text-center">
                    <button type="button" className="btn btn-danger" onClick={() => this.removeStudent(student.id)}>Remove</button>              
                  </div>
                </div>
                ))
              }
            </div>
          
        </div>
        <ul>
          
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
