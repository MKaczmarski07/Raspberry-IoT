import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { Subscription } from 'rxjs';
import { NetworkService } from 'src/app/data-access/network.service';

@Component({
  selector: 'app-security',
  templateUrl: 'security.page.html',
  styleUrls: ['security.page.scss'],
})
export class SecurityPage {
  adress = 'WNZ65WDYJSFO';
  state: 'on' | 'off' = 'off';
  alertMessage = '';
  isLoaderVisible = true;
  isAlertVisible = false;
  isArmed = false;
  isAlarmAllowed = false;
  areNotificationsAllowed = false;

  networkSubscription: Subscription | undefined;

  constructor(
    private gpioService: GpioService,
    private network: NetworkService
  ) {}

  ionViewWillEnter() {
    this.networkSubscription = this.network.connectionTestFailed$.subscribe(
      (isFailed) => {
        if (isFailed !== null) {
          this.getState();
        }
        if (isFailed) {
          this.isLoaderVisible = false;
          this.alertMessage =
            'Cannot connect to the Server. check your connection in the network tab.';
          this.isAlertVisible = true;
        }
      }
    );
  }

  toggleArming() {
    this.isArmed = !this.isArmed;
    this.state = this.isArmed ? 'on' : 'off';
    this.setValues();
  }

  setValues() {
    console.log(this.isAlarmAllowed, this.areNotificationsAllowed);
    this.gpioService
      .detectMotion(
        this.adress,
        this.state,
        this.isAlarmAllowed,
        this.areNotificationsAllowed
      )
      .subscribe();
  }

  getState() {
    this.gpioService.getState(this.adress).subscribe((response: any) => {
      this.state = response[0][0];
      if (this.state === 'on') {
        this.isArmed = true;
      }
      this.getSettings();
      console.log(this.state);
    });
  }

  getSettings() {
    this.gpioService.getAttributes(this.adress).subscribe((response: any) => {
      const transformedResponse = '{' + response[0] + '}';
      const data = JSON.parse(transformedResponse.toLowerCase());
      this.isAlarmAllowed = data.siren;
      this.areNotificationsAllowed = data.notifications;
      this.isLoaderVisible = false;
    });
  }

  ionViewWillLeave() {
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
  }
}
