import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clases'
})
export class ClasesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
