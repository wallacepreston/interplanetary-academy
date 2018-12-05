import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedCampus} from '../reducers/campuses-reducer'


//change this to a class stateful class component. Then use componentDidUpdate, calling this.setState() inside, passing in the new campus.
class CampusSingle extends React.Component {
  constructor (){
    super()
    this.state = {
      campus: {}
    }
  }
  componentDidMount () {
    this.props.fetchSelectedCampus(this.props.match.params.campusId)
  }
  render () {
    return (
    <div>
      <h3>Campus: {this.props.campus.name}</h3>
      
    </div>
  )}
}

const mapStateToProps = (state) => ({
  campus: state.campuses.selected
})
const mapDispatchToProps = (dispatch) => ({
  fetchSelectedCampus: (campusId) => dispatch(fetchSelectedCampus(campusId))
})

const CampusSingleContainer = connect(mapStateToProps, mapDispatchToProps)(CampusSingle)

export default CampusSingleContainer
