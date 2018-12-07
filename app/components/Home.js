import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const Home = (props) => {
  return (
    <div>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Interplanetary</h1>
          <h2>Academy of JavaScript</h2>
          <p>We're glad you're here! Or that you're somewhere... We have campuses all over the nation, world, and ...yes, the Solar System. Stick around, and you can learn a bit about the students that are here, there, and everywhere!</p>
          <p><button className="btn btn-outline-primary btn-lg" type="button"><Link to="/campuses/">View Campuses &raquo;</Link></button></p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {props.campuses.map(campus => (
            <div className="col-md-4" key={campus.id}>
              <h2>{campus.name}</h2>
              <div><img src={campus.imageURL} width="70" height="70"/></div>
              <p>{campus.description}</p>
              <p><button className="btn btn-light" href="#" type="button"><Link to={`/campuses/${campus.id}`}>View Details &raquo;</Link></button></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.list
})

const HomeContainer = withRouter(connect(mapStateToProps)(Home))

export default HomeContainer
