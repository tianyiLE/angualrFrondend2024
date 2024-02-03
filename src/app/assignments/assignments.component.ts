import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { RenduDirective } from '../shared/rendu.directive';
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
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-assignments',
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
    MatFormFieldModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    RouterOutlet,
    RouterModule,
    JsonPipe
  ],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'] // 注意是 styleUrls，且是数组
})

export class AssignmentsComponent implements OnInit {

  opened: boolean = false
  formVisible = false;
  title = 'Hello AssignmentsComponent';
  ajouteActive = false
  nomDevoir: string = ''
  dateDeRendu: Date = new Date()
  assignmentSelectionne!: Assignment;
  assignments!: Assignment[]

  //分页显示需要的属性properties
  pageEvent!: PageEvent;
  page: number = 1; //对应 [pageIndex] 当前页
  limit: number = 10; // 对应[pageSize] 每页显示数量
  totalDocs!: number;//对应[length]le nombre de items 
  totalPages!: number; //没有对应的
  nextPage!: number; 
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;


  constructor(private assignmentsService: AssignmentsService, public authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    // this.getAssignments()
    this.getAssignmentsPagineByService()
  }
  onSubmit() {
    console.log(this.nomDevoir);
    const newAssignment = new Assignment()
    newAssignment.nom = this.nomDevoir
    newAssignment.dateDeRendu = this.dateDeRendu
    newAssignment.rendu = false
    this.assignments.push(newAssignment)
  }
  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment
  }

  onAjouterAssignment() {
    this.router.navigate(['/add'])
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsByHttp().subscribe(assignments => {
      this.assignments = assignments; console.log(this.assignments);
    })
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();
    // meilleure version :
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTSAJOUTES, ON RE-AFFICHE LA LISTE");
        // replaceUrl = true = force le refresh, même si
        // on est déjà sur la page d’accueil
        // Marche plus avec la dernière version d’angular
        //this.router.navigate(["/home"], {replaceUrl:true});
        // ceci marche….
        window.location.reload();
      }
      )
  }

  getAssignmentsPagineByService() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(
      data => {
        this.assignments = data.docs;//获取的assignment赋值
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log("Données recues");
      }
    )
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.limit = e.pageSize;  
    this.page = e.pageIndex;
    this.getAssignmentsPagineByService()
    console.log('当前页是', this.page, '一页装', this.limit, '个');
    
  }
}
