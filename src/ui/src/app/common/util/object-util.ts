export class ObjectUtil {

  static copy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }

  static equals(object1: object, object2: object): boolean {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

}
