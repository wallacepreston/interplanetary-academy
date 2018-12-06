import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedStudent} from '../reducers/students-reducer'
import {Link, withRouter} from 'react-router-dom';


class StudentSingle extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true
    }
  }
  async componentDidMount () {
    await this.props.fetchSelectedStudent(this.props.match.params.studentId)
    this.setState({loading: false});
  }
  render () {
    const student = this.props.student
    const campus = this.props.student.campus
    const students = this.props.students
    console.log('campus: ', campus)
    if (this.state.loading) {
      return (
        <div>Loading. Standby...</div>
      );
    }
    else if(!campus){
      return (
        <div>
          The student you entered does not exist. Choose from one of the existing students:
          {students.map(currStudent => {
            return (
            <div key={currStudent.id}>
              <Link to={`/campuses/${currStudent.id}`}>{currStudent.firstName} {currStudent.lastName}</Link>
            </div>
          )})}
        </div>
        
      )
    }
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
  student: state.students.selected,
  students: state.students.list
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedStudent: (studentId) => dispatch(fetchSelectedStudent(studentId))
})

const StudentSingleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentSingle))

export default StudentSingleContainer
