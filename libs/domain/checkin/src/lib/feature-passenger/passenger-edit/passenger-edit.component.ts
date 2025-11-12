import { httpResource } from '@angular/common/http';
import { Component, input, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Control, createProperty, customError, FieldPath, form, property, required, schema, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger';


// Custom Field Property
const ALLOWED_PASSENGER_STATUS = createProperty<string[]>();

// Custom Validator
function validatePassengerStatus(field: FieldPath<string>, allowedStatus: string[]): void {
  // Set Custom Field Property
  property(field, ALLOWED_PASSENGER_STATUS, () => allowedStatus);
  validate(field, ({ value }) =>
    !allowedStatus.includes(value())
      ? customError({
        kind: 'forbiddenPassengerStatus',
        message:
          'This Passenger Status is not allowed. Please use one of the following: ' +
          allowedStatus.join(', '),
      }) : undefined
  );
}

// (3) Field Logic: required, custom validator, disabled, hidden, readonly, etc.
const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.name);
  validatePassengerStatus(passengerPath.passengerStatus, ['A', 'C']);
});


@Component({
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // (4) UI Control: Template Binding
    Control
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  // (1) Data Model: Writable Signal
  protected passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });

  // (2) Field State: Meta Data - valid, dirty, touched, etc.
  protected editForm = form(this.passengerResource.value, passengerSchema);

  id = input(0, { transform: numberAttribute });
  
  protected save(): void {
    console.log(this.editForm().value());
  }
}
