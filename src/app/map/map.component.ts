import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  routes: Array<any> = [];

  constructor() { }

  ngOnInit(): void {}

  /**
   * Получает из MapDirective координаты точки.
   * И добавляет к маршруту
   */
  public onAddPoint(point: any): void {
    console.log(point);
  }
}
