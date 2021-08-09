import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userUrl: string = "http://127.0.0.1:4301/../../assets/data/user.json";
  patientProfileUrl: string = "http://127.0.0.1:4301/../../assets/data/patient-details.json";
  patientDB: string = "http://127.0.0.1:4301/../../assets/data/patientsDB.json"

  userData = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  validateUserProfile(): Observable<any> {
    return this.http.get<any>(this.userUrl);
  }

  setUserData(userInfo) {
    this.userData.next(userInfo);
  }

  getUserDetails(): Observable<any> {
    return this.userData.asObservable();
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.patientProfileUrl);
  }

  getPatientDBData(): Observable<any> {
    return this.http.get<any>(this.patientDB);
  }
}
