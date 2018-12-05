import React from 'react'
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

const CampusList = (props) => {
    return (
    <div>
      <h3>Campuses:</h3>
      {console.log(props.campuses)}
      <ul>
        {props.campuses.map(campus => (
            <li key={campus.id}>
              <Link to={'/campuses/' + campus.id}>{campus.name}</Link>  :
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

const CampusListContainer = withRouter(connect(mapStateToProps)(CampusList))

export default CampusListContainer
