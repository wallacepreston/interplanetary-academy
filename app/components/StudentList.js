import React from 'react'
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getStudents, deleteStudent} from '../reducers/students-reducer'
import Loading from './Loading'

class StudentList extends React.Component {
  constructor () {
    super()
    this.removeStudent = this.removeStudent.bind(this)
    this.state = {
      loading: true
    }
  }
  componentDidMount () {
    this.setState({
      loading: false
    })
  }
  async removeStudent(studentId){
    try {
      await this.props.deleteStudent(studentId)
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div className="container-fluid justify-content-center">
        <h3>Students:</h3>
        <button type="button" className="btn btn-outline-primary" >
          <Link to="/students/add">Click to Add a Student</Link>
        </button>
        <div className="container">
        {
            !this.props.students[0]
            ? <div className="alert alert-primary h1" role="alert">No Students to Show</div>
            :
            <div className="row h3">
              <div className="col text-center">
                Name
              </div>
              <div className="col text-center">
                Image
              </div>
              <div className="col text-center">
                Details
              </div>
              <div className="col text-center">
                Remove
              </div>
            </div>
        }
          {this.props.students.map(student => (
            <div className="row h5" key={student.id}>
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
    )
  }
}

const mapStateToProps = (state) => ({
  students: state.students.list
})
const mapDispatchToProps = dispatch => ({
  getStudents: (students) => dispatch(getStudents(students)),
  deleteStudent: (studentId) => dispatch(deleteStudent(studentId))
})

const StudentListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList))

export default StudentListContainer
