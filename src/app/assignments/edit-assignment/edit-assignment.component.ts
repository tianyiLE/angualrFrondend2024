import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from './../../shared/assignments.service';
import { CommonModule } from '@angular/common';
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


@Component({
  selector: 'app-edit-assignment',
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
    MatListModule
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getAssignment();
    // console.log("QueryParams :", this.route.snapshot.queryParams);
    // console.log("Fragment:", this.route.snapshot.fragment);
    this.route.queryParams.subscribe(params => {
      console.log("Query Params ：", params);
    })
    this.route.fragment.subscribe(fragment => {
      console.log("Fragment :", fragment);
    })
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        console.log(this.assignment);
        this.router.navigate(['/home']);
      });
  }
}