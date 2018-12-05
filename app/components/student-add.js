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
        {/* {console.log(props.students)} */}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name: </label>
            <input type="text" name="firstName" placeholder="Enter student first name" value={this.state.firstName} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input type="text" name="lastName" placeholder="Enter student last name" value={this.state.lastName} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" placeholder="Enter student email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="gpa">GPA: </label>
            <input type="text" name="gpa" placeholder="Enter student gpa" value={this.state.gpa} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="imageURL">Image URL: </label>
            <input type="text" name="imageURL" placeholder="Enter student image URL" value={this.state.imageURL} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="campusId">Campus: </label>
            <select name="campusId" value={this.state.campusId} onChange={this.handleChange}>
              {this.props.campuses.map(campus => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>  
              )
              )}
            </select>
          </div>
            <button type="submit">Add Student</button>
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
