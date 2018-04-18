import React from 'react'
import InputBox from './InputBox'
import playIcon from '../../assets/img/play.svg'
import '../../styles/components/QuestionBox.pcss'

import play from '../play'

class QuestionBox extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && e.ctrlKey && e.shiftKey) {
        play(this.props.lang === 'eng' ? this.props.sentence.germanText : this.props.sentence.englishText,
          this.props.lang === 'eng' ? 'Deutsch Female': 'UK English Female')
      }
    })
  }

  render() {
    const { sentence, lang, audio } = this.props
    const question = lang === 'eng' ? sentence.englishText : sentence.germanText
    const answer = lang === 'eng' ? sentence.germanText : sentence.englishText
    const langAnswer = lang === 'eng' ? 'Deutsch Female': 'UK English Female'

    if (audio)
      play(answer, langAnswer)

    return (
      <section className="QuestionBox">
        <div className="box">
          <div
            className="question"
            title={answer}
          >
            <span>
              <a
                href={`https://tatoeba.org/eng/sentences/show/${lang === 'eng' ? sentence.englishId : sentence.germanId}`}
                target="_blank"
              >
                {question}
              </a>
            </span>
            {audio &&
              <button
                  className="playAudio"
                  onClick={() => play(question, lang === 'eng' ? 'UK English Female': 'Deutsch Female')}
                >
                <img src={playIcon} alt="Play"/>
              </button>
            }
          </div>
          <div className="answer">
            {answer.split(' ').map((word, i) => (
              <InputBox langAnswer={langAnswer} key={`${i}-${word}-${sentence.englishId}-${sentence.germanId}`} word={word} />
            ))}

            {audio &&
              <button
                  className="playAudio"
                  onClick={() => play(answer, langAnswer)}
                >
                <img src={playIcon} alt="Play"/>
              </button>
            }
          </div>
        </div>
      </section>
    )
  }
}

export default QuestionBox