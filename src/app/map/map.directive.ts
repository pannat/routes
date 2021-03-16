import { Directive, ElementRef, Output, OnInit, EventEmitter } from '@angular/core';
import {Loader, LoaderOptions} from 'google-maps';

@Directive({
  selector: '[googleMap]'
})
export class MapDirective implements OnInit {
  @Output() addPoint = new EventEmitter();

  private readonly options: LoaderOptions = {};
  private readonly loader: Loader = new Loader('', this.options);
  private map!: google.maps.Map;
  private poly!: google.maps.Polyline;
  private readonly Coordinates = {
    ZELENOGRAD: {
      lat: 55.98,
      lng: 37.18
    }
  };

  constructor(
    private readonly element: ElementRef
  ) {}

  async ngOnInit(): Promise<void> {
    const google = await this.loader.load();
    this.map = new google.maps.Map(this.element.nativeElement, {
      center: this.Coordinates.ZELENOGRAD,
      zoom: 13,
    });

    this.poly = new google.maps.Polyline({
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    this.poly.setMap(this.map);

    this.map.addListener('click', this.addLatLng.bind(this));
  }

  /**
   * Обработчик клика по карте.
   * Добавляет новый маркер в полилинию
   */
  private addLatLng(event: google.maps.MapMouseEvent): void {
    const path = this.poly.getPath();

    path.push(event.latLng);

    const newMarker = new google.maps.Marker({
      position: event.latLng,
      title: '#' + path.getLength(),
      map: this.map,
    });
  }
}
