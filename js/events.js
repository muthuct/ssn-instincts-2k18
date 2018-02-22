let events = (function(){
    // let idEleEventMaster = "left-side-pane"
    // let idEleEventDetail = "right-side-pane"
    // let idEleEventDetailHeader = "right-side-pane-header"
    // let idEleEventDetailContent = "right-side-pane-content"
    // let eleEventMaster = document.getElementById(idEleEventMaster);
    // let eleEventDetail = document.getElementById(idEleEventDetail);
    // let eleEventDetailHeader = document.getElementById(idEleEventDetailHeader);
    // let eleEventDetailContent = document.getElementById(idEleEventDetailContent);
    // let MarkdownIt = window.markdownit({html: true});
    // let data = {}

    // let clubLinkClasses = [ "club-link" ]
    // let clubEventLinkClasses = [ "club-event-link" ]

    // let clubLinks = [];
    // let clubEventLinks = [];

    // <div id="star-events-content-left"></div>
    // <div id="star-events-content-right"></div>
    // <div id="star-events-title"><div>Star</div><div>Events</div></div>

    let idEleEventsContent = "events-content"
    let EleEventsContent = document.getElementById(idEleEventsContent)
    function getData() {
        return fetch("events/events.json").then(response => response.json())
    }

    function processData(eventData) {
        return new Promise((resolve, reject) => {
            // let clubs = [];
            // for(var clubName in eventData) {
            //     let clubData = eventData[clubName].events.map((clubEventName, index) => {
            //         let url = "events/md/" + clubName + "_" + (index + 1)  + ".md";
            //         return {
            //             name: clubEventName,
            //             data: {
            //                 url,
            //                 md: "",
            //                 html: "",
            //                 DOM: null
            //             }
            //         }
            //     })
            //     clubs.push({
            //         name: eventData[clubName].name,
            //         friendlyName: eventData[clubName].friendlyName,
            //         data: clubData
            //     })
            // }
            // data.processedData = clubs
            // resolve(clubs)
            let events = [];
            for(var event in eventData)
                events.push(eventData[event]);
            resolve(events);
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
        while(ele.firstChild)
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

    function setUpDOM(events) {
        clearElement(EleEventsContent)
        events.forEach((event, index) => {
            EleEventsContent.appendChild(createText(event.friendlyName, "div"))
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
