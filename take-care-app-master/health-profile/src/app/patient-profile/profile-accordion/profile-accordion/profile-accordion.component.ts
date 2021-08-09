import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'hp-app-profile-accordion',
  templateUrl: './profile-accordion.component.html',
  styleUrls: ['./profile-accordion.component.css']
})
export class ProfileAccordionComponent implements OnInit {
  @Input() sectionHeading;
  @Input() userData;
  @Input() sectionFields;//labels and keys

  jsonPrototype = JSON;
  
  @Output() changedField = new EventEmitter();
  @Input() ratioOfSection;
  removeInfoBox: boolean = true;
  dataToTakeCare = [];
  constructor() { }

  ngOnInit(): void {
  }

  emitForTogglePreference(fieldKey) {
    this.userData[fieldKey]['isAccessibleOutside'] = !this.userData[fieldKey]['isAccessibleOutside'];
    this.changedField.emit(fieldKey);
  }


}
