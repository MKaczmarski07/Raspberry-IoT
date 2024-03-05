import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent {
  isLoaded = false;
  type: string = '';
  displayedName: string = '';
  uniqueDeviceAdress: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ionViewWillEnter() {
    this.getQueryParams();
  }

  getQueryParams() {
    this.route.queryParams.subscribe((params) => {
      this.displayedName = params['displayedName'];
      this.uniqueDeviceAdress = params['uniqueDeviceAdress'];
      this.type = params['type'];
    });
  }
}
