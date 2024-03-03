import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DeviceDetailsComponent } from './device-details/device-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'device/:type/:id',
    component: DeviceDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
