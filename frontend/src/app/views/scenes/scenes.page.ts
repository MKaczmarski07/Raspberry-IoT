import { Component } from '@angular/core';
import { NetworkService } from 'src/app/data-access/network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scenes',
  templateUrl: 'scenes.page.html',
  styleUrls: ['scenes.page.scss'],
})
export class ScenesPage {
  networkSubscription: Subscription | undefined;
  isServerAvailable = false;
  isLoaderVisible = true;
  sceneStateChanged = false;
  isAlertVisible = false;
  alertMessage = '';
  constructor(private network: NetworkService) {}

  ionViewWillEnter() {
    this.networkSubscription = this.network.getConnectionInfo().subscribe(
      (status) => {
        this.isServerAvailable = true;
        this.isLoaderVisible = false;
      },
      (error) => {
        this.isServerAvailable = false;
        this.isLoaderVisible = false;
        this.alertMessage = 'Unable to connect to the server';
        this.isAlertVisible = true;
      }
    );
  }

  handleSceneStateChange() {
    this.sceneStateChanged = true;
    setTimeout(() => {
      this.sceneStateChanged = false;
    }, 10);
  }

  ionViewWillLeave() {
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
  }
}
