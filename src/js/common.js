export const triggerClick = (e, code) => {
  if (e.keyCode === (code || 32)) {
    e.target.click()
  }
}