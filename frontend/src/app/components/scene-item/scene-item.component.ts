import { Component, OnInit, Input } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';

@Component({
  selector: 'app-scene-item',
  templateUrl: './scene-item.component.html',
  styleUrls: ['./scene-item.component.scss'],
})
export class SceneItemComponent implements OnInit {
  @Input() name = '';
  @Input() iconName = '';
  sceneType = '';

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
      'nightsky',
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

  ngOnInit() {
    this.sceneType = this.transfromSceneName(this.name);
  }

  setScene(sceneType: string) {
    const colorOne = this.scenes.get(sceneType)![0];
    const colorTwo = this.scenes.get(sceneType)![1];
    this.gpioService.handleRGB(1, true, colorOne).subscribe();
    this.gpioService.handleRGB(2, true, colorTwo).subscribe();
  }

  transfromSceneName(name: string) {
    const sceneType = name.toLocaleLowerCase().replace(/\s/g, '');
    return sceneType;
  }
}
