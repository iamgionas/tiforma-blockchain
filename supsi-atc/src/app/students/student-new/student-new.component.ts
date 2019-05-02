import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
import { DatePipe } from '@angular/common';
import { StudyPlan } from 'src/app/ch.supsi';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {

  // Variabile che permette di caricare il componente loading -> rotellina che gira
  private loading: boolean;

  // Lista di oggeti di Formazioni -> per gestire la select list nell'HTML
  studyPlans : StudyPlan[] = [];

  // Lista di stato -> per gestire la select list nella pagina HTML
  statuteValues = [
    "Mai immatricolato",
    "Immatricolato",
    "Exmatricolato",
    "Ospite"
  ]

  // Oggetto bidirezionale che viene modificato nel form nell'HTML
  // Oggetto di tipo ch.supsi.CreateStudent -> Oggetto JSON per la transazione 
  @Input() studentData: any = {
    $class: 'ch.supsi.CreateStudent',
    contactID: '',
    statute: '',
    serialNumber: '',
    name: '',
    surname: '',
    birthday: '',
    nationality: '',
    comment: '',
    transactionId: '',
    studyPlan: 'resource:ch.supsi.StudyPlan#NULL',
  };

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.loading = false;

    // Richiesta rest asincroma per creare la lista delle formazioni -> per gestire la select list nell'HTML
    this.studentsService.getStudyPlans().subscribe((sp : StudyPlan[]) => {
      this.studyPlans = sp;
    });
  }

  createStudent(){
    // Generazione di un ID studente randomico 
    this.studentData.contactID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // Visualizzo la pagina di caricamento
    this.loading = true;
    // Eseguo la creazione dello studente e riaggiorno la pagina
    this.studentsService.createStudent(this.studentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }


}
