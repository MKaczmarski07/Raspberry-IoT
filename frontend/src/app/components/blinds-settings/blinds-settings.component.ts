import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blinds-settings',
  templateUrl: './blinds-settings.component.html',
  styleUrls: ['./blinds-settings.component.scss'],
})
export class BlindsSettingsComponent implements OnInit {
  inputValue = 0;

  constructor() {}

  ngOnInit() {}

  setBlindsPosition() {
    console.log(this.inputValue);
  }
}
