import { Component, OnInit, Input } from '@angular/core';
import { RgbService } from 'src/app/shared/rgb.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  @Input() canToggle = false;
  @Input() name: string = '';
  @Input() localization: string = '';
  @Input() type: '' | 'lamp' | 'blinds' = '';
  @Input() id = 0;

  isOn = false;

  constructor(private rgbService: RgbService) {}

  ngOnInit() {}

  toggleDevice() {
    this.isOn = !this.isOn;

    // to do: get currently set color from database, then turn on the RGB diode
    if (this.type === 'lamp') {
      this.isOn
        ? this.rgbService.turnOnRGB(this.id, [255, 255, 255])
        : this.rgbService.turnOffRGB(this.id);
    }
  }
}
