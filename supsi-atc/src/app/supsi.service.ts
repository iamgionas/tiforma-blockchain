import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SUPSIService {

  // Endpoint di base per tutti i link
  private endpoint = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getElements(type: String) {
    return this.http.get(this.endpoint + type);
  }

  getElement(type: String, id) {
    return this.http.get(this.endpoint + type + '/' + id);
  }

  updateElement(type: String, id, elementData) {
    return this.http.put(this.endpoint + type + '/' + id, elementData);
  }

  deleteElement(type: String, id) {
    return this.http.delete(this.endpoint + type + '/' + id);
  }

  operationToElement(type: String, elementData) {
    return this.http.post(this.endpoint + type, elementData);
  }

}
