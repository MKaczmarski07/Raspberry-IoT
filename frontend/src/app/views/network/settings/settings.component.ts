import { Component } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  isLoaded = true;
  ipAddress = '';
  isIpSaved = false;
  isIPValid = true
  email = '';
  savedEmail = '';
  isEmailSaved = false;

  constructor(
    private storage: StorageService
  ) { }

  ionViewWillEnter() {
    this.isEmailSaved = false;
    this.isIpSaved = false;
    this.storage.getValue('email').then((value) => {
      if (value) {
        this.email = value;
        this.savedEmail = value;
      }
    });
    this.storage.getValue('ip').then((value) => {
      if (value) {
        this.ipAddress = value;
      }
    });
  }
  
  saveIp() {
   this.isIPValid = this.checkIP(this.ipAddress);
    if (!this.isIPValid) {
      return;
    }
    this.storage.setValue('ip', this.ipAddress);
    this.isIpSaved = true;
    this.isIPValid = true;
  }

  saveEmail() {
    const email = this.email.trim(); // remove white spaces
    this.storage.setValue('email', email);
    this.isEmailSaved = true;
    this.email = email;
  }

  
  checkIP(ipAddress: string) {
    const ipPattern = /^(\d{1,3}\.){0,3}\d{0,3}$/;
    if (ipPattern.test(this.ipAddress)) {
      const parts = ipAddress.split('.');
      if (parts.length !== 4) {
        return false;
      }
      for (const part of parts) {
        if (parseInt(part, 10) > 255 || part === '') {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  handleInputChange(ipAddress: string) { 
    this.isIpSaved = false
    this.isIPValid = this.checkIP(ipAddress)
  }

}
