import { Component, OnInit, Input } from '@angular/core';
import { SemestersService } from '../semesters.service';

@Component({
  selector: 'app-semester-new',
  templateUrl: './semester-new.component.html',
  styleUrls: ['./semester-new.component.css']
})
export class SemesterNewComponent implements OnInit {

  // Variabile che permette di caricare il componente loading -> rotellina che gira
  private loading: boolean;

  // Oggetto bidirezionale che viene modificato nel form nell'HTML
  // Oggetto di tipo ch.supsi.CreateSemester -> Oggetto JSON per la transazione 
  @Input() semesterData: any = {
    $class: 'ch.supsi.CreateSemester',
    name: '',
    description: '',
    modules: []
  };

  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    this.loading = false;
  }

  createSemester() {
    this.loading = true;

    // Eseguo la creazione del semestre e riaggiorno la pagina
    this.semestersService.createSemester(this.semesterData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
