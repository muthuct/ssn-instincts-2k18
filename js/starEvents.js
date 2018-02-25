let starEvents = (function () {
  let selectorEleEventModal = "#eventModal"
  let eleEventModal = document.querySelector(selectorEleEventModal)

  let selectorEleEventModalTitle = "#eventModal .modal-title"
  let selectorEleEventMaster = "#eventModal .left-pane"
  let selectorEleEventDetail = "#eventModal .right-pane"
  let selectorEleEventDetailHeader = "#eventModal .right-pane-header"
  let selectorEleEventDetailContent = "#eventModal .right-pane-content"
  let eleEventModalTitle = document.querySelector(selectorEleEventModalTitle);
  let eleEventMaster = document.querySelector(selectorEleEventMaster);
  let eleEventDetail = document.querySelector(selectorEleEventDetail);
  let eleEventDetailHeader = document.querySelector(selectorEleEventDetailHeader);
  let eleEventDetailContent = document.querySelector(selectorEleEventDetailContent);

  let selectorEleStarEventModal = "#starEventModal"
  let eleStarEventModal = document.querySelector(selectorEleStarEventModal)

  let selectorEleStarEventModalTitle = "#starEventModal .modal-title"
  let selectorEleStarEventContent = "#starEventModal .modal-body-content"
  let eleStarEventModalTitle = document.querySelector(selectorEleStarEventModalTitle);
  let eleStarEventContent = document.querySelector(selectorEleStarEventContent);

  let MarkdownIt = window.markdownit({ html: true });
  let data = {}

  let starEventLinkClasses = ["club-link"]
  let starEventAggrLinkClasses = ["club-event-link"]

  let starEventLinks = [];
  // let clubEventLinks = [];

  let idEleStarEventsContentLeft = "star-events-content-left"
  let idEleStarEventsContentRight = "star-events-content-right"
  let EleStarEventsContentLeft = document.getElementById(idEleStarEventsContentLeft)
  let EleStarEventsContentRight = document.getElementById(idEleStarEventsContentRight)

  function getData() {
    return fetch("events/starEvents.json").then(response => response.json())
  }

  function processData(eventData) {
    return new Promise((resolve, reject) => {
      let starEvents = [];
      for (var event in eventData) {
        let starEventData = eventData[event].events.map((starEventName, index) => {
          let url = "events/md/" + event + "_" + (index + 1) + ".md";
          return {
            name: starEventName,
            data: {
              url,
              md: "",
              html: "",
              DOM: null
            }
          }
        })
        processedData = Object.assign({}, eventData[event])
        processedData.data = starEventData
        starEvents.push(processedData)
      }
      data.processedData = starEvents
      resolve(starEvents);
    })
  }

  function createText(text, element) {
    let ele = document.createElement(element);
    ele.textContent = text;
    return ele;
  }

  function wrapInElement(element, wrapperElementString) {
    let wrapper = document.createElement(wrapperElementString)
    wrapper.appendChild(element)
    return wrapper
  }

  function clearElement(ele) {
    while (ele.firstChild)
      ele.removeChild(ele.firstChild)
  }

  // function clearEventDetail() { clearElement(eleEventDetail) }

  // function getClubEventDetailsMD(clubEvent) {
  //     return new Promise((resolve, reject) => {
  //         if(!clubEvent.data.md) {
  //             fetch(clubEvent.data.url).then(response => {
  //                 return response.text()
  //             }).then(md => {
  //                 clubEvent.data.md = md
  //                 resolve(clubEvent.data.md)
  //             })
  //         } else {
  //             resolve(clubEvent.data.md)
  //         }
  //     })
  // }

  // function getClubEventDetailsHTML(clubEvent) {
  //     return new Promise((resolve, reject) => {
  //         if(!clubEvent.data.html) {
  //             getClubEventDetailsMD(clubEvent).then(md => {
  //                 return MarkdownIt.render(md);
  //             }).then(html => {
  //                 clubEvent.data.html = html
  //                 resolve(clubEvent.data.html)
  //             })
  //         } else {
  //             resolve(clubEvent.data.html)
  //         }
  //     })
  // }

  // function getClubEventDetailsDOM(clubEvent) {
  //     return new Promise((resolve, reject) => {
  //         if(!clubEvent.data.DOM) {
  //             getClubEventDetailsHTML(clubEvent).then(html => {
  //                 let div = document.createElement('div')
  //                 div.innerHTML = html
  //                 return div
  //             }).then(DOM => {
  //                 clubEvent.data.DOM = DOM
  //                 resolve(clubEvent.data.DOM)
  //             })
  //         } else {
  //             resolve(clubEvent.data.DOM)
  //         }
  //     })
  // }

  // function setEventDetailContentToClubEventDetails(clubEventDetailsDOM) {
  //     clearElement(eleEventDetailContent)
  //     eleEventDetailContent.appendChild(clubEventDetailsDOM)
  // }

  // function setEventDetailHeaderToBackButton(callback, clubName) {
  //     clearElement(eleEventDetailHeader)
  //     let backLink = document.createElement("a")
  //     backLink.innerText = "Back to " + clubName
  //     backLink.href = '#'
  //     backLink.addEventListener('click', callback)
  //     let backLinkContainer = wrapInElement(backLink, "h3")
  //     eleEventDetailHeader.appendChild(backLinkContainer)
  //     let hr = document.createElement("hr")
  //     eleEventDetailHeader.appendChild(hr);
  // }

  // function setEventDetailHeaderToClubName(clubName) {
  //     clearElement(eleEventDetailHeader)
  //     let clubHeader = document.createElement("h3")
  //     clubHeader.innerText = clubName;
  //     eleEventDetailHeader.appendChild(clubHeader)
  //     let hr = document.createElement("hr")
  //     eleEventDetailHeader.appendChild(hr);
  // }

  // function setEventDetailContentToClubEventList(clubEventsDOM) {
  //     clearElement(eleEventDetailContent)
  //     clubEventsDOM.forEach(DOM => { eleEventDetailContent.appendChild(DOM) })
  // }

  // function createClubEventLinkHandler(clubEvent, club) {
  //     return function(event) {
  //         setEventDetailHeaderToBackButton(club.clubLinkEventHandler, club.name)
  //         getClubEventDetailsDOM(clubEvent)
  //             .then(setEventDetailContentToClubEventDetails)
  //     }
  // }

  // function getClubEventsDOM(club) {
  //     return new Promise((resolve, reject) => {
  //         let clubEventsDOM = club.data.map(clubEvent => {
  //             let clubEventLink = document.createElement('a');
  //             clubEventLink.innerText = clubEvent.name;
  //             clubEventLink.addEventListener('click', createClubEventLinkHandler(clubEvent, club))
  //             clubEventLink.href = '#';
  //             let p = wrapInElement(clubEventLink, 'h4');
  //             clubEventLinkClasses.forEach(cssClass => p.classList.add(cssClass));
  //             p.classList.add()
  //             return p
  //         })
  //         resolve(clubEventsDOM)
  //     })
  // }

  // function createClubLinkHandler(club) {
  //     return function(event) {
  //         clubLinks.forEach(linkEle => { linkEle.classList.remove("active") })
  //         club.clubLink.classList.add("active")
  //         setEventDetailHeaderToClubName(club.name)
  //         getClubEventsDOM(club)
  //             .then(setEventDetailContentToClubEventList)
  //     }
  // }

  // function addClubToEventMaster(club) {
  //     let clubLink = document.createElement('a');
  //     clubLink.innerText = club.friendlyName;
  //     club.clubLinkEventHandler = createClubLinkHandler(club)
  //     clubLink.addEventListener('click', club.clubLinkEventHandler)
  //     clubLink.href = '#';
  //     let p = wrapInElement(clubLink, 'h4');
  //     clubLinks.push(clubLink);
  //     clubLinkClasses.forEach(cssClass => p.classList.add(cssClass));
  //     eleEventMaster.appendChild(p);

  //     club.clubLink = clubLink
  // }

  function getStarEventDetailsMD(starEvent) {
    return new Promise((resolve, reject) => {
      if (!starEvent.data.md) {
        fetch(starEvent.data.url).then(response => {
          return response.text()
        }).then(md => {
          starEvent.data.md = md
          resolve(starEvent.data.md)
        })
      } else {
        resolve(starEvent.data.md)
      }
    })
  }

  function getStarEventDetailsHTML(starEvent) {
    return new Promise((resolve, reject) => {
      if (!starEvent.data.html) {
        getStarEventDetailsMD(starEvent).then(md => {
          return MarkdownIt.render(md);
        }).then(html => {
          starEvent.data.html = html
          resolve(starEvent.data.html)
        })
      } else {
        resolve(starEvent.data.html)
      }
    })
  }

  function getStarEventDetailsDOM(starEvent) {
    return new Promise((resolve, reject) => {
      if (!starEvent.data.DOM) {
        getStarEventDetailsHTML(starEvent).then(html => {
          let div = document.createElement('div')
          div.innerHTML = html
          return div
        }).then(DOM => {
          starEvent.data.DOM = DOM
          resolve(starEvent.data.DOM)
        })
      } else {
        resolve(starEvent.data.DOM)
      }
    })
  }

  function setEventMasterToStarEventList(starEventAggr) {
    clearElement(eleEventMaster)
    starEventAggr.eventLinks.forEach(DOM => { eleEventMaster.appendChild(DOM) })

    starEventAggr.previousOrFirst.starEventAggrLink.click()
  }

  function setEventDetailContentToClubEventDetails(clubEventDetailsDOM) {
    clearElement(eleEventDetailContent)
    eleEventDetailContent.appendChild(clubEventDetailsDOM)
  }

  function createStarEventAggrLinkHandler(starEvent, starEventAggr) {
    return function (event) {
      starEventAggr.eventLinks.forEach(linkEle => { linkEle.classList.remove("active") })
      starEvent.starEventAggrLink.classList.add("active")
      getStarEventDetailsDOM(starEvent)
        .then(setEventDetailContentToClubEventDetails)
      starEventAggr.previousOrFirst = starEvent;
    }
  }

  function getStarEventsDOM(starEventAggr) {
    return new Promise((resolve, reject) => {
      if (!starEventAggr.eventLinks) {
        starEventAggr.eventLinks = starEventAggr.data.map(starEvent => {
          let starEventAggrLink = document.createElement('a');
          starEventAggrLink.innerText = starEvent.name;
          starEventAggrLink.addEventListener('click', createStarEventAggrLinkHandler(starEvent, starEventAggr))
          starEventAggrLinkClasses.forEach(cssClass => starEventAggrLink.classList.add(cssClass));
          starEvent.starEventAggrLink = starEventAggrLink;
          return starEventAggrLink
        })
        starEventAggr.previousOrFirst = starEventAggr.data[0]
        resolve(starEventAggr)
      } else {
        resolve(starEventAggr)
      }
    })
  }

  function setEventModalToStarEventDetails(starEvent) {
    eleEventModalTitle.textContent = starEvent.name;
    if (starEvent.bgURL)
      eleEventModal.style.backgroundImage = 'url(' + club.bgURL + ')';
    else
      eleEventModal.style.backgroundImage = '';
    return getStarEventsDOM(starEvent)
      .then(setEventMasterToStarEventList)
  }

  function setStarEventModalToStarEvent(starEvent) {
    eleStarEventModalTitle.textContent = starEvent.name;
    clearElement(eleStarEventContent)
    return getStarEventDetailsDOM(starEvent.data[0])
      .then(DOM => eleStarEventContent.appendChild(DOM))
  }

  function createStarEventLinkHandler(starEvent) {
    return function (ev) {
      starEventLinks.forEach(linkEle => { linkEle.classList.remove("active") })
      starEvent.starEventLink.classList.add("active")
      if (starEvent.data.length > 1) {
        // Use Event Modal
        setEventModalToStarEventDetails(starEvent)
          .then(openEventModal)
      } else {
        // Use Star Event Modal
        setStarEventModalToStarEvent(starEvent)
          .then(openStarEventModal)
      }
    }
  }

  function createStarEventLink(event) {
    let starEventLink = document.createElement('a');
    starEventLink.textContent = event.name;
    event.starEventLinkEventHandler = createStarEventLinkHandler(event)
    starEventLink.addEventListener('click', event.starEventLinkEventHandler)
    starEventLinks.push(starEventLink);
    starEventLinkClasses.forEach(cssClass => starEventLink.classList.add(cssClass));
    event.starEventLink = starEventLink
    return starEventLink
  }

  function openEventModal() {
    $(selectorEleEventModal).modal()
  }

  function openStarEventModal() {
    $(selectorEleStarEventModal).modal()
  }

  function setUpDOM(starEvents) {
    let left = EleStarEventsContentLeft
    let right = EleStarEventsContentRight
    clearElement(left)
    clearElement(right)
    starEvents.forEach((event, index) => {
      (index % 2 == 0 ? left : right).appendChild(createStarEventLink(event))
    })
  }

  function init() {
    getData()
      .then(processData)
      .then(setUpDOM)
  }

  init()

  return {
    init
  }
})()
