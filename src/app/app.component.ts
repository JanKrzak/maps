import {Component} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('moveInLeft', [
      transition('void=> *', [style({transform: 'translateX(300px)'}),
        animate(200, keyframes([
          style({transform: 'translateX(300px)'}),
          style({transform: 'translateX(0)'})
        ]))]),

      transition('*=>void', [style({transform: 'translateX(0px)'}),
        animate(100, keyframes([
          style({transform: 'translateX(0px)'}),
          style({transform: 'translateX(300px)'})

        ]))])
    ])
  ]
})

export class AppComponent {
  addressArray = [];
  comapnyAddress: String;

  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;

  latitude: number;
  longtitude: number;
  latLang = {lat: 0, lng: 0};

  constructor() {
  }

  getAddress(place: object) {
    this.formattedAddress = place['formatted_address'];
  }

  getCompanyAddress(place: object) {
    this.comapnyAddress = place['formatted_address'];
  }

  getLatLang() {
    return this.latLang;
  }

  getPosition(place: object) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.formattedAddress + '&key=AIzaSyB7GFmTlYcBnb6OZHqk-OBwETCkgdgvnjs';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Data: ', data);
        this.latitude = data['results'][0]['geometry']['location']['lat'];
        this.longtitude = data['results'][0]['geometry']['location']['lng'];
        this.latLang = {lat: this.latitude, lng: this.longtitude};
      });
  }

  addAddressInput(value) {
    if (value !== '') {
      this.addressArray.push(value);
      console.log('Address: :', this.formattedAddress);
    } else {
      alert('Field required **')
    }
  }

  /*delete item*/
  deleteAddress(todo) {
    for (let i = 0; i <= this.addressArray.length; i++) {
      if (todo == this.addressArray[i]) {
        this.addressArray.splice(i, 1)
      }
    }
  }
}


