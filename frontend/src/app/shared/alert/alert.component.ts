import { Component, OnInit, Input } from '@angular/core';
import { AlertAnimation, BackgroundAnimation } from './animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [AlertAnimation, BackgroundAnimation],
})
export class AlertComponent implements OnInit {
  @Input() isAlertVisible = false;
  @Input() alertMessage = '';

  constructor() {}

  hideAlert() {
    this.isAlertVisible = false;
  }

  ngOnInit() {}
}
