import { CommonModule } from '@angular/common';
import { Component, /*EventEmitter, Output*/ OnInit } from '@angular/core';
import { RenduDirective } from '../../shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AssignmentDetailComponent } from '../assignment-detail/assignment-detail.component';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule,
    RenduDirective,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AssignmentDetailComponent,
    AddAssignmentComponent
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {

  // @Output() nouvelAssignment = new EventEmitter<Assignment>
  ngOnInit(): void { }
  constructor(private assignmentsService: AssignmentsService) { }
  nomDevoir: string = ''
  dateDeRendu: Date = new Date()
  ajouteActive = true
  assignments!: Assignment[]
  onSubmit() {
    console.log(this.nomDevoir);
    const newAssignment = new Assignment()
    newAssignment.id = Math.floor(Math.random()*1000)
    newAssignment.nom = this.nomDevoir
    newAssignment.dateDeRendu = this.dateDeRendu
    newAssignment.rendu = false
    // this.nouvelAssignment.emit(newAssignment)
    this.assignmentsService.addAssignment(newAssignment).subscribe(message => console.log(message))
  }
}
