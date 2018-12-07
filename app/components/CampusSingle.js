import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedCampus} from '../reducers/campuses-reducer'
import {updateStudent} from '../reducers/students-reducer'
import {Link, withRouter} from 'react-router-dom';
import CampusUpdate from './CampusUpdate'
import Loading from './Loading'

class CampusSingle extends React.Component {
  
  constructor () {
    super()
    this.removeFromCampus = this.removeFromCampus.bind(this)
    this.state = {
      loading: true,
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
  async removeFromCampus(student){
    try {
      const studentToPass = {
        id: student.id,
        campusId: null
      }
      await this.props.updateStudent(studentToPass)
      await this.props.fetchSelectedCampus(this.props.match.params.campusId)
    }
    catch (err) {
      console.error(err)
    }
  }
  render () {
    const campus = this.props.campus
    const students = this.props.campus.students
    const campuses = this.props.campuses
    if (this.state.loading) {
      return (
        <div>Loading. Standby...</div>
      );
    }
    else if (!campus.id){
      if (this.state.loading) {
        return <Loading />
      }
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
      <div className="container">
        <div className="row">
      {
        students.length
        ? students.map(student => (
          <div className="col-md-4" key={student.id}>
            <h2>{student.firstName} {student.lastName}</h2>
            <div><img src={student.imageURL} width="70" height="70"/></div>
            <p><button className="btn btn-light" href="#" type="button"><Link to={`/students/${student.id}`}>View Details &raquo;</Link></button></p>
            <button type="button" className="btn btn-danger" onClick={() => this.removeFromCampus(student)}>Remove</button>
          </div>
        ))
        : <p>No Students to Show</p>
      }
        </div>
      </div>
      <CampusUpdate campusId={campus.id} />
    </div>
  )}
}

const mapStateToProps = (state) => ({
  campus: state.campuses.selected,
  campuses: state.campuses.list
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedCampus: (campusId) => dispatch(fetchSelectedCampus(campusId)),
  updateStudent: (student) => dispatch(updateStudent(student)),
})

const CampusSingleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusSingle))

export default CampusSingleContainer
