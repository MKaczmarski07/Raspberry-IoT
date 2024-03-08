import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { RgbService } from 'src/app/shared/rgb.service';

@Component({
  selector: 'app-scene-item',
  templateUrl: './scene-item.component.html',
  styleUrls: ['./scene-item.component.scss'],
})
export class SceneItemComponent {
  @Input() sceneAddress = '';
  @Input() name = '';
  @Input() iconName = '';
  @Input() isServerAvailable = false;
  @Input() stateChanged = false;

  @Output() sceneActivated = new EventEmitter();

  state: 'on' | 'off' = 'off';

  constructor(
    private gpioService: GpioService,
    private rgbService: RgbService
  ) {}

  ngOnChanges() {
    if (this.stateChanged || this.isServerAvailable) {
      this.getSceneState();
    }
  }

  getSceneState() {
    if (this.isServerAvailable) {
      this.gpioService.getState(this.sceneAddress).subscribe(
        (response: any) => {
          this.state = response[0][0];
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getSceneAttributes() {
    this.gpioService.getAttributes(this.sceneAddress).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleScene() {
    this.state = this.state === 'on' ? 'off' : 'on';
    this.handleStateChange();
  }

  handleStateChange() {
    this.gpioService
      .setSceneState(this.sceneAddress, this.state)
      .subscribe((response) => {
        if (this.state === 'on') {
          this.sceneActivated.emit();
          this.gpioService
            .getAttributes(this.sceneAddress)
            .subscribe((response: any) => {
              const colors =
                this.rgbService.transformSceneColorResponse(response);
              this.rgbService.turnOnRGB('RNRYZBQWWCNM', colors[0]);
              this.rgbService.turnOnRGB('JN49SZUFJXFB', colors[1]);
            });
        }
        if (this.state === 'off') {
          this.rgbService.turnOffRGB('RNRYZBQWWCNM');
          this.rgbService.turnOffRGB('JN49SZUFJXFB');
        }
      });
  }
}
