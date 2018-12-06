import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedCampus} from '../reducers/campuses-reducer'
import {Link, withRouter} from 'react-router-dom';



class CampusSingle extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true
    }
  }
  async componentDidMount () {
    await this.props.fetchSelectedCampus(this.props.match.params.campusId)
    this.setState({loading: false});
  }
  render () {
    const campus = this.props.campus
    const students = this.props.campus.students
    const campuses = this.props.campuses
    console.log('campus: ', campus)
    console.log('students: ',this.props.campus.students)
    if (this.state.loading) {
      return (
        <div>Loading. Standby...</div>
      );
    }
    else if(!students){
      return (
        <div>
          The campus you entered does not exist. Choose from one of the existing campuses:
          {campuses.map(currCampus => {
            return (
            <div key={currCampus.id}>
              <Link to={`/campuses/${currCampus.id}`}>{currCampus.name}</Link>
            </div>
          )})}
        </div>
        
      )
    }
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
  campus: state.campuses.selected,
  campuses: state.campuses.list
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedCampus: (campusId) => dispatch(fetchSelectedCampus(campusId))
})

const CampusSingleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusSingle))

export default CampusSingleContainer