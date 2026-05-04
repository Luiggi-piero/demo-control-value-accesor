import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RatingNameComponent } from './rating-name/rating-name.component';
import { StarRatingComponent } from './star-rating/star-rating.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    StarRatingComponent,
    ReactiveFormsModule,
    NgIf,
    RatingNameComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-control-value-accesor';

  formGroup = new FormGroup({
    title: new FormControl('El señor de los anillos', Validators.required),
    rating: new FormControl(4, Validators.min(3)),
    // se envia el valor inicial { name: 'Juanito', rating: 5 } al componente RatingNameComponent, lo recibe writeValue
    ratingName: new FormControl({ name: 'Juanito', rating: 5 }),
  });

  clickSave(): void {
    console.log('valid ==>', this.formGroup.valid);
    console.log(
      'errors ratingName ==>',
      this.formGroup.controls.ratingName.errors,
    );
    // console.log(this.formGroup.controls.rating.touched);
  }
}
