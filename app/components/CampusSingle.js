import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedCampus, updateCampus} from '../reducers/campuses-reducer'
import {updateStudent} from '../reducers/students-reducer'
import {Link, withRouter} from 'react-router-dom';
import CampusUpdate from './CampusUpdate'
import Loading from './Loading'

class CampusSingle extends React.Component {
  
  constructor () {
    super()
    this.removeFromCampus = this.removeFromCampus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: true,
      studentId: ''
    }
  }
  async componentDidMount () {
    let urlId = this.props.match.params.campusId
    if (isNaN(Number(urlId))) {
      urlId = 1000
    }
    await this.props.fetchSelectedCampus(urlId)
    this.setState({loading: false});
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.campusId !== this.props.match.params.campusId) {
      await this.props.fetchSelectedCampus(this.props.match.params.campusId)
    }
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit (event) {
    event.preventDefault()
    let studentId = this.state.studentId;
    if (studentId === ''){
      studentId = this.props.allStudents[0].id
    }
    let stateToPass = {
      id: studentId
    }
    stateToPass.campusId = this.props.campus.id

    await this.props.updateStudent(stateToPass)
    this.setState({
      studentId: ''
    })
    this.props.fetchSelectedCampus(this.props.campus.id)
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
      return <Loading />
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
    if (this.state.loading) {
      return <Loading />
    }
    return (
    <div>
      <h3>Campus: {campus.name}</h3> <img src={campus.imageURL} />
      <p>Address: {campus.address}</p>
      <p>Description: {campus.description}</p>
      <h2>Students at this Campus:</h2>
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <select name="studentId" value={this.state.studentId} onChange={this.handleChange}>
                {
                  this.props.allStudents.map(student => (
                  <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-outline-primary">Add to Campus</button>
            </form>
          </div>
        </div>
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
          : <div className="col alert alert-primary" role="alert"> <h4>There are No Students at this Campus</h4></div>
        }
          </div>
      </div>
      
      <CampusUpdate campusId={campus.id} />
    </div>
  )}
}

const mapStateToProps = (state) => ({
  campus: state.campuses.selected,
  allStudents: state.students.list,
  campuses: state.campuses.list
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedCampus: (campusId) => dispatch(fetchSelectedCampus(campusId)),
  updateStudent: (student) => dispatch(updateStudent(student)),
  updateCampus: (campus) => dispatch(updateCampus(campus)),
})

const CampusSingleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusSingle))

export default CampusSingleContainer
