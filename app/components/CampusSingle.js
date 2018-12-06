import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedCampus} from '../reducers/campuses-reducer'
import {Link, withRouter} from 'react-router-dom';
import CampusUpdate from './CampusUpdate'

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
  componentDidUpdate(prevProps) {
    if (prevProps.campus !== this.props.campus) {
      this.forceUpdate()
    }
  }
  render () {
    console.log('>>>>>>>>>> (CampusSingle: inside render): this.props.campus: ', this.props.campus)
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
    else if(!campus.id){
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
          <p key={student.id}>
            <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
          </p>
        ))
        : <p>No Students to Show</p>
      }
      <CampusUpdate campusId={campus.id} />
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
