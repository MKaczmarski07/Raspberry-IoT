import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NetworkPage } from './network.page';

describe('NetworkPage', () => {
  let component: NetworkPage;
  let fixture: ComponentFixture<NetworkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
