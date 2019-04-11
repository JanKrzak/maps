import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})

export class MapsComponent implements OnInit {

  constructor(public appComponent: AppComponent) {
  }

  public optimizedWaypointsArray = [];

  ngOnInit() {

    let WROCLAW = new google.maps.LatLng(51.106782, 17.039459);

    let app = this.appComponent;
    let map = new google.maps.Map(document.getElementById('map'), {
      center: WROCLAW,
      zoom: 13
    });

    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function () {
      calculateAndDisplayRoute(directionsService, directionsDisplay)
    });


    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      let waypts = [];
      let sortedWaypoints = [];
      let html = '';
      let checkboxArray = app.addressArray;
      for (let i = 0; i < checkboxArray.length; i++) {
        waypts.push({
          location: checkboxArray[i],
          stopover: true
        });
      }
      if (app.comapnyAddress == null) {
        window.alert('Wprowadź adres siedziby');
      }
      else {
        directionsService.route({
          origin: app.comapnyAddress,
          destination: app.comapnyAddress,
          waypoints: waypts,
          travelMode: 'DRIVING',
          optimizeWaypoints: true
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            let route = response['routes'][0];
            console.log('Waypoints: ', response);
            for (let i = 0; i < route['legs'].length; i++) {
              sortedWaypoints.push(route['legs'][i]['end_address']);
              html += '<div class="ng-trigger ng-trigger-moveInLeft" _ngcontent-c0=""> ' + (i + 1) + '. '
                + route['legs'][i]['end_address'] + ': ' + route['legs'][i]['duration']['text'] + ' </div>';
            }
            console.log('Waypoints: ', sortedWaypoints);
            document.querySelector('.test-cnt').innerHTML = html
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    }
  }
}
