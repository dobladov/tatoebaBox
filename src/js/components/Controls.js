import React from 'react'
import refreshIcon from '../../assets/img/refresh.svg'
import historyIcon from '../../assets/img/history.svg'
import deFlag from '../../assets/img/de.svg'
import gbFlag from '../../assets/img/gb.svg'
import muteIcon from '../../assets/img/mute.svg'
import audioIcon from '../../assets/img/audio.svg'
import commitIcon from '../../assets/img/commit.svg'
import { triggerClick } from '../common'

import '../../styles/components/Controls.pcss'

const Controls = ({toggleLang, loadData, lang, audio, toggleAudio, loadHistory}) => (
  <aside className="Controls">

    <button
      title="Load new sentences"
      onClick={loadData}
    >
      <img src={refreshIcon} alt="Refresh"/>
    </button>

    {localStorage.getItem("sentences") &&
      <button
        title="Load senteces from History"
        className="historyIcon"
        onClick={loadHistory}
      >
        <img src={historyIcon} alt="History"/>
      </button>
    }

    <button
      title="Toggle audio"
      className="audioIcon"
      onClick={toggleAudio}
    >
      <img src={audio ? audioIcon : muteIcon} alt="audio"/>
    </button>
    <div
      title="Switch languages"
      className="langs"
      onClick={toggleLang}
      tabIndex="0"
      onKeyDown={triggerClick}
    >
      <button tabIndex="-1">
        <img src={lang === 'ger' ? deFlag : gbFlag} alt={lang}/>
      </button>
      <img src={commitIcon} alt=""/>
      <button tabIndex="-1">
        <img src={lang === 'eng' ? deFlag : gbFlag} alt={lang}/>
      </button>

    </div>
  </aside>
)

export default Controls