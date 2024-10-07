import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkPage } from './network.page';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkPage,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkPageRoutingModule {}
