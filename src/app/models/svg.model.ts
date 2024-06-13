export interface DayColorSvgCompositeMap {
  dayColorMap: DayColorMap;
  daySvgStringMap: DaySvgStringMap;
}

export interface DayColorMap {
  [key: number]: string;
}

export interface DaySvgStringMap {
  [key: number]: string;
}

export interface DaySvgMap {
  [key: number]: HTMLElement;
}
