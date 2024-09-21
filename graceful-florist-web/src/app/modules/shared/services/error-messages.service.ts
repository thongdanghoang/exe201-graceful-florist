import {Injectable} from '@angular/core';
import {NgControl} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ErrorMessagesService {
  createMessages(
    control: NgControl
  ): {key: string; params: Record<string, unknown>}[] {
    if (!control.errors) {
      return [];
    }

    return Object.keys(control.errors).map(key => {
      const subKeys = Object.keys(control.errors![key]);
      if (
        subKeys.length === 1 &&
        typeof control.errors![key][subKeys[0]] === 'object'
      ) {
        return {
          key: `i18n.validation.${key}.${subKeys[0]}`,
          params: control.errors![key][subKeys[0]]
        };
      }
      return {
        key: `i18n.validation.${key}`,
        params: control.errors![key]
      };
    });
  }
}
