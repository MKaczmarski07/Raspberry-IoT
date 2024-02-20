import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../views/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'scenes',
        loadChildren: () =>
          import('../views/scenes/scenes.module').then(
            (m) => m.ScenesPageModule
          ),
      },
      {
        path: 'security',
        loadChildren: () =>
          import('../views/security/security.module').then(
            (m) => m.SecurityPageModule
          ),
      },
      {
        path: 'network',
        loadChildren: () =>
          import('../views/network/network.module').then(
            (m) => m.NetworkPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
