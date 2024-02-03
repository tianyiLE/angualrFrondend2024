import { Injectable } from '@angular/core';
import { Observable, map, of, tap, catchError, forkJoin } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  url = 'https://tianyile-apicoursangular2024.onrender.com/api/assignments'
  resultDeHttp:any
  assignments: Assignment[] = [
    {
      id: 1,
      nom: 'TP1 sur WebComponents,un lecteur audio amelioré',
      dateDeRendu: new Date('2024-01-25'),
      rendu: true
    },
    {
      id: 2,
      nom: 'TP2 sur Angular,un joli gestionnaire de devoirs ',
      dateDeRendu: new Date('2024-01-26'),
      rendu: false
    },
    {
      id: 3,
      nom: 'TP3 sur Angular，utilisation du router et de Web Service',
      dateDeRendu: new Date('2024-01-27'),
      rendu: false
    }
  ]
  constructor(private loggingService:LoggingService, private http: HttpClient) { }

  getAssignment(id:number): Observable<Assignment | undefined> {
    // const assignment:Assignment|undefined = this.assignments.find(item => item.id === id)
    // return of(assignment)
    return this.http.get<Assignment>(this.url + "/" + id).pipe(map(a => {
      a.nom += " transforme avec un pipe..."
      return a
    }),
    tap( _ => {
      console.log("tap:assignment avecid = "+ id + " requete GET envoyée sur MongoDB cloud");
    }),
    catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    )
  }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments)
  }

  getAssignmentsByHttp(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url)
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment)
    // return of('Assignment service: Assignment ajouté')
    return this.http.post<Assignment>(this.url, assignment, this.HttpOptions)
  }
  
  updateAssignment(assignment: Assignment): Observable<any> {
    // const renduAssignment = this.assignments.find(item => item.nom === assignment.nom)
    // if(renduAssignment) {
    //   renduAssignment.rendu = true
    // }
    // return of('Assignment service: Assignment modifié!')
    return this.http.put<Assignment>(this.url, assignment)
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    let pos = this.assignments.indexOf(assignment)
    this.assignments.splice(pos,1)
    return of('Assignment service: assignment supprimé')
  }

  deleteAssignmentByHttp(assignment: Assignment): Observable<any> {
    let deleteURL = this.url + "/" + assignment._id
    return this.http.delete(deleteURL)
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
    console.log(error); // pour afficher dans la console
    console.log(operation + ' a échoué ' + error.message);
    return of(result as T);
    }
   }

   peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];
    bdInitialAssignments.forEach(a => {
    const nouvelAssignment = new Assignment();
    nouvelAssignment.id = a.id;
    nouvelAssignment.nom = a.nom;
    nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
    nouvelAssignment.rendu = a.rendu;
    
   appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });
    console.log("peuplerBDavecForkJoin被调用了");
    
    return forkJoin(appelsVersAddAssignment);
    }

    getAssignmentsPagine(page:number, limit:number) : Observable<any> {
      return this.http.get<any>(this.url + "?page=" +page + "&limit=" + limit )
    }
}
