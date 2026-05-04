import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-rating-name',
  standalone: true,
  imports: [StarRatingComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './rating-name.component.html',
  styleUrl: './rating-name.component.scss',
  providers: [
    // Indica que este componente es parte de un formulario(es un control de formulario)
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingNameComponent), // referencia una instancia de RatingNameComponent aunque todavia no exista
      multi: true,
    },

    //Propaga el error hacia el formulario padre
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RatingNameComponent),
      multi: true,
    },
  ],
})
export class RatingNameComponent implements ControlValueAccessor, Validator {
  private _formBuilder = inject(FormBuilder);

  private _onChanged: Function = (_value: {
    name: string;
    rating: number;
  }) => {};
  private _onTouch: Function = (_value: { name: string; rating: number }) => {};

  // Modelo del formulario reactivo tiene un name y rating
  formGroup = this._formBuilder.group({
    name: ['', Validators.required], // debemos propagar los errores hacia el componente que usa RatingNameComponent (hacia el componente padre) implementando la interfaz Validator
    rating: [3, Validators.min(4)],
  });

  constructor() {
    this.formGroup.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      // - Cuando se produzca un cambio en el input(name) o el componente(del control rating)
      // ejecuto lo siguiente, para enviar los cambios al formulario padre
      this._onChanged(this.formGroup.value);
      this._onTouch(this.formGroup.value);
    });
  }

  // para asignar el valor inicial
  // - recibe el valor desde el control ratingName de AppComponent
  // - el valor recibido debe ser igual al modelo del formulario para setear lo valores
  writeValue(obj: { name: string; rating: number }): void {
    if (obj) {
      this.formGroup.setValue(obj);
    }
  }
  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouch = fn;
  }

  // Propaga el error hacia el formulario padre
  // - Necesitamos agregar el token/proveedor NG_VALIDATORS
  // - Si el formulario es valido retorna null, caso contrario
  // retorna un objeto
  validate(_control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalidRatingName: true };
  }
}
