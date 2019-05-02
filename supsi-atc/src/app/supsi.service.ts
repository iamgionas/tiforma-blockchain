import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SUPSIService {

  // Endpoint di base per tutti i link, generato da Hyperledger
  private endpoint = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  // Ritorna tutti gli elementi, esempio http://localhost:3000/api/Student
  getElements(type: String) {
    return this.http.get(this.endpoint + type);
  }

  // Ritorna un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
  getElement(type: String, id) {
    return this.http.get(this.endpoint + type + '/' + id);
  }

  // Aggiorna un singolo elemento selezionato dall'ID passandoli un oggetto JSON, esempio http://localhost:3000/api/Student/5
  updateElement(type: String, id, elementData) {
    return this.http.put(this.endpoint + type + '/' + id, elementData);
  }

  // Elimina un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
  deleteElement(type: String, id) {
    return this.http.delete(this.endpoint + type + '/' + id);
  }

  // Esegue le transazioni custom create passandoli un elemento JSON, esempio http://localhost:3000/api/CreateStudent
  operationToElement(type: String, elementData) {
    return this.http.post(this.endpoint + type, elementData);
  }

}
