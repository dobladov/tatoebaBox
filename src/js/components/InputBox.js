import React from 'react'
import play from '../play'

import '../../styles/components/InputBox.pcss'

class InputBox extends React.Component {
  constructor(props) {
    super(props)
    this.checkAnswer = this.checkAnswer.bind(this)
  }

  checkAnswer(e) {
    const value = e.target.value.replace(/[|&;$%@"<>()+,•!?:.]/g, "").trim().toLowerCase()
    if (value.length < 1) {
      e.target.classList.remove('error')
      e.target.classList.remove('correct')
    } else if (value === this.props.word.replace(/[|&;$%@"<>()+,•!?:.]/g, "").trim().toLowerCase()) {
      e.target.classList.add('correct')
      e.target.classList.remove('error')
    } else {
      e.target.classList.add('error')
      e.target.classList.remove('correct')
    }
  }

  render() {
    const { sentence, lang, langAnswer } = this.props

    return (
      <div className="inputWrapper">
        <input
          type="text"
          className="InputBox"
          style={{width: `${this.props.word.length*1.4}ex`}}
          maxlength={this.props.word.length}
          onKeyUp={this.checkAnswer}
          onClick={() => play(this.props.word, langAnswer)}
          onKeyDown={e => {
            if (e.keyCode === 32 && e.ctrlKey) {
              play(this.props.word, langAnswer)
            }
          }}
        />
        <span>
          {this.props.word}
        </span>
      </div>
    )
  }
}

export default InputBox