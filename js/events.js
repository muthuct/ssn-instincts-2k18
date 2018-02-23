let events = (function(){
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
    let MarkdownIt = window.markdownit({html: true});
    let data = {}

    let clubLinkClasses = [ "club-link" ]
    let clubEventLinkClasses = [ "club-event-link" ]

    let clubLinks = [];
    let clubEventLinks = [];



    let selectorEleEventsContent = "#events-content"
    let eleEventsContent = document.querySelector(selectorEleEventsContent)
    function getData() {
        return fetch("events/events.json").then(response => response.json())
    }

    function processData(eventData) {
        return new Promise((resolve, reject) => {
            let clubs = [];
            for(var clubName in eventData) {
                let clubData = eventData[clubName].events.map((clubEventName, index) => {
                    let url = "events/md/" + clubName + "_" + (index + 1)  + ".md";
                    return {
                        name: clubEventName,
                        data: {
                            url,
                            md: "",
                            html: "",
                            DOM: null
                        }
                    }
                })
                clubs.push({
                    name: eventData[clubName].name,
                    friendlyName: eventData[clubName].friendlyName,
                    bgURL: eventData[clubName].bgURL,
                    data: clubData
                })
            }
            data.processedData = clubs
            resolve(clubs)
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

    function getClubEventDetailsMD(clubEvent) {
        return new Promise((resolve, reject) => {
            if(!clubEvent.data.md) {
                fetch(clubEvent.data.url).then(response => {
                    return response.text()
                }).then(md => {
                    clubEvent.data.md = md
                    resolve(clubEvent.data.md)
                })
            } else {
                resolve(clubEvent.data.md)
            }
        })
    }

    function getClubEventDetailsHTML(clubEvent) {
        return new Promise((resolve, reject) => {
            if(!clubEvent.data.html) {
                getClubEventDetailsMD(clubEvent).then(md => {
                    return MarkdownIt.render(md);
                }).then(html => {
                    clubEvent.data.html = html
                    resolve(clubEvent.data.html)
                })
            } else {
                resolve(clubEvent.data.html)
            }
        })
    }

    function getClubEventDetailsDOM(clubEvent) {
        return new Promise((resolve, reject) => {
            if(!clubEvent.data.DOM) {
                getClubEventDetailsHTML(clubEvent).then(html => {
                    let div = document.createElement('div')
                    div.innerHTML = html
                    return div
                }).then(DOM => {
                    clubEvent.data.DOM = DOM
                    resolve(clubEvent.data.DOM)
                })
            } else {
                resolve(clubEvent.data.DOM)
            }
        })
    }

    function setEventDetailContentToClubEventDetails(clubEventDetailsDOM) {
        clearElement(eleEventDetailContent)
        eleEventDetailContent.appendChild(clubEventDetailsDOM)
    }

    function setEventMasterToClubEventList(club) {
        clearElement(eleEventMaster)
        club.eventLinks.forEach(DOM => { eleEventMaster.appendChild(DOM) })

        club.previousOrFirst.clubEventLink.click()
    }

    function createClubEventLinkHandler(clubEvent, club) {
        return function(event) {
            club.eventLinks.forEach(linkEle => { linkEle.classList.remove("active") })
            clubEvent.clubEventLink.classList.add("active")
            getClubEventDetailsDOM(clubEvent)
                .then(setEventDetailContentToClubEventDetails)
            club.previousOrFirst = clubEvent;
        }
    }

    function getClubEventsDOM(club) {
        return new Promise((resolve, reject) => {
            if(!club.eventLinks) {
                club.eventLinks = club.data.map(clubEvent => {
                    let clubEventLink = document.createElement('a');
                    clubEventLink.innerText = clubEvent.name;
                    clubEventLink.addEventListener('click', createClubEventLinkHandler(clubEvent, club))
                    clubEventLinkClasses.forEach(cssClass => clubEventLink.classList.add(cssClass));
                    clubEvent.clubEventLink = clubEventLink;
                    return clubEventLink
                })
                club.previousOrFirst = club.data[0]
                resolve(club)
            } else {
                resolve(club)
            }

        })
    }

    function createClubLinkHandler(club) {
        return function(event) {
            clubLinks.forEach(linkEle => { linkEle.classList.remove("active") })
            club.clubLink.classList.add("active")
            eleEventModalTitle.textContent = club.name;
            eleEventModal.style.backgroundImage = 'url(' + club.bgURL + ')'
            getClubEventsDOM(club)
                .then(setEventMasterToClubEventList)
                .then(openModal)
        }
    }

    function addClubToDOM(club) {
        let clubLink = document.createElement('a');
        clubLink.textContent = club.friendlyName;
        club.clubLinkEventHandler = createClubLinkHandler(club)
        clubLink.addEventListener('click', club.clubLinkEventHandler)
        // clubLink.href = '#';
        clubLinks.push(clubLink);
        clubLinkClasses.forEach(cssClass => clubLink.classList.add(cssClass));
        eleEventsContent.appendChild(clubLink);
        club.clubLink = clubLink
    }

    function setUpDOM(clubs) {
        clearElement(eleEventsContent)
        clubs.forEach(addClubToDOM)
    }

    function openModal(){
        $(selectorEleEventModal).modal()
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
