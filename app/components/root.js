import React from 'react'
import {connect} from 'react-redux';
import {Route, Switch, Link, withRouter} from 'react-router-dom';

import CampusList from './campus-list'
import StudentList from './student-list'
import CampusSingle from './campus-single'
// import StudentSingle from './student-single'
import {fetchCampuses} from '../reducers/campuses-reducer'
import {fetchStudents} from '../reducers/students-reducer'



class Root extends React.Component {
  componentDidMount () {
    this.props.fetchCampuses()
    this.props.fetchStudents()
  }
  render () {
    return (
    <div>
      <nav>
        Welcome! What would you like to view? <Link to="/students">Students</Link> | <Link to="/campuses">Campuses</Link> 
      </nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        <p>This seems like a nice place to get started with some Routes!</p>
        <Switch>
          <Route exact path='/campuses' component={CampusList} />
          <Route exact path='/students' component={StudentList} />
          <Route path='/campuses/:campusId' component={CampusSingle} />
          {/* <Route path='/students/:studentId' component={StudentSingle} /> */}
        </Switch>
      </main>
    </div>
  )}
}

const mapDispatchToProps = (dispatch) => ({
  fetchCampuses: () => dispatch(fetchCampuses()),
  fetchStudents: () => dispatch(fetchStudents())
})

const RootContainer = withRouter(connect(null, mapDispatchToProps)(Root))

export default RootContainer
