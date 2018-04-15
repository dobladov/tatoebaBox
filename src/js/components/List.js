import React from 'react'

import '../../styles/components/List.pcss'

const List = ({sentences, lang, currentIndex, setCurrentIndex }) => (
  <ul className="List">
    {sentences.length > 0 &&
    sentences.map((sentence, i) => (
      <li
        tabIndex="0"
        key={`${sentence.englishId}-${sentence.germanId}`}
        style={{animationDelay: `${150 * i}ms`}}
        className={`sentence${currentIndex === i ? ' current': ''}`.trim()}
        onClick={() => {
          setCurrentIndex(i)
        }}
      >
        {lang === 'eng' ? sentence.englishText : sentence.germanText}
      </li>
    ))}
  </ul>
)

export default List