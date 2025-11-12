import { httpResource } from '@angular/common/http';
import { Component, effect, input, numberAttribute, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, Control } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger';


@Component({
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // (3) Field: Template Binding
    Control, // -> Angular 21: Field
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  // (1) Data Model: Writable Signal
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });

  // (2) Field State: valid, touched, dirty, value, disabled, ...
  protected readonly editForm = form(this.passengerResource.value);

  readonly id = input(0, { transform: numberAttribute });

  constructor() {
    effect(() => console.log(this.id()));
  }

  protected save(): void {
    console.log(this.editForm().value());
    console.log(this.passengerResource.value());
  }
}
