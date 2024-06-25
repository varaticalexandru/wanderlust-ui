import { colord } from 'colord';

export function makeColorPale(hex: string): string {
    const currentLightness = colord(hex).toHsl().l;
    let lightenAmount = 1.8; 
  
    // if (currentLightness < 0.2) {
    //     lightenAmount = 1.7; 
    //   } else if (currentLightness >= 0.2 && currentLightness < 0.4) {
    //     lightenAmount = 1.55; 
    //   } else if (currentLightness >= 0.4 && currentLightness < 0.6) {
    //     lightenAmount = 0.9;
    //   } else if (currentLightness >= 0.6 && currentLightness < 0.8) {
    //     lightenAmount = 0.75; 
    //   } else {
    //     lightenAmount = 0.3;
    //   }
  
    return colord(hex).lighten(lightenAmount).desaturate(0.1).toHex();
}
