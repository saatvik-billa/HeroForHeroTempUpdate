import {list, getCoordinates} from './js/data'

var map;
let properties = []

function initMap() {
  map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 8,
    center: {lat: 30.2672, lng: -97.7431}
  });

  let markers = []
  list.forEach( (element, index) => {
    markers.push(element)
    markers[index].map = map
  })

  markers.forEach((element, index) => {
      addMarker(element, index)
      properties.push(element)
  }) 
}

window.initMap = initMap; 
window.addMarker = addMarker;

async function addMarker(obj, i) {
    await getCoordinates(obj);

    var marker = new google.maps.Marker(obj);
    var infowindow = new google.maps.InfoWindow({
        content: obj.title
    });
    
    document.querySelector('.locations').insertAdjacentHTML('beforeend', `
      <li>
        <h4>${obj.title}</h4>
        <p>${obj.address}</p>
        <button class="selectButton">Select</button>
      </li>
    `) 
    properties[i].position = obj.position

    marker.addListener('click', function() {
        infowindow.open(map, marker)

        window.alert('Donating towards specific organizations is currently unavailable as we are still recruiting recipient organizations. Please see the message at the top of this section for how to donate at the moment.')

        /*
        document.querySelector('.inputBox').value = obj.address; 
        
        let index = getAddress();
        if (properties[index].squareLink !== '') {
          document.querySelector('.selectOptions').setAttribute('href', properties[index].squareLink) 
        }
        */
        
        
    });
}

function getAddress() {
  let value = document.querySelector('.inputBox').value;
  let index = properties.findIndex(element => element.address === value)
  if (index !== -1) {
    return index; 
  } else {
    window.alert('Donating towards specific organizations is currently unavailable as we are still recruiting recipient organizations. Please see the message at the top of this section for how to donate at the moment.')
  }
  return -1
}

function toggleButton() {
  var e = document.querySelector('.dropdown-content');
  if (e.style.display == 'block') {
    e.style.display = 'none';
  } else {
    e.style.display = 'block'; 
  }
}

// ---- EVENT LISTENERS ----

['.dropbtn', '.link'].forEach(element => {
  document.querySelectorAll(element).forEach(el => {
    el.addEventListener('click', () => {
      toggleButton();
    })
  })
})

document.querySelectorAll('.sm').forEach(element => {
  element.addEventListener('click', () => {
    window.alert('We do not have any social media accounts at this time.')
  })
})


document.querySelector('.selectOptions').addEventListener('click', () => {
  getAddress();
})



document.querySelector('.locations').addEventListener('click', element => {
  let el = element.target.parentNode.childNodes[3].innerHTML; 
  if (el) {
    //document.querySelector('.inputBox').value = el; 
    window.alert('Donating towards specific organizations is currently unavailable as we are still recruiting recipient organizations. Please see the message at the top of this section for how to donate at the moment.')
  }
  /*
  let index = getAddress(); 
  document.querySelector('.selectOptions').setAttribute('href', properties[index].squareLink)
  */
})



