import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateCampus, fetchSelectedCampus} from '../reducers/campuses-reducer'
import Loading from './Loading'

class CampusUpdate extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      imageURL: '',
      address: '',
      description: '',
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
    const name = this.state.name;
    const imageURL = this.state.imageURL;
    const address = this.state.address;
    const description = this.state.description; 
    let stateToPass = {
      id: this.props.campusId
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
    await this.props.updateCampus(stateToPass)
    this.setState({
      name: '',
      imageURL: '',
      address: '',
      description: '',
    })
    this.props.fetchSelectedCampus(this.props.campusId)
  }
  render () {
    if (this.state.loading){
      return <Loading />
    }
    return (
      <div>
        <h3>Update a Campus:</h3>
        <div className="alert alert-secondary" role="alert">All fields optional. Only update what you would like to.</div>
        <form onSubmit={this.handleSubmit}>
          <div className="container-fluid justify-content-center">
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="name">Name: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="name" placeholder="Enter campus name" value={this.state.name} onChange={this.handleChange} />
              </div>
              
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="address">Address: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="address" placeholder="Enter campus address" value={this.state.address} onChange={this.handleChange} />
              </div>
              
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="description">Description: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="description" placeholder="Enter campus description" value={this.state.description} onChange={this.handleChange} />
              </div>
             
            </div>
            <div className="row h3">
              <div className="col text-center">
                <label htmlFor="imageURL">Image URL: </label>
              </div>
              <div className="col text-center">
                <input type="text" name="imageURL" placeholder="Enter campus image URL" value={this.state.imageURL} onChange={this.handleChange} />
              </div>
              
            </div>
            <div>
              <button type="submit" className="btn btn-outline-primary">Update Campus</button>
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
  campuses: state.campuses.list
})

const mapDispatchToProps = dispatch => ({
  updateCampus: (campus) => dispatch(updateCampus(campus)),
  fetchSelectedCampus: (id) => dispatch(fetchSelectedCampus(id))
})

const CampusUpdateContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusUpdate))

export default CampusUpdateContainer
