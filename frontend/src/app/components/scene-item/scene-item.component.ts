import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scene-item',
  templateUrl: './scene-item.component.html',
  styleUrls: ['./scene-item.component.scss'],
})
export class SceneItemComponent implements OnInit {
  @Input() name = '';
  @Input() iconName = '';

  constructor() {}

  ngOnInit() {}
}
