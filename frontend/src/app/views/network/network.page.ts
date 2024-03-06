import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-network',
  templateUrl: 'network.page.html',
  styleUrls: ['network.page.scss'],
})
export class NetworkPage {
  serverStatus: 'unknown' | 'offline' | 'online' = 'unknown';
  serverStatusText: string | undefined;
  ipAddress: string | undefined;

  constructor(private gpioService: GpioService) {}

  ionViewDidEnter() {
    this.checkConnection();
    this.ipAddress = environment.RASPBERRY_PI_IP;
  }

  setStatusText() {
    const text = new Map([
      ['unknown', 'Connecting...'],
      ['offline', 'Unable to connect to the server'],
      ['online', 'Correct Communication'],
    ]);
    return text.get(this.serverStatus);
  }

  checkConnection() {
    this.serverStatus = 'unknown';
    this.serverStatusText = this.setStatusText();
    setTimeout(() => {
      this.gpioService.checkConnection().subscribe(
        (res) => {
          this.serverStatus = 'online';
          this.serverStatusText = this.setStatusText();
        },
        (err) => {
          this.serverStatus = 'offline';
          this.serverStatusText = this.setStatusText();
        }
      );
    }, 300); // prevent blinking when response is too fast
  }
}
