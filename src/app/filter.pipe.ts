import {Pipe, PipeTransform} from '@angular/core';
import {isUndefined} from 'util';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (isUndefined === value || filterString === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }

    }
    return resultArray;

  }

}
