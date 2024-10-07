import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { Subscription } from 'rxjs';
import { NetworkService } from 'src/app/data-access/network.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-security',
  templateUrl: 'security.page.html',
  styleUrls: ['security.page.scss'],
})
export class SecurityPage {
  adress = 'WNZ65WDYJSFO';
  state: 'on' | 'off' = 'off';
  alertMessage = '';
  email = '';
  isLoaderVisible = true;
  isAlertVisible = false;
  isArmed = false;
  isAlarmAllowed = false;
  areNotificationsAllowed = false;
  isEmailSaved = false;

  networkSubscription: Subscription | undefined;

  constructor(
    private gpioService: GpioService,
    private network: NetworkService,
    private storage: StorageService
  ) {}

  ionViewWillEnter() {
    this.isEmailSaved = false;
    this.storage.getValue('email').then((value) => {
      if (value) {
        this.email = value;
      }
    });
    this.networkSubscription = this.network.getConnectionInfo().subscribe(
      (status) => {
        this.getState();
      },
      (error) => {
        this.isLoaderVisible = false;
        this.alertMessage = 'Unable to connect to the server';
        this.isAlertVisible = true;
      }
    );
  }

  toggleArming() {
    this.isArmed = !this.isArmed;
    this.state = this.isArmed ? 'on' : 'off';
    this.setValues();
  }

  setValues() {
    this.gpioService
      .detectMotion(
        this.adress,
        this.state,
        this.isAlarmAllowed,
        this.areNotificationsAllowed,
        this.email
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
