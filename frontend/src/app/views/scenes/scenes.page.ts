import { Component } from '@angular/core';
import { NetworkService } from 'src/app/data-access/network.service';

@Component({
  selector: 'app-scenes',
  templateUrl: 'scenes.page.html',
  styleUrls: ['scenes.page.scss'],
})
export class ScenesPage {
  isServerAvailable = false;
  isLoaderVisible = true;
  sceneStateChanged = false;
  constructor(private network: NetworkService) {}

  ionViewWillEnter() {
    this.network.checkConnection();
    this.handleLoader();
  }

  handleSceneStateChange() {
    this.sceneStateChanged = true;
    setTimeout(() => {
      this.sceneStateChanged = false;
    }, 10);
  }

  handleLoader() {
    const interval = setInterval(() => {
      if (!this.network.connectionTestFailed) {
        this.isServerAvailable = true;
        clearInterval(interval);
        this.isLoaderVisible = false;
      }
      if (this.network.connectionTestFailed) {
        clearInterval(interval);
        this.isLoaderVisible = false;
      }
    }, 300);
  }
}
