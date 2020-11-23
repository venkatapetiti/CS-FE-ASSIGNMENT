import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchByName'})
export class SearchByNamePipe implements PipeTransform {
  transform(value: any[], term: string): any[] {
    return value.filter((x: any) => x.merchant.name && x.merchant.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }
}
