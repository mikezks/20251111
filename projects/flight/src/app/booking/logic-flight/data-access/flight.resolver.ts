import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, ResolveFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { Flight } from "../model/flight";
import { FlightService } from "./flight.service";


@Injectable({
  providedIn: 'root'
})
export class FlightResolver implements Resolve<Observable<Flight>> {
  constructor(private flightService: FlightService) {}

  resolve(route: ActivatedRouteSnapshot): MaybeAsync<Observable<Flight>> {
    const id = +(route.paramMap.get('id') ?? 0);
    const flight = this.flightService.flights.find(f => f.id === id);

    return flight ? of(flight) : this.flightService.findById(id);
  }
}

export function resolveFlight(route: ActivatedRouteSnapshot): MaybeAsync<Observable<Flight>> {
  const flightService = inject(FlightService);

  const id = +(route.paramMap.get('id') ?? 0);
  const flight = flightService.flights.find(f => f.id === id);

  return flight ? of(flight) : flightService.findById(id);
}
