import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDays, addYears, format, subDays, subYears } from 'date-fns';
import { MMMM_d_yyyy } from "../constants";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})
export class HomePage {

  title = 'Sample App with ion-datetime component';


  dateForm = new FormGroup({
    selectedDate: new FormControl('', Validators.required)
  });
  showResults = false;
  isDatePickerOpen = false;
  minDate = addDays(new Date(), 1).toISOString();
  maxDate = addYears(new Date(), 5).toISOString();
  dateResults: { label: string; value: string }[] = [];
  displayDate = '';

  dateChanged() {
    const selectedDate = this.dateForm.controls.selectedDate.value;
    if (selectedDate) {
      const displayDate = format(new Date(selectedDate), MMMM_d_yyyy);
      // If the user selected a different date, the result list should be hidden until after the user presses the submit button again;
      // otherwise, the last 2 dates on the list will not be accurate
      this.showResults = this.displayDate == displayDate;
      this.displayDate = displayDate;
    }
  }

  onSubmit() {
    if (this.dateForm.valid) {
      const selectedDate = new Date(this.dateForm.controls.selectedDate.value as string);
      this.dateResults = [
        { label: 'Today', value: format(new Date(), MMMM_d_yyyy) },
        { label: 'Yesterday', value: format(subDays(new Date(), 1), MMMM_d_yyyy) },
        { label: '10 days past selected date', value: format(subDays(selectedDate, 10), MMMM_d_yyyy) },
        { label: '1 year past selected date', value: format(subYears(selectedDate, 1), MMMM_d_yyyy) }
      ];

      this.showResults = true;
    }
  }

}
