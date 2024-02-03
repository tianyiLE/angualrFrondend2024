import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentName:string, action:string) {
    console.log("Assignment" + assignmentName + " " + action);
  }
}
