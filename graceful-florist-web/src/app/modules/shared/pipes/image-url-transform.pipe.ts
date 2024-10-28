import {Pipe, PipeTransform} from '@angular/core';
import {uuid} from '../../../../../graceful-florist-type';
import {AppRoutingConstants} from '../../../app-routing-constants';

@Pipe({
  name: 'imageUrlTransform'
})
export class ImageUrlTransformPipe implements PipeTransform {
  transform(imageId: uuid | string): string {
    return `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.IMAGES_PATH}/${imageId}`;
  }
}
