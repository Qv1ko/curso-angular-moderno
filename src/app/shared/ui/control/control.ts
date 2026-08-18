import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'qv1-control',
  imports: [JsonPipe],
  templateUrl: './control.html',
  styleUrl: './control.css',
})
export class Control {
  controlName = input.required<string>();
  labelDisplay = input.required<string>();
  errors = input<unknown>();
}
