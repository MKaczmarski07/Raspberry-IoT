import { Component } from '@angular/core';
import { NetworkService } from 'src/app/data-access/network.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-network',
  templateUrl: 'network.page.html',
  styleUrls: ['network.page.scss'],
})
export class NetworkPage {
  serverStatus: 'unknown' | 'offline' | 'online' = 'unknown';
  serverStatusText: string | undefined;
  ipAddress: string | undefined;
  networkSubscription: Subscription | undefined;

  constructor(private network: NetworkService) {}

  ngOnInit() {
    this.serverStatusText = this.setStatusText();
  }

  ionViewWillEnter() {
    this.ipAddress = environment.RASPBERRY_PI_IP;
    this.networkSubscription = this.network.connectionTestFailed$.subscribe(
      (isFailed) => {
        if (isFailed !== null) {
          this.serverStatus = isFailed ? 'offline' : 'online';
          this.serverStatusText = this.setStatusText();
        }
      }
    );
    console.log(this.networkSubscription);
  }

  setStatusText() {
    const text = new Map([
      ['unknown', 'Connecting...'],
      ['offline', 'Unable to connect to the server'],
      ['online', 'Correct Communication'],
    ]);
    return text.get(this.serverStatus);
  }

  refresh() {
    this.serverStatus = 'unknown';
    this.serverStatusText = this.setStatusText();
    this.network.checkConnection();
  }

  ionViewWillLeave() {
    this.networkSubscription?.unsubscribe();
  }
}
