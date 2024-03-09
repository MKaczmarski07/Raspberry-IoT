import { Component } from '@angular/core';
import { NetworkService } from 'src/app/data-access/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private network: NetworkService) {}

  ngOnInit() {
    this.network.checkConnection();
  }
}
