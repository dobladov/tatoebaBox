import React from 'react'
import refreshIcon from '../../assets/img/refresh.svg'
import deFlag from '../../assets/img/de.svg'
import gbFlag from '../../assets/img/gb.svg'
import muteIcon from '../../assets/img/mute.svg'
import audioIcon from '../../assets/img/audio.svg'
import commitIcon from '../../assets/img/commit.svg'
import { triggerClick } from '../common'

import '../../styles/components/Controls.pcss'

const Controls = ({toggleLang, loadData, lang, audio, toggleAudio}) => (
  <aside className="Controls">

    <button
      onClick={loadData}
    >
      <img src={refreshIcon} alt="Refresh"/>
    </button>

    <button
      className="audioIcon"
      onClick={toggleAudio}
    >
      <img src={audio ? audioIcon : muteIcon} alt="audio"/>
    </button>
    <div
      className="langs"
      onClick={toggleLang}
      tabIndex="0"
      onKeyDown={triggerClick}
    >
      <button tabIndex="-1">
        <img src={lang === 'ger' ? gbFlag: deFlag} alt={lang}/>
      </button>
      <img src={commitIcon} alt=""/>
      <button tabIndex="-1">
        <img src={lang === 'eng' ? gbFlag: deFlag} alt={lang}/>
      </button>

    </div>
  </aside>
)

export default Controls