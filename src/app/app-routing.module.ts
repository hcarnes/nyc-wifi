import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'detail/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
