import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import * as accordionTemplate from '../../assets/accordion-template/accordion-template.json'

@Component({
  selector: 'hp-app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  src: string = "http://localhost:4301/../../assets/images/image.png";
  panelExpanded: boolean = false;
  accordionTemplateDetails;
  profileDetails;
  profileType;
  showPatientProfile: boolean = false;
  showPatientSummary: boolean = false;
  dataToTakecare = [];
  objPrototype;
  showInfoBox = true;
  userPreferences = {};

  userData;
  prefUpdated=false;

  constructor(private _service: LoginService) {
    this.accordionTemplateDetails = accordionTemplate['default'];
    this.objPrototype = Object;
  }

  ngOnInit(): void {
    
    this.userData = {
    "patientID": { value: "FORTPAT03", isAccessibleOutside: false },
    "fullName": { value: "Natasha Campbell", isAccessibleOutside: false },
    "sex": { value: "F", isAccessibleOutside: true },
    "dob": { value: "1993-09-14", isAccessibleOutside: true },
    "age": { value: 27, isAccessibleOutside: false },
    "bmi": { value: 21.4, isAccessibleOutside: false },
    "contact_phone": { value: "(080) 876-5412", isAccessibleOutside: true },
    "contact_email": { value: "n.campbell@email.me", isAccessibleOutside: false },
    "contact_emergency": { value: "Rachel Campbell", isAccessibleOutside: true },
    "contact_emergency_number": { value: "(080) 876-1455", isAccessibleOutside: true },
    "future_appointment": { value: "", isAccessibleOutside: false },
    "past_appointment": { value: "29-Feb-2020", isAccessibleOutside: false },
    "med_1": { value: "Iris Pure Drops", isAccessibleOutside: false },
    "med_2": { value: "VitaRich D", isAccessibleOutside: true },
    "med_3": { value: "Cutizrol Ointment", isAccessibleOutside: false },
    };

    this.setUserPreferences(this.userData);
  }

  setUserPreferences(userData){
     Object.keys(userData).forEach(dataKey=>{
        if( userData[dataKey]["isAccessibleOutside"] ){
          this.userPreferences[dataKey.toString()] = userData[dataKey]["value"];
        }
     });
  }

  dismissNotification() {
    this.showInfoBox = false;
  }

  updateFieldInPreferences(fieldKey){
    this.prefUpdated=true;
    if(Object.keys(this.userPreferences).includes(fieldKey)){
      delete this.userPreferences[fieldKey];
    }else{
      this.userPreferences[fieldKey.toString()] = this.userData[fieldKey] && this.userData[fieldKey]["value"] ? this.userData[fieldKey]["value"] : "";
    }
  }

  sendDataToTakeCare() {
    document.dispatchEvent(new CustomEvent('dataFromHealthProfile', {
      detail: this.formatDataForTCApp(this.userPreferences)
    }));

    this.prefUpdated=false;
  }

  formatDataForTCApp(dataToTakecare){
    let formattedData = {    };

    Object.keys(dataToTakecare).forEach(fieldKey => {
      formattedData[fieldKey.toUpperCase()] = dataToTakecare[fieldKey];
    });

    return formattedData;
  }

  returnZero() {
    return 0
  }

}
