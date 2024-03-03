import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {
  type: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.type = this.getType();
  }

  getType(): string {
    return this.router.url.split('/').slice(-2, -1)[0];
  }
}
