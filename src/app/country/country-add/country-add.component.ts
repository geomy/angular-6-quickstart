import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { SharedUtils } from '../../shared/utils';
import * as _ from "lodash";

@Component({
  selector: 'my-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css',
    '../../shared/styles/layout-responsive.component.css',
    '../../shared/styles/spacing-responsive.component.css',
    '../../shared/styles/width-responsive.component.css',
    '../../shared/styles/font-design.component.css'],
})
export class CountryAddComponent implements OnChanges {
  @Input() mdlAddRecord: boolean;
  @Output() addRecord: EventEmitter<any> = new EventEmitter();
  @Output() exitModal: EventEmitter<any> = new EventEmitter();
  countryName: string;
  capital: string;
  disableSave: boolean = true;
  disableClose: boolean = false;

  constructor(private sharedUtils: SharedUtils) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.countryName = '';
    this.capital = '';
  }

  ngOnInit() { }

  addData() {
    let addCountry = { name: this.countryName, capital: this.capital };
    this.addRecord.emit(addCountry)
    this.disableBtns();
    this.closeModal();
  }

  closeModal() {
    this.mdlAddRecord = false;
    this.exitModal.emit("add");
    this.clearFields();
  }

  validateInput() {
    if (!this.sharedUtils.isStringNullOrEmpty(this.countryName) && (!this.sharedUtils.isStringNullOrEmpty(this.capital))) {
      this.disableSave = false;
    } else {
      this.disableSave = true;
    }
  }

  clearFields() {
    this.countryName = '';
    this.capital = '';
    this.disableSave = true;
  }

  disableBtns() {
    this.disableSave = true;
    this.disableClose = true;
  }
}

