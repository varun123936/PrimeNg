import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FieldConfig } from '../../models/field-config.model';
import { FIELD_TYPES } from '../../models/field-types';

@Component({
  selector: 'app-field-selector',
  templateUrl: './field-selector.component.html',
  styleUrls: ['./field-selector.component.css']
})
export class FieldSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fieldTypes = FIELD_TYPES;

 selectedType: string = '';
 label: string = '';

 @Output()
 fieldAdded = new EventEmitter<FieldConfig>();

 addField(){

   if(!this.selectedType || !this.label){
     return;
   }

   const field: FieldConfig = {
     type: this.selectedType,
     label: this.label,
     name: this.label.toLowerCase().replace(/ /g, '_'),
     placeholder: "Enter " + this.label
   };

   this.fieldAdded.emit(field);

   this.label = '';
   this.selectedType = '';
 }

}
