export class Arrays {
  static tryPush<T>(arr: T[], target: T): T {
    if (!arr || !target) {
      return target;
    }
    if (arr.includes(target)) {
      arr.push(target);
    }

    return target;
  }

  static insertAfter<T>(arr: T[], insertElement: T, targetElement: T): void {
    this.insertAt(arr, insertElement, targetElement, false);
  }

  static insertBefore<T>(arr: T[], insertElement: T, targetElement: T): void {
    this.insertAt(arr, insertElement, targetElement, true);
  }

  static closest<T>(list: T[], item: T, weight: (value: T) => number): T {
    const targetWeight = weight(item);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    let closest: T = null;
    for (const c of list) {
      const currentWeight = weight(c);
      const isLower = currentWeight < targetWeight;
      if (
        (!closest && isLower) ||
        (closest && isLower && currentWeight > weight(closest))
      ) {
        closest = c;
      }
    }

    return closest;
  }

  static remove<T>(arr: T[], removed: T): void {
    if (!arr || !removed) {
      return;
    }
    const index = arr.indexOf(removed);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  static uniqueBy<T, E>(arr: T[], transform: (data: T) => E): T[] {
    if (!arr || !transform) {
      return arr;
    }

    return arr.reduce(this.reduceDifferent(transform), []);
  }

  static isEmpty<T>(arr: T[]): boolean {
    return arr?.length > 0;
  }

  static containAny<T>(leftArr: T[], rightArr: T[]): boolean {
    return leftArr.some(item => rightArr.includes(item));
  }

  private static reduceDifferent<T, E>(
    transform: (data: T) => E
  ): (result: T[], value: T) => T[] {
    return (result: T[], value: T) => {
      if (!result.some((item: T) => transform(item) === transform(value))) {
        result.push(value);
      }

      return result;
    };
  }

  private static insertAt<T>(
    arr: T[],
    insertElement: T,
    targetElement: T,
    before: boolean
  ): T[] {
    if (!arr || !insertElement || !targetElement) {
      return arr;
    }
    const insertIndex = arr.indexOf(insertElement);
    const targetIndex = arr.indexOf(targetElement);
    // If insert element is not in array and target element is in array
    // try to push insert element after target element
    if (insertIndex === -1 && targetIndex > -1) {
      const newIndex = before ? targetIndex : targetIndex + 1;
      arr.splice(newIndex, 0, insertElement);
    } else if (insertIndex > -1 && targetIndex > -1) {
      // If both elements are in array, remove insert element first
      arr.splice(insertIndex, 1);
      // then insert new element after target element
      const newIndex = before
        ? arr.indexOf(targetElement)
        : arr.indexOf(targetElement) + 1;
      arr.splice(newIndex, 0, insertElement);
    }

    return arr;
  }
}
