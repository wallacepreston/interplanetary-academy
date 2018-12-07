import React from 'react'
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getCampuses, deleteCampus} from '../reducers/campuses-reducer'
import Loading from './Loading'


class CampusList extends React.Component {
  constructor () {
    super()
    this.removeCampus = this.removeCampus.bind(this)
    this.state = {
      loading: true
    }
  }
  componentDidMount (){
    this.setState({
      loading: false
    })
  }
  async removeCampus(campusId){
    try {
      await this.props.deleteCampus(campusId)
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {
    if (this.state.loading){
      return <Loading />
    }
    return (
      <div className="container-fluid justify-content-center">
        <h3>Campuses:</h3>
        <button type="button" className="btn btn-outline-primary" >
          <Link to="/campuses/add">Click to Add a Campus</Link>
        </button>
        <div className="container">
          <div className="row h3">
            <div className="col text-center">
              Name
            </div>
            <div className="col text-center">
              Image
            </div>
            <div className="col text-center">
              Details
            </div>
            <div className="col text-center">
              Remove
            </div>
          </div>        
          {
            this.props.campuses.map(campus => {
              let numStudents = campus.students.length
              let studentNumDescriptor = 'students';
              if (numStudents === 1) {
                studentNumDescriptor = 'student'
              }
              else if(numStudents === 0){
                numStudents = 'no'
              }
              return (
              <div className="row h5" key={campus.id}>
                <div className="col text-center">
                  <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                </div>
                <div className="col text-center">
                  <img src={campus.imageURL} height="70" width="70" />
                </div>
                <div className="col text-center">
                  {`${numStudents} ${studentNumDescriptor}`} 
                </div>
                <div className="col text-center">
                  <button type="button" className="btn btn-light" ><Link to={`/campuses/${campus.id}`}>Details</Link></button>
                </div>
                <div className="col text-center">
                  <button type="button" className="btn btn-danger" onClick={() => this.removeCampus(campus.id)}>Remove</button>
                </div>
              </div>
            )})
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.list
})

const mapDispatchToProps = (dispatch) => ({
  getCampuses: (campuses) => dispatch(getCampuses(campuses)),
  deleteCampus: (campus) => dispatch(deleteCampus(campus))
})

const CampusListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusList))

export default CampusListContainer
