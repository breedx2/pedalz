import './bikeyshit.css';
import eventsAll from './events-all.json';
import { Searching } from './searching';

const rides = eventsAll.events;
rides.sort((a,b) => `${a.date} ${a.time}` > `${b.date} ${b.time}`)

function clearRides(){
  document.querySelector('div#rides').innerHTML = '';
}

window.addToSearch = function(value){
  console.log("FU!");
  searching.addToSearch(value);
}


function makeCardHtml(ride){
  let html = `
  <h1>${ride.title}
    <a title='pedalpalooza permalink' href="${ride.shareable}">🚲</a>`;
  if(ride.weburl){
    html += `&nbsp;<a title='web link' href="${ride.weburl}">🕸️</a>`;
  }
  let startLoc = `${ride.venue} - ${ride.address}`;
  if(ride.locdetails) {
    startLoc += ` (${ride.locdetails.trim()})`;
  }
  html += `</h1>
  <b>When</b>: <rdate>${ride.date} ${ride.time}</rdate>`;
  if(ride.timedetails){
    html += `<rtdeets> (${ride.timedetails})</rtdeets>`;
  }
  html += `<br/>
  <b>Start</b>: <rstart>${startLoc}</rstart>
  <br/>`;
  if(ride.locend){
    html += `<b>End</b>: <rend>${ride.locend}</rend><br/>`;
  }
  const hostClick = `window.addToSearch("host:\\"${ride.organizer.trim()}\\\"")`;
  html += `
  <b>Host</b>: <rhost><a href="#" onclick='${hostClick}'>${ride.organizer}</a></rhost>
  <p class='ride-desc'>${ride.details}</p>
  `;
  return html;
}


// Make a ride card
function makeCard(ride){
  const element = document.createElement('div');
  const html = makeCardHtml(ride);
  element.innerHTML = html;
  return element;
}

function addRide(ride){
  const rideDiv = document.querySelector('div#rides');
  rideDiv.appendChild(makeCard(ride));
  rideDiv.appendChild(document.createElement('hr'));
}

function displayResults(matchedRides){
  clearRides();
  matchedRides.forEach(ride => addRide(ride));
  document.querySelector('span#matchct').innerHTML = `<b>[${matchedRides.length} rides found]</b>`;
}

const searching = new Searching(rides, displayResults);

console.log(rides[0]);
clearRides();
//TODO: initially filter on future rides only
searching.search();
// rides.forEach(ride => addRide(ride));
