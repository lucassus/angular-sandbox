import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkmark'
})
export class CheckmarkPipe implements PipeTransform {

  transform(value: any): string {
    return value ? '\u2713' : '\u2718';
  }

}
