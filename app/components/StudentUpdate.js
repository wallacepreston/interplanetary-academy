import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateStudent, fetchSelectedStudent} from '../reducers/students-reducer'


class StudentsUpdate extends React.Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      imageURL: '',
      campusId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit (event) {
    event.preventDefault()
    const name = this.state.name;
    const imageURL = this.state.imageURL;
    const address = this.state.address;
    const description = this.state.description;
    const campusId = this.state.campusId;
    let stateToPass = {
      id: this.props.studentId
    }
    if (name !== ''){
      stateToPass.name = name
    }
    if (imageURL !== ''){
      stateToPass.imageURL = imageURL
    }
    if (address !== ''){
      stateToPass.address = address
    }
    if (description !== ''){
      stateToPass.description = description
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
