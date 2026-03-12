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
 optionsText: string = '';

 @Output()
 fieldAdded = new EventEmitter<FieldConfig>();

 addField(){

   if(!this.selectedType || !this.label){
     return;
   }

   const options = this.parseOptions(this.optionsText);
   if ((this.selectedType === 'select' || this.selectedType === 'radio') && options.length === 0) {
     return;
   }

   const field: FieldConfig = {
     type: this.selectedType,
     label: this.label,
     name: this.label.toLowerCase().replace(/ /g, '_'),
     placeholder: "Enter " + this.label,
     options: options.length > 0 ? options : undefined
   };

   this.fieldAdded.emit(field);

   this.label = '';
   this.selectedType = '';
   this.optionsText = '';
 }

 private parseOptions(optionsText: string): string[] {
   if (!optionsText) {
     return [];
   }

   return optionsText
     .split(',')
     .map(option => option.trim())
     .filter(option => option.length > 0);
 }

}
