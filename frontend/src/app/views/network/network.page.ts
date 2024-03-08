import { Component } from '@angular/core';
import { NetworkService } from 'src/app/data-access/network.service';
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

  constructor(private network: NetworkService) {}

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
    this.network.checkConnection();
    const interval = setInterval(() => {
      if (!this.network.connectionTestFailed) {
        this.serverStatus = 'online';
        this.serverStatusText = this.setStatusText();
        clearInterval(interval);
      }
      if (this.network.connectionTestFailed) {
        this.serverStatus = 'offline';
        this.serverStatusText = this.setStatusText();
        clearInterval(interval);
      }
    }, 300);
  }
}
