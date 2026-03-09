import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DropdownModule, TableModule, DialogModule, ToastModule, CalendarModule, AccordionModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PrimeNg1';
  username: string = '';

  submitForm() {
    console.log("Form submitted");
  }

  cities = [
    { name: 'Hyderabad', code: 'HYD' },
    { name: 'Chennai', code: 'CHE' },
    { name: 'Bangalore', code: 'BLR' }
  ];

  selectedCity: any;

  employees = [
    { name: 'Varun', department: 'IT', role: 'Full-stack Engineer', joiningDate: '2021-07-15' },
    { name: 'Priya', department: 'HR', role: 'HR Specialist', joiningDate: '2022-01-10' },
    { name: 'Rahul', department: 'Finance', role: 'Analyst', joiningDate: '2020-03-05' },
    { name: 'Sneha', department: 'Marketing', role: 'Manager', joiningDate: '2019-11-20' },
    { name: 'Varun', department: 'IT', role: 'Full-stack Engineer', joiningDate: '2021-07-15' },
    { name: 'Priya', department: 'HR', role: 'HR Specialist', joiningDate: '2022-01-10' },
    { name: 'Rahul', department: 'Finance', role: 'Analyst', joiningDate: '2020-03-05' },
    { name: 'Sneha', department: 'Marketing', role: 'Manager', joiningDate: '2019-11-20' }
  ];

  displayDialog: boolean = false;

  openDialog() {
    this.displayDialog = true;
  }

  constructor(private messageService:MessageService){}

showSuccess(){
this.messageService.add({
severity:'success',
summary:'Success',
detail:'User Saved'
});
}

selectedDate: Date | undefined;

faqs = [
    { question: 'What is Angular?', answer: 'Angular is a framework for building client applications in HTML and TypeScript.' },
    { question: 'What is PrimeNG?', answer: 'PrimeNG is a UI component library for Angular with rich features like tables, dialogs, dropdowns, etc.' },
    { question: 'What is Dependency Injection?', answer: 'DI is a design pattern where dependencies are provided rather than created manually.' }
  ];
  
}
