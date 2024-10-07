import { Component } from '@angular/core';
import { NetworkService } from 'src/app/data-access/network.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared/storage.service';

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

  constructor(
    private network: NetworkService,
    private storage: StorageService) { }

  ngOnInit() {
    this.serverStatusText = this.setStatusText();
  }


  ionViewWillEnter() {
    this.storage.getValue('ip').then((value) => {
      if (value) {
        this.ipAddress = value;
      }
    });
    this.checkConnection()
  }

  checkConnection() {
    this.serverStatus = 'unknown';
    this.serverStatusText = this.setStatusText();

    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }

    this.networkSubscription = this.network.getConnectionInfo().subscribe(
      (status) => {
        this.serverStatus = 'online';
        this.serverStatusText = this.setStatusText();
      },
      (error) => {
        this.serverStatus = 'offline';
        this.serverStatusText = this.setStatusText();
      }
    )
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
    this.checkConnection();
  }

  ionViewWillLeave() {
    this.networkSubscription?.unsubscribe();
  }
}
