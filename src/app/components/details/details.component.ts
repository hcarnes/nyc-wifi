import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HotspotLocation, HotspotService } from 'src/app/hotspot.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  hotspot?: HotspotLocation
  constructor(private route: ActivatedRoute, private hotspots: HotspotService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.hotspots.getHotspot(params.get('id'))
      })
    ).subscribe(hs => this.hotspot = hs);
  }

}
