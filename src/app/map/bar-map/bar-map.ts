import { Component } from '@angular/core';

export interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  icon?: string;
}

@Component({
  selector: 'app-bar-map',
  imports: [],
  templateUrl: './bar-map.html',
  styleUrl: './bar-map.css',
})
export class BarMap {
  onMapClick(e: MouseEvent) {
    const mapElement = e.currentTarget as HTMLElement;
    const rect = mapElement.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    console.log(`X: ${x.toFixed(2)}%, Y: ${y.toFixed(2)}%`);
  }
  getIconForCity() {
    this.cities.forEach((city) => {
      city.icon = `/cities_icons/${city.id}_icon.png`;
    });
  }

  cities: City[] = [
    {
      id: 'lviv',
      name: 'Lviv',
      x: 25.45,
      y: 36.38,
    },
    {
      id: 'uzhhorod',
      name: 'Uzhhorod',
      x: 18.66,
      y: 46.49,
    },
    {
      id: 'ivano-frankivsk',
      name: 'Ivano-Frankivsk',
      x: 27.66,
      y: 44.15,
    },
    {
      id: 'ternopil',
      name: 'Ternopil',
      x: 30.78,
      y: 37.94,
    },
    {
      id: 'lutsk',
      name: 'Lutsk',
      x: 30.69,
      y: 22.23,
    },
    {
      id: 'chernivtsi',
      name: 'Chernivtsi',
      x: 31.84,
      y: 51.31,
    },
    {
      id: 'rivne',
      name: 'Rivne',
      x: 33.64,
      y: 27.05,
    },
    {
      id: 'zhytomyr',
      name: 'Zhytomyr',
      x: 42.73,
      y: 32.49,
    },
    {
      id: 'kmelnytsk',
      name: 'Khmelnytsk',
      x: 36.02,
      y: 40.27,
    },
    {
      id: 'vinnytsia',
      name: 'Vinnytsia',
      x: 41.26,
      y: 42.75,
    },
    {
      id: 'odessa',
      name: 'Odessa',
      x: 48.54,
      y: 72.45,
    },
    {
      id: 'kyiv',
      name: 'Kyiv',
      x: 49.44,
      y: 32.49,
    },
    {
      id: 'cherkasy',
      name: 'Cherkasy',
      x: 53.46,
      y: 39.02,
    },
    {
      id: 'dnipro',
      name: 'Dnipro',
      x: 65.66,
      y: 50.22,
    },
    {
      id: 'zaporizhzhia',
      name: 'Zaporizhzhia',
      x: 66.64,
      y: 56.75,
    },
    {
      id: 'mykolayiv',
      name: 'Mykolayiv',
      x: 54.6,
      y: 65.3,
    },
    {
      id: 'kherson',
      name: 'Kherson',
      x: 57.14,
      y: 68.87,
    },
    {
      id: 'kryvyi_rih',
      name: 'Kryvyi Rih',
      x: 55.34,
      y: 50.37,
    },
    {
      id: 'kharkiv',
      name: 'Kharkiv',
      x: 69.18,
      y: 37.31,
    },
    {
      id: 'poltava',
      name: 'Poltava',
      x: 65.49,
      y: 39.65,
    },
    {
      id: 'sumy',
      name: 'Sumy',
      x: 62.95,
      y: 26.43,
    },
    {
      id: 'chernihiv',
      name: 'Chernihiv',
      x: 51.41,
      y: 18.66,
    },
    {
      id: 'donetsk',
      name: 'Donetsk',
      x: 76.63,
      y: 50.22,
    },
    {
      id: 'luhansk',
      name: 'Luhansk',
      x: 82.2,
      y: 44.47,
    },
    {
      id: 'mariupol',
      name: 'Mariupol',
      x: 70.73,
      y: 67.63,
    },
    {
      id: 'sevastopol',
      name: 'Sevastopol',
      x: 57.71,
      y: 81.78,
    },
  ];
}
