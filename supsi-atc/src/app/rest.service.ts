import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endpoint = 'http://localhost:3000/api/ch.supsi.';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAll(baseType): Observable<any> {
    return this.http.get(this.endpoint + baseType).pipe(
      map(this.extractData));
  }

  getStudentsBySurname(surname): Observable<any>{
    return this.http.get('http://localhost:3000/api/queries/selectStudentsBySurname?paramSurname='+surname).pipe(
      map(this.extractData));
  }

  createStudent(student): Observable<any>{
    return this.http.post(this.endpoint+"CreateStudent",student).pipe(map(this.extractData));
  }

  getObject(baseType, id): Observable<any> {
    return this.http.get(this.endpoint + baseType + '/' + id).pipe(
      map(this.extractData));
  }

  addObject(baseType, obj): Observable<any> {
    console.log(obj);
    return this.http.post<any>(this.endpoint + baseType, JSON.stringify(obj), this.httpOptions).pipe(
      catchError(this.handleError<any>('addObject'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateObject (baseType, id, object): Observable<any> {
    return this.http.put(this.endpoint + baseType + '/' + id, JSON.stringify(object), this.httpOptions).pipe(
      catchError(this.handleError<any>('updateObject'))
    );
  }
  
  deleteObject (baseType, id): Observable<any> {
    return this.http.delete<any>(this.endpoint + baseType + '/' + id, this.httpOptions).pipe(
      //tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
}