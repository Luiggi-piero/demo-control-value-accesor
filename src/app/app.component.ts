import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StarRatingComponent } from './star-rating/star-rating.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StarRatingComponent, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-control-value-accesor';
  formGroup = new FormGroup({
    title: new FormControl('El señor de los anillos', Validators.required),
    rating: new FormControl(4, Validators.min(3)),
  });
  clickSave(): void {
    console.log('valid ==>', this.formGroup.valid);
    // console.log(this.formGroup.controls.rating.touched);
  }
}
