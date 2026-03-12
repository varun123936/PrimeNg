import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fields: FieldConfig[] = [];

 addField(field: FieldConfig){

   this.fields.push(field);

 }
}
