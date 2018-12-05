import React from 'react'
import CampusList from './campus-list'

const Root = () => {
  return (
    <div>
      <nav>
        Welcome!
      </nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        <p>This seems like a nice place to get started with some Routes!</p>
        <CampusList />
      </main>
    </div>
  )
}

export default Root
