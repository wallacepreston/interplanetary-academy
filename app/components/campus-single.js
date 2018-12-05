import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedCampus} from '../reducers/campuses-reducer'


//change this to a class stateful class component. Then use componentDidUpdate, calling this.setState() inside, passing in the new campus.
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
            <li>{student.firstName} {student.lastName}</li>
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

const CampusSingleContainer = connect(mapStateToProps, mapDispatchToProps)(CampusSingle)

export default CampusSingleContainer
