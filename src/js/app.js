import React from 'react'
import { render } from 'react-dom'
import List from './components/List'
import QuestionBox from './components/QuestionBox'
import Controls from './components/Controls'
import Instructions from './components/Instructions'
// import { baseUrl } from '../../config'
import tatoebaLogo from '../assets/img/tatoeba.svg'
import infoLogo from '../assets/img/info.svg'
import reportLogo from '../assets/img/report.svg'
import cornerLogo from '../assets/img/githubCorner.svg'

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
      audio: true,
      showInstuctions: false
    }
    this.loadData = this.loadData.bind(this)
    this.toggleLang = this.toggleLang.bind(this)
    this.loadHistory = this.loadHistory.bind(this)
    this.toggleAudio = this.toggleAudio.bind(this)
    this.setCurrentIndex = this.setCurrentIndex.bind(this)
    this.setListeners = this.setListeners.bind(this)
    this.hideInstructions = this.hideInstructions.bind(this)
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

  loadHistory() {
    this.setState({sentences: JSON.parse(localStorage.getItem('sentences')), currentIndex: 0})
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

  hideInstructions() {
    this.setState({showInstuctions: false})
  }

  render() {
    const { sentences, currentIndex, lang, audio } = this.state

    return (
      <main className="wrapper">
        <aside>
          <Controls audio={audio} toggleAudio={this.toggleAudio} loadHistory={this.loadHistory} lang={lang} toggleLang={this.toggleLang} loadData={this.loadData}/>
          <List lang={lang} sentences={sentences} currentIndex={currentIndex} setCurrentIndex={this.setCurrentIndex} />
        </aside>
        <section className="main">

          <div className="top">
            <button
              title="Instructions"
              onClick={e => this.setState({showInstuctions: true})}
            >
              <img src={infoLogo} alt="Instructions"/>
            </button>
            <a href="https://github.com/dobladov/tatoebaBox/issues" title="Report a problem" target="_blank">
              <img src={reportLogo} alt="Report logo"/>
            </a>
            <a className="corner" href="https://github.com/dobladov/tatoebaBox" title="Github Repositiory" target="_blank">
              <img src={cornerLogo} alt="Github Repositiory"/>
            </a>
          </div>

          <div className="middle">
          {sentences.length >0 &&
            <QuestionBox lang={lang} audio={audio} sentence={sentences[currentIndex]} showInstructions={this.state.showInstuctions}/>
          }
          </div>
          <footer className="footer">
            <a href="https://tatoeba.org/" target="_blank">
              Sentences provided by Tatoeba &nbsp;<img src={tatoebaLogo} alt="Tatoeba Logo"/>
            </a>
          </footer>
        </section>
        {this.state.showInstuctions &&
          <Instructions hideInstructions={this.hideInstructions} />
        }
      </main>
    )
  }
}

render(<App/>, document.getElementById('App'))