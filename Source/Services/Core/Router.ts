import { Event } from "../../Events/Core/Event";
import { Route } from "./Route";

export abstract class Router {
  public static Instance: Router = new (class extends Router {})();
  private routes: Array<Route<Event, Event>> = [];
  public Link<TSubscriptionEvent extends Event, TPublicationEvent extends Event>(route: Route<TSubscriptionEvent, TPublicationEvent>) {
    this.routes.push(route);
  }
}
