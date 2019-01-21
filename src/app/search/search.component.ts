import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PlayList } from '../models/playlist';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() newPlayList: EventEmitter<PlayList> = new EventEmitter();
  form: FormGroup;
  finding = false;
  error = false;

  constructor(private formBuilder: FormBuilder, private playListService: PlaylistService) {
    this.buildForm();
    this.setListeners();
    this.form.controls.id.setValue('UUTI5S0PqpgB0DbYgcgRU6QQ'); // DEMO
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  setListeners() {
    this.form.controls.id.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(value => {
      this.finding = true;
      this.error = false;
      this.playListService.getPlayList(value)
        .subscribe(playList => {
          this.newPlayList.emit(playList);
          this.finding = false;
        }, err => {
          this.finding = false;
          this.error = true;
          console.log(err);
        });
    });
  }

  ngOnInit() {
  }

}
