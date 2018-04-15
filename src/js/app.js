import React from 'react'
import { render } from 'react-dom'
import List from './components/List'
import QuestionBox from './components/QuestionBox'
import Controls from './components/Controls'
// import { baseUrl } from '../../config'

import 'normalize.css'
import '../styles/main.pcss'

const baseUrl = 'https://tatoeba-be833.firebaseio.com/sentences.json'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sentences: [],
      currentIndex: 0,
      lang: 'eng',
      audio: true
    }
    this.loadData = this.loadData.bind(this)
    this.toggleLang = this.toggleLang.bind(this)
    this.toggleAudio = this.toggleAudio.bind(this)
    this.setCurrentIndex = this.setCurrentIndex.bind(this)
    this.setListeners = this.setListeners.bind(this)
  }

  componentDidMount() {
    this.loadIndex().then(() => {
      this.loadData()
      this.setListeners()
    })
  }

  setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && e.ctrlKey && !e.shiftKey) {
        const next = this.state.currentIndex + 1 < this.state.sentences.length ? this.state.currentIndex + 1 : 0
        this.setCurrentIndex(next)
      }
    })
  }

  async loadIndex() {
    // Get last index
    const response = await fetch(`${baseUrl}?orderBy="$key"&limitToLast=1`)
    const json = await response.json()
    this.lastIndex = Object.keys(json)[0]
  }

  async loadData() {

    const random = Math.floor((Math.random() * this.lastIndex))

    // Get 20 randmon elements counting from the random number
    fetch(`${baseUrl}?orderBy="$key"&startAt="${random}"&limitToFirst=20`).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({sentences: Object.values(json), currentIndex: 0})
        })
      }
    })
  }

  toggleLang() {
    this.setState({lang: this.state.lang === 'eng' ? 'ger' : 'eng'})
  }

  toggleAudio() {
    this.setState({audio: !this.state.audio})
  }

  setCurrentIndex(index) {
    this.setState({currentIndex: index})
  }

  render() {
    const { sentences, currentIndex, lang, audio } = this.state

    return (
      <main className="wrapper">
        <aside>
          <Controls audio={audio} toggleAudio={this.toggleAudio} lang={lang} toggleLang={this.toggleLang} loadData={this.loadData}/>
          <List lang={lang} sentences={sentences} currentIndex={currentIndex} setCurrentIndex={this.setCurrentIndex} />
        </aside>
        {sentences.length >0 &&
          <QuestionBox lang={lang} audio={audio} sentence={sentences[currentIndex]}/>
        }
      </main>
    )
  }
}

render(<App/>, document.getElementById('App'))