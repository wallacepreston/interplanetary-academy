import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedStudent} from '../reducers/students-reducer'
import {Link, withRouter} from 'react-router-dom';
import StudentUpdate from './StudentUpdate'
import Loading from './Loading'


class StudentSingle extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true
    }
  }
  async componentDidMount () {
    let urlId = this.props.match.params.studentId
    if(isNaN(Number(urlId))) {
      urlId = 1000
    }
    await this.props.fetchSelectedStudent(urlId)
    this.setState({loading: false});
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.studentId !== this.props.match.params.studentId) {
      await this.props.fetchSelectedStudent(this.props.match.params.studentId)
    }
  }
  render () {
    const student = this.props.student
    const campus = this.props.student.campus
    const students = this.props.students
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    else if (!student.id){
      return (
        <div>
          The student you entered does not exist. Choose from one of the existing students:
          {students.map(currStudent => {
            return (
            <div key={currStudent.id}>
              <Link to={`/students/${currStudent.id}`}>{currStudent.firstName} {currStudent.lastName}</Link>
            </div>
          )})}
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row h3">
          <div className="col text-center">
            Name
          </div>
          <div className="col text-center">
            <h3>{student.firstName} {student.lastName}</h3>
          </div>
        </div>
        <div className="row h3 align-items-center">
          <div className="col text-center">
            Image
          </div>
          <div className="col text-center">
            <img src={student.imageURL} height="100" width="100"/>
          </div>
        </div>
        <div className="row h3">
          <div className="col text-center">
            Email
          </div>
          <div className="col text-center">
            <p>{student.email}</p>
          </div>
        </div>
        <div className="row h3">
          <div className="col text-center">
            GPA
          </div>
          <div className="col text-center">
            <p>{student.gpa}</p>
          </div>
        </div>
        <div className="row h3">
          <div className="col text-center">
            Campus:
          </div>
          <div className="col text-center">
            {
              campus
              ? <p><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></p>
              : <p className="alert alert-primary" role="alert">No Campus (Not Yet Enrolled)</p>
              
            }
          </div>
        </div>
        <StudentUpdate studentId={student.id} />
      </div>
  )}
}

const mapStateToProps = (state) => ({
  student: state.students.selected,
  students: state.students.list
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedStudent: (studentId) => dispatch(fetchSelectedStudent(studentId))
})

const StudentSingleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentSingle))

export default StudentSingleContainer
