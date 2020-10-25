import { deserialize, serialize } from "serializr";
import { Projection } from "./Projection";

class FirebaseStore {}

export interface IProjectionStore {
  Save(projection: Projection): Promise<void>;
  Update(type: any, projection: Projection): Promise<void>;
  GetProjection<TProjection extends Projection>(type: any, id: any): Promise<TProjection>;
  GetProjections<TProjection extends Projection>(type: any): Promise<TProjection[]>;
  Clear<TProjection extends Projection>(type: any): Promise<void>;
  ClearAll(): Promise<void>;
}

// TODO: Begin thinking about User Id in each projection.
export class ProjectionStore implements IProjectionStore {
  public static Instance = new ProjectionStore();
  private projections = {};
  public async Save(projection: Projection): Promise<void> {
    if (!this.projections[projection.ProjectionName]) {
      this.projections[projection.ProjectionName] = [];
    }
    this.write(projection.ProjectionName, projection);
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  public async Update(type: any, projection: Projection): Promise<void> {
    if (!this.projections[projection.ProjectionName]) {
      await this.Save(projection);
    } else {
      this.delete(type, projection.Id);
      await this.Save(projection);
    }
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  public async GetProjection<TProjection extends Projection>(type: any, id: any): Promise<TProjection> {
    if (!type) {
      return undefined;
    }
    if (!this.projections[type.name]) {
      return undefined;
    }
    const read = this.read(type, id) as TProjection;
    return new Promise((resolve, reject) => {
      resolve(read);
    });
  }
  public async GetProjections<TProjection extends Projection>(type: any): Promise<TProjection[]> {
    const projectionName = type.name;
    if (!this.projections[projectionName]) {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    }
    const unwrapped = this.projections[projectionName].map(projection => {
      return this.deserialize(type, projection);
    });
    return new Promise((resolve, reject) => {
      resolve(unwrapped);
    });
  }
  public async Clear<TProjection extends Projection>(type: any): Promise<void> {
    const projectionName = type.name;
    if (!this.projections[projectionName]) {
      return;
    }
    this.projections[projectionName] = [];
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  public async ClearAll(): Promise<void> {
    this.projections = {};
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  private write(name: string, object: any): void {
    if (!this.projections[name]) {
      this.projections[name] = [];
    }
    const wrapped = this.serialize(object);
    this.projections[name].push(wrapped);
  }
  private read(type: any, id: any): any {
    const name = type.name;
    if (!this.projections[name]) {
      return undefined;
    }
    const projectionIndex = this.find(type, id);
    if (projectionIndex === -1) {
      return undefined;
    }
    const serialized = this.projections[name][projectionIndex];
    const deserialized = this.deserialize(type, serialized);
    return deserialized;
  }
  private delete(type: any, id: any): void {
    const name = type.name;
    if (!this.projections[name]) {
      return;
    }
    const projectionIndex = this.find(type, id);
    if (projectionIndex === -1) {
      return;
    }
    this.projections[name].splice(projectionIndex, 1);
  }
  private find(type: any, id: any): number {
    const name = type.name;
    const projection = this.projections[name].find(wrapped => {
      const unwrapped: any = this.deserialize(type, wrapped);
      return unwrapped.Id === id;
    });
    return this.projections[name].indexOf(projection);
  }
  private serialize<TProjection>(object: TProjection): any {
    const serialized = serialize(object);
    const stringified = JSON.stringify(serialized);
    return stringified;
  }
  private deserialize<TProjection>(type: new () => TProjection, serialized: any): TProjection {
    try {
      const deStringified = JSON.parse(serialized);
      const deSerialized = deserialize<TProjection>(type, deStringified);
      return deSerialized;
    } catch (e) {
      console.log(e);
    }
  }
}
