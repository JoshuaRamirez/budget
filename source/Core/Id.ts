export class Id {
  public static Generate() {
    return Math.random().toString(36).substr(2, 9);
  }
}
