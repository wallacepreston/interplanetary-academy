import React from 'react'
import { connect } from 'react-redux';

const CampusList = (props) => {
    return (
    <div>
      <h3>Campuses:</h3>
      {console.log(props.campuses)}
      <ul>
        {props.campuses.map(campus => (
            <li key={campus.id}>
              {campus.name} :
              <img src={campus.imageURL} height="70" width="70" /> 
            </li>
          ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.list
})

const CampusListContainer = connect(mapStateToProps)(CampusList)

export default CampusListContainer
