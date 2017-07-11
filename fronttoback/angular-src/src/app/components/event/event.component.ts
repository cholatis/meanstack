import { Component, OnInit } from '@angular/core';
import { EventService} from '../../services/event.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  imgPath:string = "app/images/";
  //imgFileName:string = "Banner_640x160px.jpg";

  events: Event[];

  showEvent: boolean = true;
  showRestaurant: boolean = false;
  showResDetail: boolean = false;
  showResForm: boolean = false;

  constructor(private eventService:EventService, private router:Router) {

  }

  ngOnInit() {
    this.eventService.getEvent().subscribe(events => {
      //console.log(events);
      this.events = events;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }

  toggleRestaurant() {

  }

}

interface Event {
  id: number;
  eventname: string;
  imgname: string;
  createuser: number;
  createdt: string;
}
