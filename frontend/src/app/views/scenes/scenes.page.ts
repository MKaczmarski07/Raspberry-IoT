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
    this.networkSubscription = this.network.connectionTestFailed$.subscribe(
      (isFailed) => {
        if (isFailed !== null) {
          this.isServerAvailable = !isFailed;
          this.isLoaderVisible = false;
        }
        if (isFailed) {
          this.alertMessage =
            'Cannot connect to the Server. check your connection in the network tab.';
          this.isAlertVisible = true;
        }
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
