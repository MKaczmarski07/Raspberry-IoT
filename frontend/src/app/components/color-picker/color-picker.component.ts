import { Component, OnInit } from '@angular/core';
import { RgbService } from 'src/app/shared/rgb.service';
import iro from '@jaames/iro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  coloPicker: any;
  id: number = 0;

  constructor(private rgbService: RgbService, private router: Router) {}

  ngOnInit() {
    this.coloPicker = iro.ColorPicker('#picker', {
      borderWidth: 2,
      borderColor: '#fff',
    });
    this.id = this.getID();
  }

  getID(): number {
    const id = this.router.url.split('/').pop();
    if (id) {
      return parseInt(id);
    }
    return 0;
  }

  setColor() {
    // transform color object to array
    const color: number[] = Object.values(this.coloPicker.color.rgb);
    // set selected color
    this.rgbService.turnOnRGB(this.id, color);
  }
}
