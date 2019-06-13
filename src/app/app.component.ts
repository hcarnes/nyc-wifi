import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, marker, icon, Layer } from 'leaflet';
import { HotspotService } from './hotspot.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private hotspots: HotspotService) {}

  ngOnInit() {
    this.hotspots.getHotspots().subscribe((hotspots) => {
      this.layers = hotspots.map((hotspot) => {
        return marker([ hotspot.the_geom.coordinates[1], hotspot.the_geom.coordinates[0] ], {
          icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        }).bindPopup(`${hotspot.provider}${hotspot.name && `- ${hotspot.name}` || ""}`)
      })
    })
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, minZoom: 15,attribution: '...' })
    ],
    zoom: 15,
    center: latLng(40.758700379161006, -73.95652770996094)
  };

  layers: Layer[] = [
    marker([ 40.758700379161006, -73.95652770996094 ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    })
  ];

  title = 'nyc-wifi';
}
