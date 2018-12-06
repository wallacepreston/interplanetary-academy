import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import {addStudent} from '../reducers/students-reducer'


class StudentAdd extends React.Component {
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
    try {
      const {data} = await axios.post(`/api/students/`, this.state)
      this.props.addStudent(data)
    }
    catch (error) {
      console.error(error)
    }
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      imageURL: '',
      campusId: ''
    })
  }
  render () {
    return (
      <div>
        <h3>Add a Student:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="container-fluid justify-content-center">
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="firstName">First Name: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="firstName" placeholder="Enter student first name" value={this.state.firstName} onChange={this.handleChange} />
              </div>
              <div className="col text-center">
                {this.state.firstName === '' ? <span className="alert alert-warning" role="alert">Required</span> : ''}
              </div>
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="lastName">Last Name: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="lastName" placeholder="Enter student last name" value={this.state.lastName} onChange={this.handleChange} />
              </div>
              <div className="col text-center">
                {this.state.lastName === '' ? <span className="alert alert-warning" role="alert">Required</span> : ''}
              </div>
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="email">Email: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="email" placeholder="Enter student email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="col text-center">
                {this.state.email === '' ? <span className="alert alert-warning" role="alert">Required!</span> : ''}
              </div>
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="gpa">GPA: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="gpa" placeholder="Enter student gpa" value={this.state.gpa} onChange={this.handleChange} />
              </div>
              <div className="col text-center">
                {this.state.gpa === '' ? <span className="note">Optional, but it helps.</span> : ''}
              </div>
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="imageURL">Image URL: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="imageURL" placeholder="Enter student image URL" value={this.state.imageURL} onChange={this.handleChange} />
              </div>
              <div className="col text-center">
                {this.state.imageURL === '' ? <span className="note">We'll choose one for you if you don't.</span> : ''}
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
              <div className="col text-center">
                {this.state.campusId === '' ? <span className="note">Leave blank if you haven't decided.</span> : ''}
              </div>
            </div>
          </div>
            <button type="submit" className="btn btn-primary">Add Student</button>
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
  addStudent: (student) => dispatch(addStudent(student))
})

const StudentAddContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentAdd))

export default StudentAddContainer
