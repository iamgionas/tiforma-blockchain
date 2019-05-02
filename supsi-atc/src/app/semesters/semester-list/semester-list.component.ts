import { Component, OnInit } from '@angular/core';
import { Semester } from 'src/app/ch.supsi';
import { SemestersService } from '../semesters.service';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css']
})
export class SemesterListComponent implements OnInit {

  // Lista di oggeti Semestri -> per gestire la colonna lista di sinistra nell'HTML
  private semesters: Semester[] = [];

  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    // Richiesta rest asincroma per creare la lista dei semestri -> per gestire la lista a sinistra nell'HTML
    this.semestersService.getSemesters().subscribe((res: Semester[]) => {
      this.semesters = res;
    });
  }

}
