import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  fields: FieldConfig[] = [];

 form!: FormGroup;

 constructor(private fb: FormBuilder){}

 ngOnInit(){
   this.form = this.fb.group({});
 }

 addField(field: FieldConfig){

   this.fields.push(field);

   this.form.addControl(
     field.name,
     new FormControl('')
   );

 }

 submitForm(){
   console.log(this.form.value);
 }
}
