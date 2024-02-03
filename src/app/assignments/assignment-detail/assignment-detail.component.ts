import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
// ActivatedRoute用来获取 http传递的属性

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis!: Assignment | null | undefined;
  @Output() devoirRenduVert = new EventEmitter()


  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.getAssignment()
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id']
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      this.assignmentTransmis = assignment;
    })
  }

  onCheckbox() {
    this.devoirRenduVert.emit()
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true
      this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(message => {
        console.log(message);
        this.router.navigate(['/home'])//网页跳转
      })
      
    } else {
      console.error('Assignment is null, cannot Rendu.');
    }
  }

  onDelete() {
    if (this.assignmentTransmis) { // 确保 assignmentTransmis 不是 null
      this.assignmentsService.deleteAssignmentByHttp(this.assignmentTransmis).subscribe(
        message => {
          console.log(message);
          this.assignmentTransmis = null; // 安全地将 assignmentTransmis 设置为 null
          this.router.navigate(['/home'])//网页跳转
        }
      );
    } else {
      console.error('Assignment is null, cannot delete.');
    }
  }

  onClickEdit() {
    if(this.assignmentTransmis){
      this.router.navigate(["/assignment", this.assignmentTransmis.id, 'edit'], {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'})
    } 
  }

  isAdmin() :boolean {
    return this.authService.isAdmin()
  }
}
