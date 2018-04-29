import React from 'react'
import closeLogo from '../../assets/img/close.svg'

import '../../styles/components/Instructions.pcss'

const Instructions = ({hideInstructions}) => (
  <div className="Instructions">
    <div className="instructionsWrapper">
      <div className="title">
        Instructions

        <button className="close" onClick={() => hideInstructions()}>
          <img src={closeLogo} alt="close"/>
        </button>
      </div>
      <div className="content">

        <div className="keyBlock">
          <span className="key">Ctrl</span> + <span className="key">Enter</span> Next Sentence
        </div>
        <div className="keyBlock">
          <span className="key">Ctrl</span> + <span className="key">Space</span> Play Current Word
        </div>
        <div className="keyBlock">
          <span className="key">Ctrl</span> + <span className="key">Shift</span> + <span className="key">Enter</span> Play Sentence
        </div>

      </div>
    </div>
  </div>
)

export default Instructions