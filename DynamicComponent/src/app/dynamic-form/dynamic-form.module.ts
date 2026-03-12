import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FieldSelectorComponent } from './components/field-selector/field-selector.component';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';

@NgModule({
  declarations: [FormBuilderComponent, FieldSelectorComponent, DynamicFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ FormBuilderComponent ]
})
export class DynamicFormModule { }