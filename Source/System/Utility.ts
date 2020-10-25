export class Utility {
  public static Promise = {
    AutoResolver: <T>(withValue?: T): Promise<T> => {
      return new Promise((resolve, reject) => {
        resolve(withValue);
      });
    }
  };
}
