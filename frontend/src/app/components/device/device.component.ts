import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  @Input() canToggle = false;
  @Input() name: any;
  @Input() localization: any;

  constructor() {}

  ngOnInit() {}
}
