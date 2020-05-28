import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: String, limit: number): String {
    let newStr = value.substring(0, 50) + '...';
    return newStr;
  }

}
