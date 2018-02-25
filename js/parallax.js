let parallax = (function () {
  let selectors = {
    mainLayer: "#layer-main",
    bg0Layer: "#layer-bg-0",
    bg1Layer: "#layer-bg-1",
    bg2Layer: "#layer-bg-2",
    bg3Layer: "#layer-bg-3"
  }

  let els = {
    mainLayer: document.querySelector(selectors.mainLayer),
    bg0Layer: document.querySelector(selectors.bg0Layer),
    bg1Layer: document.querySelector(selectors.bg1Layer),
    bg2Layer: document.querySelector(selectors.bg2Layer),
    bg3Layer: document.querySelector(selectors.bg3Layer)
  }

  let loop = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) { setTimeout(callback, 1000 / 60); };

  let transformProp = window.transformProp || (function () {
    let testEl = document.createElement('div');
    if (testEl.style.transform === null) {
      let vendors = ['Webkit', 'Moz', 'ms'];
      for(let i = 0; i < vendors.length; i++) {
        if (testEl.style[vendors[i] + 'Transform'] !== undefined) {
          return vendors[i] + 'Transform';
        }
      }
    }
    return 'transform';
  })();

  let screenDimen = {
    width: 0,
    height: 0
  }

  let contentDimen = {
    width: 0,
    height: 0,
    hiddenHeight: 0
  }

  let bgDimen = {
    width: 0,
    height: 0,
    hiddenHeight: 0
  }

  let scrollPosY = 0;
  let scrollRatio = 0;

  function init() {

  }

  function resizeHandler(event)
  {
    screenDimen.width = window.innerWidth
    screenDimen.height = window.innerHeight

    let contentBounds = els.mainLayer.getBoundingClientRect()
    contentDimen.width = contentBounds.width
    contentDimen.height = contentBounds.height
    contentDimen.hiddenHeight = contentDimen.height - screenDimen.height

    let bgBounds = els.bg2Layer.getBoundingClientRect()
    bgDimen.width = bgBounds.width
    bgDimen.height = bgBounds.height
    bgDimen.hiddenHeight = bgDimen.height - screenDimen.height

    updateScrollPosition()
  }

  function getScrollPosition() {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset;
    }

    return (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }

  function updateScrollPosition() {
    let oldPos = scrollPosY
    scrollPosY = getScrollPosition()
    scrollRatio = scrollPosY / contentDimen.hiddenHeight
    return oldPos != scrollPosY
  }

  function animate() {

    let yVal = -((scrollRatio * bgDimen.hiddenHeight) / bgDimen.height) * 100
    els.bg0Layer.style[transformProp] = 'translate3d(0px,' + yVal + '%, 0px)';
    els.bg1Layer.style[transformProp] = 'translate3d(0px,' + yVal + '%, 0px)';
    els.bg2Layer.style[transformProp] = 'translate3d(0px,' + yVal + '%, 0px)';
    els.bg3Layer.style[transformProp] = 'translate3d(0px,' +  yVal + '%, 0px)';
  }

  function update() {
    if (updateScrollPosition()) {
      animate()
      // console.log(scrollRatio)
    }

    loop(update)
  }

  resizeHandler()
  animate()
  update()

  window.addEventListener('resize', resizeHandler);
  // window.addEventListener('scroll', function () {

  // })
})()
