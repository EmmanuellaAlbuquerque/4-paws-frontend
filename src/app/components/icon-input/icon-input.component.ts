import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl, FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";

@Component({
  selector: 'app-icon-input',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './icon-input.component.html',
  styleUrl: './icon-input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
})
export class IconInputComponent {

  @Input() id?: string;
  @Input() type: string = 'text';
  @Input() controlName!: string;
  @Input() placeholder: string = "Digite aqui..."

  constructor(private controlContainer: ControlContainer) {}

  get control(): AbstractControl | null {
    return this.formGroup?.form?.get(this.controlName);
  }

  get formGroup() {
    return this.controlContainer as FormGroupDirective;
  }

}
