import React from 'react'
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {getCampuses} from '../reducers/campuses-reducer'


class CampusList extends React.Component {
  constructor () {
    super()
    this.removeCampus = this.removeCampus.bind(this)
  }
  async removeCampus(campusId){
    try {
      const {data} = await axios.delete(`/api/campuses/${campusId}`)
      this.props.getCampuses(data)
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <div>
        <h3>Campuses:</h3>
        <Link to={`/campuses/add`}>Add a Campus</Link>
        {console.log(this.props.campuses)}
        <ul>
          {this.props.campuses.map(campus => (
              <li key={campus.id}>
                <Link to={'/campuses/' + campus.id}>{campus.name}</Link>  :
                <img src={campus.imageURL} height="70" width="70" /> 
                <button type="button" onClick={() => this.removeCampus(campus.id)}>X</button>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.list
})

const mapDispatchToProps = (dispatch) => ({
  getCampuses: (campuses) => dispatch(getCampuses(campuses))
})

const CampusListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusList))

export default CampusListContainer
