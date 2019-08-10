import { deserialize, serialize } from "serializr";
import { Projection } from "./Projection";

// TODO: Begin thinking about User Id in each projection.
export class ProjectionStore {
  public static Instance = new ProjectionStore();
  private Projections = {};
  public Save(projection: any): void {
    if (!this.Projections[projection.Name]) {
      this.Projections[projection.Name] = [];
    }
    this.write(projection.Name, projection);
  }
  public Update(type: any, projection: Projection): void {
    if (!this.Projections[projection.Name]) {
      this.Save(projection);
    } else {
      this.delete(type, projection.Id);
      this.Save(projection);
    }
  }
  public GetProjection(type: any, id: any): any {
    if (!this.Projections[type.name]) {
      return undefined;
    }
    const read = this.read(type, id);
    return read;
  }
  public GetProjections(type: any): any[] {
    const projectionName = type.name;
    if (!this.Projections[projectionName]) {
      return [];
    }
    const unwrapped = this.Projections[projectionName].map((projection) => {
      return this.deserialize(type, projection);
    });
    return unwrapped;
  }
  public Clear(type: any): any[] {
    const projectionName = type.name;
    if (!this.Projections[projectionName]) {
      return;
    }
    this.Projections[projectionName] = [];
  }
  public ClearAll() {
    this.Projections = {};
  }
  private write(name: string,  object: any) {
    if (!this.Projections[name]) {
      this.Projections[name] = [];
    }
    const wrapped = this.serialize(object);
    this.Projections[name].push(wrapped);
  }
  private read(type: any, id: any): any {
    const name = type.name;
    if (!this.Projections[name]) {
      return undefined;
    }
    const projectionIndex = this.find(type,  id);
    if (projectionIndex === -1) {
      return undefined;
    }
    const serialized = this.Projections[name][projectionIndex];
    const deserialized = this.deserialize(type,  serialized);
    return deserialized;
  }
  private delete(type: any, id: any): void {
    const name = type.name;
    if (!this.Projections[name]) {
      return;
    }
    const projectionIndex = this.find(type,  id);
    if (projectionIndex === -1) {
      return;
    }
    this.Projections[name].splice(projectionIndex, 1);
  }
  private find(type: any, id: any) {
    const name = type.name;
    const projection = this.Projections[name].find((wrapped) => {
      const unwrapped: any = this.deserialize(type,  wrapped);
      return unwrapped.Id === id;
    });
    return this.Projections[name].indexOf(projection);
  }
  private serialize<TProjection>(object: TProjection): any {
    const serialized = serialize(object);
    const stringified = JSON.stringify(serialized);
    return stringified;
  }
  private deserialize<TProjection>(type: (new () => TProjection), serialized: any): TProjection {
    try {
      const deStringified = JSON.parse(serialized);
      const deSerialized = deserialize<TProjection>(type, deStringified);
      return deSerialized;
    } catch (e) {
      console.log(e);
    }
  }
}
