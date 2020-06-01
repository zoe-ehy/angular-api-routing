import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: String): String {
    if (value.length >= 50) {
      let newStr = value.substring(0, 50) + ' ......';
      return newStr;
    }
    return value;
  }

}
