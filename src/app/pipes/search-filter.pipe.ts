import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    let filteredItems = 
    list
      ? list.filter(
        (item) => item.country.toLowerCase().includes(filterText.toLowerCase()) || item.city.toLowerCase().includes(filterText.toLowerCase())
      )
      : [];
    
    return filteredItems;
  }

}
