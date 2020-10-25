import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Projection } from "./Projection";
import { IProjectionStore } from "./ProjectionStore";

export class FirebaseStore implements IProjectionStore {
  public async Clear<TProjection extends Projection>(type: any): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }
  public async ClearAll(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }
  public async GetProjection<TProjection extends Projection>(type: any, id: any): Promise<TProjection> {
    return new Promise((resolve, reject) => resolve(undefined));
  }
  public async GetProjections<TProjection extends Projection>(type: any): Promise<TProjection[]> {
    return [];
  }
  public async Save(projection: Projection): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(type: any, projection: Projection): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }
}
