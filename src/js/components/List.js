import React from 'react'

import '../../styles/components/List.pcss'

const List = ({sentences, lang, currentIndex, setCurrentIndex }) => (
  <aside className="List">
    {sentences.length > 0 &&
    sentences.map((sentence, i) => (
      <div
        key={`${sentence.englishId}-${sentence.germanId}`}
        style={{animationDelay: `${150 * i}ms`}}
        className={`sentence${currentIndex === i ? ' current': ''}`.trim()}
        onClick={() => {
          setCurrentIndex(i)
        }}
      >
        {lang === 'eng' ? sentence.englishText : sentence.germanText}
      </div>
    ))}
  </aside>
)

export default List