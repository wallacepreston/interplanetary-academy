import React from 'react'
import { connect } from 'react-redux';
import {fetchCampuses} from '../reducers/campuses-reducer'

class CampusList extends React.Component {
  componentDidMount () {
    this.props.fetchCampuses()
  }
  render () {
    return (
    <div>
      <h3>Campuses:</h3>
      {console.log(this.props.campuses)}
      <ul>
        {this.props.campuses.map(campus => (
            <li key={campus.id}>
              {campus.name} :
              <img src={campus.imageURL} height="70" width="70" /> 
            </li>
          ))}
      </ul>
    </div>
  )}
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.list
})

const mapDispatchToProps = (dispatch) => ({
  fetchCampuses: () => dispatch(fetchCampuses())
})

const CampusListContainer = connect(mapStateToProps, mapDispatchToProps)(CampusList)

export default CampusListContainer
