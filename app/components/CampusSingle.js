import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedCampus} from '../reducers/campuses-reducer'
import {Link, withRouter} from 'react-router-dom';



class CampusSingle extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedCampus(this.props.match.params.campusId)
  }
  render () {
    const campus = this.props.campus
    const students = this.props.campus.students
    console.log('campus: ', campus)
    console.log('students: ',this.props.campus.students)
    return (
    <div>
      <h3>Campus: {campus.name}</h3> <img src={campus.imageURL} />
      <p>Address: {campus.address}</p>
      <p>Description: {campus.description}</p>
      <p>Students:</p>
      {
        students.length
        ? students.map(student => (
          <ul key={student.id}>
            <li><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></li>
          </ul>
        ))
        : <p>No Students to Show</p>
      }
      
    </div>
  )}
}

const mapStateToProps = (state) => ({
  campus: state.campuses.selected
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedCampus: (campusId) => dispatch(fetchSelectedCampus(campusId))
})

const CampusSingleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusSingle))

export default CampusSingleContainer
