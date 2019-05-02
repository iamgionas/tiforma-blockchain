import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudyPlan } from 'src/app/ch.supsi';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  
  // Variabile che permette di caricare il componente loading -> rotellina che gira
  private loading: boolean;

  // Studente selezionato dalla lista di sinistra
  private student: Student;
  // Variaible per la gestione della data
  private birthday: string;
  
  // Oggetto lista ddi Formazioni -> per gestire la select list nell'HTML
  // [Ingegneria Informatica TP] =  "resource:ch.supsi.StudyPlan#Ingegneria%20Informatica%20TP" 
  private studyplans: {};
  
  // Lista di stato -> per gestire la select list nella pagina HTML
  private statuteValues = [
    "Mai immatricolato",
    "Immatricolato",
    "Exmatricolato",
    "Ospite"
  ]

  // Oggetto bidirezionale che viene modificato nel form nell'HTML
  // Oggetto di tipo ch.supsi.UpdateStudent -> Oggetto JSON per la transazione 
  @Input() studentData: any = {
    $class: 'ch.supsi.UpdateStudent',
    oldStudent: 'resource:ch.supsi.Student#',
    name: '',
    surname: '',
    birthday: '',
    nationality: '',
    statute: '',
    serialNumber: '',
    comment: '',
    studyPlan: 'resource:ch.supsi.StudyPlan#NULL'
  };

  // Oggetto per l'eliminazione dello Studente
  // Oggetto di tipo ch.supsi.DeleteStudent -> Oggetto JSON per la transazione 
  private studentDataToDelete = {
    $class: "ch.supsi.DeleteStudent",
    student: "resource:ch.supsi.Student#"
  }

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.studyplans = {};

    this.route.params.subscribe((parms: any) => {
      if (parms.id) {

        // Richiesta rest asincrona per creare la lista delle formazioni -> per gestire la select list nell'HTML
        this.studentsService.getStudyPlans().subscribe((sp : StudyPlan[]) => {
          sp.forEach(plan => {
            this.studyplans[plan.name] = ("resource:ch.supsi.StudyPlan#" + plan.name.toString().split(' ').join('%20'));
          });
        });

        // Richiesta rest asincrona per recuperare le info dello studente e completare il form
        this.studentsService.getStudent(this.route.snapshot.params['id']).subscribe((data: Student) => {
          this.student = data;

          this.studentData.oldStudent = 'resource:ch.supsi.Student#'+this.route.snapshot.params['id'];
          this.studentData.name = this.student.name;
          this.studentData.surname = this.student.surname;
          this.studentData.birthday = this.student.birthday;  //new Date()
          this.studentData.nationality = this.student.nationality;
          this.studentData.statute = this.student.statute;
          this.studentData.serialNumber = this.student.serialNumber;
          this.studentData.comment = this.student.comment;
          this.studentData.studyPlan = this.student.studyPlan;

          this.studentDataToDelete.student = 'resource:ch.supsi.Student#'+this.route.snapshot.params['id'];
        });
      }
    });

  }

  // Metodo per l'aggiornamento di uno studente
  updateStudent() {
    // Compongono lo studi plan imettendo i %20 al posto degli spazi
    this.studentData.studyPlan = this.studentData.studyPlan.split(' ').join('%20');
    this.loading = true;

    // Richiesta rest asincrona per aggiornare lo studente e ricaricare la pagina
    this.studentsService.updateStudent(this.studentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  // Metodo per l'eliminazione di uno studente
  deleteStudent() {
    this.loading = true;

    // Richiesta rest asincrona per eliminare lo studente e ricaricare la pagina
    this.studentsService.deleteStudent(this.studentDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  // Metodo per aggiornare la data quando si cambia nel form
  setBirthday(event){
    this.studentData.birthday = $("#birthday").val();
  }

  // Metodo per la stampa 
  printDetail(): void {
    let printContents, popupWin;
    let buttonGroup = document.querySelector('#buttonGroup');

    let nationalityOption = document.createElement('option');
    nationalityOption.setAttribute('selected','selected');
    nationalityOption.setAttribute('value',this.student.nationality);
    nationalityOption.innerHTML = this.student.nationality;

    document.querySelector('#serialNumber').setAttribute('value',this.student.serialNumber);
    document.querySelector('#statute').setAttribute('value',this.student.statute);
    document.querySelector('#name').setAttribute('value',this.student.name);
    document.querySelector('#surname').setAttribute('value',this.student.surname);
    document.querySelector('#nationality').appendChild(nationalityOption);
    document.querySelector('#birthday').setAttribute('value', this.formatDate());
    document.querySelector('#comment').innerHTML =  this.student.comment;
    
    
    printContents = document.getElementById('studentDetail');
    printContents.removeChild(buttonGroup);
    printContents = printContents.innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

    window.location.reload();
  }

  private formatDate() : string{
    let date = this.student.birthday.toString().split('T')[0];
    let day = date.split('-')[2];
    let month = date.split('-')[1];
    let year = date.split('-')[0];

    return year+"-"+month+"-"+day;
  }
}
