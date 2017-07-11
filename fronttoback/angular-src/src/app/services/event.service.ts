import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  constructor(private http:Http) { }

  getEvent() {
  let headers = new Headers();
  /* this.loadToken();
  headers.append('Authorization', this.authToken); */
  headers.append('Content-Type', 'application/json');
  return this.http.get('http://127.0.0.1:8080/users/eventname', {headers: headers})
  .map(res => res.json());
  }

}
