import { Injectable, OnInit } from '@angular/core';
import { svg_string } from 'src/app/data/location-pin.data';
import { minus_sign_svg_string } from 'src/app/data/minus-sign.data';
import {
  DayColorSvgCompositeMap,
  DaySvgStringMap,
  DayColorMap,
} from 'src/app/models/svg.model';

@Injectable({
  providedIn: 'root',
})
export class SvgService {
  svg_string: string = svg_string;

  constructor() {}

  getRandomDayColorSvgStringCompositeMap(size: number): DayColorSvgCompositeMap {
    const daySvgStringMap: DaySvgStringMap = {};
    const dayColorMap: DayColorMap = this.getRandomDayColorMap(size);

    for (const day in dayColorMap) {
      const replaced = this.svg_string.replaceAll(
        '#COLOR_PLACEHOLDER',
        dayColorMap[day]
      );
      daySvgStringMap[day] = replaced;
    }

    return {
      dayColorMap: dayColorMap,
      daySvgStringMap: daySvgStringMap,
    };
  }

  getRandomDaySvgStringMap(size: number): DaySvgStringMap {
    const daySvgStringMap: DaySvgStringMap = {};
    const dayColorMap: DayColorMap = this.getRandomDayColorMap(size);

    for (const day in dayColorMap) {
      const replaced = this.svg_string.replaceAll(
        '#COLOR_PLACEHOLDER',
        dayColorMap[day]
      );
      daySvgStringMap[day] = replaced;
    }

    return daySvgStringMap;
  }

  getRandomDayColorMap(size: number): DayColorMap {
    const dayColorMap: DayColorMap = {};
    for (let i = 0; i < size; i++) {
      dayColorMap[i] = this.getRandomHexColor();
    }

    return dayColorMap;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()}`;
  }

  getMinusIconSvg(color: string): string {
    return minus_sign_svg_string.replaceAll('#COLOR_PLACEHOLDER', color);
  }
}
