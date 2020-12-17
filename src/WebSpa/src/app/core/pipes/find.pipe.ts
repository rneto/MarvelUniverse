import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

    transform(value: Array<any>, callback: any): any {
        return value.find(callback);
    }

}
