import { Component, OnInit, Input } from '@angular/core';
import { PlayList } from '../models/playlist';
import { PageDirection } from '../models/pageDirectionEnum';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() playList: PlayList;

  PageDirection = PageDirection;
  finding = false;
  error = false;

  constructor(private playListService: PlaylistService) { }

  ngOnInit() {
  }

  movePage(direction: PageDirection) {
    this.finding = true;
    this.error = false;
    this.playListService.movePage(this.playList, direction)
      .subscribe(playList => {
        this.playList = playList;
        this.finding = false;
      }, err => {
        this.finding = false;
        this.error = true;
        console.log(err);
      });
  }

}
