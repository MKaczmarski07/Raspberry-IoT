import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RgbService } from 'src/app/shared/rgb.service';
import iro from '@jaames/iro';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Input() uniqueDeviceAdress = '';
  coloPicker: any;
  @Output() colorDataLoaded = new EventEmitter<boolean>();

  constructor(private rgbService: RgbService) {}

  ngOnInit() {
    this.coloPicker = iro.ColorPicker('#picker', {
      borderWidth: 2,
      borderColor: '#fff',
    });
    this.getColor();
  }

  setColor() {
    // transform color object to array
    const color: number[] = Object.values(this.coloPicker.color.rgb);
    // set selected color
    this.rgbService.turnOnRGB(this.uniqueDeviceAdress, color);
  }

  getColor() {
    this.rgbService
      .getColor(this.uniqueDeviceAdress)
      .subscribe((response: any) => {
        const color = this.rgbService.transformColorResponse(response);
        console.log(color);
        this.coloPicker.color.rgb = {
          r: color[0],
          g: color[1],
          b: color[2],
        };
        this.colorDataLoaded.emit(true);
      });
  }
}
