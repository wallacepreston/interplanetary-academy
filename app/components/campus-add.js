import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import {addCampus} from '../reducers/campuses-reducer'


class CampusAdd extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      imageURL: '',
      address: '',
      description: ''
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
    const {data} = await axios.post(`/api/campuses/`, this.state)
    this.props.addCampus(data)
    this.setState({
      name: '',
      imageURL: '',
      address: '',
      description: ''
    })
  }
  render () {
    return (
      <div>
        <h3>Add a Campus:</h3>
        {/* {console.log(props.campuses)} */}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" placeholder="Enter campus name" value={this.state.name} onChange={this.handleChange} />
            {this.state.name === '' ? <span className="warning">Required!</span> : ''}
          </div>
          <div>
            <label htmlFor="address">Address: </label>
            <input type="text" name="address" placeholder="Enter campus address" value={this.state.address} onChange={this.handleChange} />
            {this.state.address === '' ? <span className="warning">Required!</span> : ''}
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" placeholder="Enter campus description" value={this.state.description} onChange={this.handleChange} />
            {this.state.description === '' ? <span className="note">Optional, but we'd love a description.</span> : ''}
          </div>
          <div>
            <label htmlFor="imageURL">Image URL: </label>
            <input type="text" name="imageURL" placeholder="Enter campus image URL" value={this.state.imageURL} onChange={this.handleChange} />
            {this.state.imageURL === '' ? <span className="note">We'll choose one for you if you don't.</span> : ''}
          </div>
            <button type="submit">Add Campus</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.list
})

const mapDispatchToProps = dispatch => ({
  addCampus: (campus) => dispatch(addCampus(campus))
})

const CampusAddContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusAdd))

export default CampusAddContainer
