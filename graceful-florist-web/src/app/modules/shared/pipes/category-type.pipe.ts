import {Pipe, PipeTransform} from '@angular/core';
import {CategoryTypeDto} from '../../admin/model/category.dto';

@Pipe({
  name: 'categoryType'
})
export class CategoryTypePipe implements PipeTransform {
  transform(value: CategoryTypeDto, defaultValue: string = ''): string {
    switch (value) {
      case CategoryTypeDto.FLOWER:
        return 'Loại hoa';
      case CategoryTypeDto.COLOR:
        return 'Màu sắc';
      case CategoryTypeDto.THEME:
        return 'Chủ đề';
      default:
        return defaultValue;
    }
  }
}
