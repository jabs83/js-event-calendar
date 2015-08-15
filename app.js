var events = [
  {start: 30, end: 150},
  {start: 540, end: 600},
  {start: 560, end: 620},
  {start: 610, end: 670}
];

function layOutDay(inputArray) {
  //sort the input array from earliest start time to latest. Items with identical start times will compare end times - the longer duration item resolves with lower index. Assumes no exact duplicate items.
  var sortedDates = inputArray.sort(function(a,b) {
    var caseOne= (a.end>b.end) ? -1 : 1,
        caseTwo= a.start - b.start;

    return (a.start===b.start) ? caseOne : caseTwo;
  });

  //use todays date at 9:30am as default
  //function that takes a start time in minutes since 9:30 and returns the formatted time string
  function getEventTime(minutes) {
    var d = new Date(),
        n;
    d.setHours(9);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMinutes(d.getMinutes()+minutes);
    n = d.toLocaleTimeString();

    return n;
  }

  for(var i=0, arrayLength = sortedDates.length; i<arrayLength; i++) {
    var currentItem = sortedDates[i],
        itemDuration = currentItem.end-currentItem.start,
        itemStart = currentItem.start,
        itemEnd = currentItem.end,
        itemNumber = i+1,
        prevItem = sortedDates[i-1],
        nextItem = sortedDates[i+1],
        eventStartTime = getEventTime(itemStart),
        eventEndTime = getEventTime(itemEnd),
        newDiv = document.createElement('div');

    //set a default direction to each item
    currentItem.stagger = 'odd';

    //determine which items overlap and set a property to indicate
    if(nextItem !== undefined && (currentItem.end - nextItem.start > 0)) {
      currentItem.overlap = true;
      nextItem.overlap = true;
    }

    //ensure items flow in UI by staggering overlapping items
    if(prevItem !== undefined && (prevItem.stagger === 'odd')) {
      currentItem.stagger = 'even';
    }

    //apply class to new div based on direction
    newDiv.className = 'event '+currentItem.stagger;

    //set class names on new DOM element based on overlap
    if(currentItem.overlap === true) {
      newDiv.className += ' split';
    }

    //set the size and position based on computed duration and start time
    newDiv.innerHTML='<strong>Event '+itemNumber+'</strong>('+eventStartTime+'-'+eventEndTime+')';
    newDiv.setAttribute('style', 'height:'+itemDuration+'px; top:'+itemStart+'px');

    //insert new element into DOM
    document.getElementById('events').firstElementChild.appendChild(newDiv);
  }
}

// layOutDay(events);
