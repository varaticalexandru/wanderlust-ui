import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(text: string | undefined, wordsToHighlight: string[]): string {

    if (!text)
      return "";

    wordsToHighlight.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      text = text?.replace(regex, '<strong>$1</strong>');
    })

    return text;
  }

}
