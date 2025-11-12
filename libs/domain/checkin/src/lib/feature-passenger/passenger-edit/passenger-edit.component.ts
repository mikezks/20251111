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
    Control, 
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  // (1) Data Model: Writable Signal
  protected readonly passenger = signal(initialPassenger);

  // (2) Field State: valid, touched, dirty, value, disabled, ...
  protected readonly editForm = form(this.passenger);

  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });

  constructor() {
    effect(() => console.log(this.id()));
    // effect(() => {
    //   if (this.passengerResource.hasValue()) {
    //     this.editForm.patchValue(this.passengerResource.value());
    //   }
    // });
  }

  protected save(): void {
    // this.passengerResource.set(this.editForm.getRawValue());
    console.log(this.editForm());
  }
}
