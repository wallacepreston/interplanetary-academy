import React from 'react'
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import CampusList from './campus-list'
import StudentList from './student-list'
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
        Welcome!
      </nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        <p>This seems like a nice place to get started with some Routes!</p>
        <Switch>
          <Route exact path='/campuses' component={CampusList} />
          <Route exact path='/students' component={StudentList} />
        </Switch>
        {/* <CampusList />
        <StudentList /> */}
      </main>
    </div>
  )}
}

const mapDispatchToProps = (dispatch) => ({
  fetchCampuses: () => dispatch(fetchCampuses()),
  fetchStudents: () => dispatch(fetchStudents())
})

const RootContainer = connect(null, mapDispatchToProps)(Root)

export default RootContainer
