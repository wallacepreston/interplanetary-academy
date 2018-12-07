import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateStudent, fetchSelectedStudent} from '../reducers/students-reducer'
import Loading from './Loading'

class StudentsUpdate extends React.Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      imageURL: '',
      campusId: '',
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    this.setState({
      loading: false
    })
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit (event) {
    event.preventDefault()
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const gpa = this.state.gpa;
    const imageURL = this.state.imageURL;
    const campusId = this.state.campusId;
    let stateToPass = {
      id: this.props.studentId
    }
    if (firstName !== ''){
      stateToPass.firstName = firstName
    }
    if (lastName !== ''){
      stateToPass.lastName = lastName
    }
    if (email !== ''){
      stateToPass.email = email
    }
    if (gpa !== ''){
      stateToPass.gpa = gpa
    }
    if (imageURL !== ''){
      stateToPass.imageURL = imageURL
    }
    if (campusId !== ''){
      stateToPass.campusId = campusId
    }
    
    await this.props.updateStudent(stateToPass)
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      imageURL: '',
      campusId: ''
    })
    this.props.fetchSelectedStudent(this.props.studentId)
  }
  render () {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div>
        <h3>Update a Student:</h3>
        <div className="alert alert-secondary" role="alert">All fields optional. Only update what you would like to.</div>
        <form onSubmit={this.handleSubmit}>
          <div className="container-fluid justify-content-center">
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="firstName">First Name: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="firstName" placeholder="Enter student first name" value={this.state.firstName} onChange={this.handleChange} />
              </div>
              
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="lastName">Last Name: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="lastName" placeholder="Enter student last name" value={this.state.lastName} onChange={this.handleChange} />
              </div>  
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="email">Email: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="email" placeholder="Enter student email" value={this.state.email} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="gpa">GPA: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="gpa" placeholder="Enter student GPA" value={this.state.gpa} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="imageURL">Image URL: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="imageURL" placeholder="Enter student image URL" value={this.state.imageURL} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="campusId">Campus: </label>
              </div>
              <div className="col text-center">
                <select name="campusId" value={this.state.campusId} onChange={this.handleChange}>
                  {this.props.campuses.map(campus => (
                    <option key={campus.id} value={campus.id}>{campus.name}</option> 
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-outline-primary">Update Student</button>
            </div>
            <div>
              {''}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  students: state.students.list,
  campuses: state.campuses.list
})

const mapDispatchToProps = dispatch => ({
  updateStudent: (student) => dispatch(updateStudent(student)),
  fetchSelectedStudent: (id) => dispatch(fetchSelectedStudent(id))
})

const StudentsUpdateContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentsUpdate))

export default StudentsUpdateContainer
