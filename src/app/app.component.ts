import { Component } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 11,
    center: latLng(40.758700379161006, -73.95652770996094),
  };

  title = 'nyc-wifi';
}
