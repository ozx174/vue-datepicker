(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  function recalc () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth > 750) clientWidth = 750
    docEl.style.fontSize = (clientWidth / 7.5) + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
