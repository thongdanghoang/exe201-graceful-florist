import {Pipe, PipeTransform} from '@angular/core';
import {CategoryType} from '../../admin/model/category.dto';

@Pipe({
  name: 'categoryType'
})
export class CategoryTypePipe implements PipeTransform {
  transform(value: CategoryType, defaultValue: string = ''): string {
    switch (value) {
      case CategoryType.FLOWER:
        return 'Loại hoa';
      case CategoryType.COLOR:
        return 'Màu sắc';
      case CategoryType.THEME:
        return 'Chủ đề';
      default:
        return defaultValue;
    }
  }
}
