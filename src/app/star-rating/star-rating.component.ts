import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  //“Oye Angular, este componente personalizado (star-rating) se comporta como un input del formulario (como un <input> o <select>)”
  providers: [
    {
      // “Este componente (StarRatingComponent) actúa como un ControlValueAccessor”
      provide: NG_VALUE_ACCESSOR, // Sirve para encontrar quién sabe leer/escribir valores en el componente, Angular busca quién controla el valor del input… y tú le dices “yo lo hago”
      useExisting: StarRatingComponent, // si ya existe la instancia de StarRatingComponent usala
      multi: true, // para agregar otros proveedores
    },
  ],
})
export class StarRatingComponent implements OnInit, ControlValueAccessor {
  private _rating: number = 3;
  ratingArr: number[] = [];
  private _onChanged: Function = (_value: number) => {};
  private _onTouch: Function = (_value: number) => {};

  ngOnInit(): void {
    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number): void {
    this._rating = rating;
    // En este momento cambia el valor del componente, por eso se llama a _onChanged
    this._onChanged(this._rating); // Al llamarla(_onChanged) → actualizas el FormControl(rating)
    this._onTouch(this._rating);  // cuando le de click significa que el usuario lo a tocado, por detras angular ejecuta blur
  }
  showIcon(index: number): string {
    return this._rating >= index + 1 ? 'star' : 'star_border';
  }

  //#region ControlValueAccessor
  /**
   *
   * establece el valor inicial de un control de formulario nativo, pero en este caso es para darle valor a _rating
   * @param r es el valor que form control envía desde app.component.ts linea 23, el formcontrol 'rating'
   */
  writeValue(r: number): void {
    // console.log('writeValue*** ', r);
    if (r) {
      this._rating = r;
    }
  }

  /**
   * Permite al formcontrol(rating) Registrar una función, que luego se ejecutará cuando
   * ocurra/se emita un cambio en el control de formulario o en este caso se emite
   * el cambio desde este componente hasta el formControl 'rating' de app.component.ts
   * - Emite un valor al form control (rating)
   * - “Angular, dame la función que debo llamar cuando cambie el valor… yo la guardaré y la usaré después”
   * @param fn Angular te está pasando una función (fn) para que tú la llames cuando el valor de tu componente cambie.
   */
  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouch = fn;
  }
  //#endregion
}
