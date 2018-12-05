import React from 'react'
import {connect} from 'react-redux';
import {Route, Switch, Link, withRouter} from 'react-router-dom';

import CampusList from './campus-list'
import StudentList from './student-list'
import CampusSingle from './campus-single'
import StudentSingle from './student-single'
import CampusAdd from './campus-add'
// import StudentAdd from './student-add'
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
        <Switch>
          <Route exact path='/campuses' component={CampusList} />
          <Route exact path='/students' component={StudentList} />
          <Route exact path='/campuses/add' component={CampusAdd} />
          {/* <Route path='/students/add' component={StudentAdd} /> */}
          <Route exact path='/campuses/:campusId' component={CampusSingle} />
          <Route exact path='/students/:studentId' component={StudentSingle} />
          
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
