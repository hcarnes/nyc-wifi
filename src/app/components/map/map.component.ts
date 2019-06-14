import { Component, OnInit, NgZone, Input, SimpleChanges } from '@angular/core';
import { latLng, tileLayer, marker, icon, Layer, LatLng, LeafletEvent } from 'leaflet';
import { HotspotService, HotspotLocation } from '../../hotspot.service';
import { GeolocationService } from '../../geolocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(
    private hotspots: HotspotService,
    private geolocation: GeolocationService,
    private router: Router,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
    this.hotspots.getHotspots().subscribe((hotspots) => {
      this.layers = hotspots.map((hotspot) => {
        return marker([hotspot.the_geom.coordinates[1], hotspot.the_geom.coordinates[0]], {
          alt: hotspot.objectid,
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        }).on('click', this.clickMarker)
      })
    })

    this.geolocation.getCurrentPosition().subscribe((position) => {
      if (!this.hotspot) {
        this.center = latLng(position.coords.latitude, position.coords.longitude)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hotspot && this.hotspot) {
      this.center = latLng(this.hotspot.the_geom.coordinates[1], this.hotspot.the_geom.coordinates[0])
    }
  }

  @Input()
  hotspot?: HotspotLocation;

  center: LatLng = latLng(40.758700379161006, -73.95652770996094);

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, minZoom: 15, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(40.758700379161006, -73.95652770996094)
  };

  layers: Layer[] = [
    marker([40.758700379161006, -73.95652770996094], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    })
  ];

  title = 'nyc-wifi';

  private clickMarker = (event: LeafletEvent) => {
    this.ngZone.run(() => this.router.navigateByUrl(`/detail/${event.target.options.alt}`));
  }

}
