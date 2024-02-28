import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';

@Component({
  selector: 'app-scenes',
  templateUrl: 'scenes.page.html',
  styleUrls: ['scenes.page.scss'],
})
export class ScenesPage {
  scenes: Map<string, Array<Array<number>>> = new Map([
    [
      'bedtime',
      [
        [50, 10, 0],
        [50, 10, 0],
      ],
    ],
    [
      'romantic',
      [
        [255, 0, 20],
        [10, 0, 200],
      ],
    ],
    [
      'nightSky',
      [
        [50, 50, 200],
        [10, 20, 200],
      ],
    ],
    [
      'warm',
      [
        [250, 50, 0],
        [250, 50, 0],
      ],
    ],
  ]);

  constructor(private gpioService: GpioService) {}

  setScene(sceneType: string) {
    const colorOne = this.scenes.get(sceneType)![0];
    const colorTwo = this.scenes.get(sceneType)![1];
    this.gpioService.handleRGB(1, true, colorOne).subscribe();
    this.gpioService.handleRGB(2, true, colorTwo).subscribe();
  }
}
