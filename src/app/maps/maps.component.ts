import {OnInit} from '@angular/core';
import {Component, NgZone} from '@angular/core';
import {animate, state, style, transition, trigger, keyframes} from '@angular/animations';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})

export class MapsComponent implements OnInit {

  constructor(public appComponent: AppComponent) {
  }

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
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      let waypts = [];
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
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
      }
    }
}
