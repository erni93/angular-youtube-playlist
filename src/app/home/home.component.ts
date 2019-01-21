import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayList } from '../models/playlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playList: PlayList;

  constructor() { }

  ngOnInit() {
  }

}
