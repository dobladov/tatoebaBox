import React from 'react'
import { render } from 'react-dom'
import * as firebase  from 'firebase'

import List from './components/List'
import QuestionBox from './components/QuestionBox'

class App extends React.Component {

  componentDidMount() {
    // Get 20 randmon elements from firebase
  }

  render() {
    return (
      <main>
        <List />
        <QuestionBox />
      </main>
    )
  }
}

render(<App/>, document.getElementById('App'))