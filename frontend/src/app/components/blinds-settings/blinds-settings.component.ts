import { Component, EventEmitter, Output, Input } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';

@Component({
  selector: 'app-blinds-settings',
  templateUrl: './blinds-settings.component.html',
  styleUrls: ['./blinds-settings.component.scss'],
})
export class BlindsSettingsComponent  {
  inputValue = 0;
  @Input() uniqueDeviceAdress = ''
  @Output() blindsDataLoaded = new EventEmitter<boolean>();

  constructor(
    private gpioService: GpioService
  ) {}

  ngOnInit() { 
    this.getBlindsPosition();
  }

  setBlindsPosition() {
    this.gpioService.handleBlinds(this.uniqueDeviceAdress, this.inputValue).subscribe();
  }

  getBlindsPosition() {
    this.gpioService.getAttributes(this.uniqueDeviceAdress).subscribe((response: any) => {
      response = JSON.parse('{' + response[0] + '}').covering;
      this.inputValue = response;
      this.blindsDataLoaded.emit(true);
    }
    );
  }
}
