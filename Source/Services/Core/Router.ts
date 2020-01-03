import { Event } from "../../Events/Core/Event";
import { ISubscriber } from "./ISubscriber";
import { Route } from "./Route";

export abstract class Router implements ISubscriber {
  public static Instance: Router = new class extends Router {}();
  private routes: Array<Route<Event, Event>> = [];
  public Link<TSubscriptionEvent extends Event, TPublicationEvent extends Event>(route: Route<TSubscriptionEvent, TPublicationEvent>) {
    this.routes.push(route);
  }
  public Subscribe() {
    this.routes.forEach((route) => {
      route.Subscribe();
    });
  }

  public UnSubscribe() {
    this.routes.forEach((route) => {
      route.UnSubscribe();
    });
  }
}
