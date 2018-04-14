const play = (text, voice) => {
  if (responsiveVoice.voiceSupport()) {
    responsiveVoice.cancel()
    responsiveVoice.speak(text, voice)
  }
}

export default play