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
  restaurants: Restaurant[];
  event: Event;


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

  toggleRestaurant(event) {
    const reqevent={
      eventid: event.id
    }

    console.log(event);
    this.showEvent = false;
    this.showRestaurant = true;
    this.showResDetail = false;
    this.showResForm = false;

    this.eventService.getRestaurantList(reqevent).subscribe(restaurants => {
      console.log(restaurants);
      this.restaurants = restaurants;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }

  toggleRestaurantDetail(restaurant) {
    console.log(restaurant);
  }

}

interface Event {
  id: number;
  eventname: string;
  imgname: string;
  createuser: number;
  createdt: string;
}

interface Restaurant {
  eventid: number;
  restaurantid: number;
  restaurantname: string;
  imgname: string;
}
