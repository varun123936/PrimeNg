import { Component, Input, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() field!: FieldConfig;

 @Input() form!: FormGroup;
}
