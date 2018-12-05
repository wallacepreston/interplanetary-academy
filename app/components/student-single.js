import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedStudent} from '../reducers/students-reducer'
import {Link, withRouter} from 'react-router-dom';


class StudentSingle extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedStudent(this.props.match.params.studentId)
  }
  render () {
    const student = this.props.student
    const campus = this.props.student.campus
    console.log('campus: ', campus)
    return (
    <div>
      <h3>Student: {student.firstName} {student.lastName}</h3> <img src={student.imageURL} />
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
      {
        campus
        ? <p>Campus: <Link to={`/campuses/${campus.id}`}>{campus.name}</Link></p>
        : <p>This student has not yet enrolled at a campus!</p>
      }
    </div>
  )}
}

const mapStateToProps = (state) => ({
  student: state.students.selected
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedStudent: (studentId) => dispatch(fetchSelectedStudent(studentId))
})

const StudentSingleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentSingle))

export default StudentSingleContainer
