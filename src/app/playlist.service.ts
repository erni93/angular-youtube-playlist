import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayList } from './models/playlist';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Video } from './models/video';
import { PageDirection } from './models/pageDirectionEnum';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private YOUTUBE_TOKEN = 'AIzaSyCceWXD8onGDt961b0UlGbdCe3hqNgH_1Q';

  constructor(private http: HttpClient) {

  }

  private getURL(id: string, pageToken?: string): string {
    return 'https://www.googleapis.com/youtube/v3/playlistItems?pageToken=' + (pageToken != null ? pageToken : '')
      + '&part=snippet%2CcontentDetails%2Cstatus&maxResults=5&playlistId=' + id + '&key=' + this.YOUTUBE_TOKEN;
  }

  private requestPlayList(id: string, pageToken?: string): Observable<PlayList> {
    return this.http.get(this.getURL(id, pageToken))
      .pipe(
        map((res: any) => {
          return {
            id: id,
            total: res.pageInfo.totalResults,
            pages: Math.floor((res.pageInfo.totalResults - 1) / 5) + 1,
            actual: res.items != null && res.items.length > 0 ? Math.floor(res.items[0].snippet.position / 5) + 1 : 1,
            nextPageToken: res.nextPageToken,
            prevPageToken: res.prevPageToken,
            videos: res.items.map((item: any) => {
              return {
                id: item.snippet.resourceId.videoId,
                publishedAt: new Date(item.snippet.publishedAt),
                title: item.snippet.title,
                description: item.snippet.description,
                imgURL: item.snippet.thumbnails.medium.url,
              } as Video;
            })
          } as PlayList;
        })
      );
  }

  getPlayList(id: string): Observable<PlayList> {
    return this.requestPlayList(id);
  }

  movePage(playlist: PlayList, direction: PageDirection): Observable<PlayList> {
    let pageToken = '';
    if (direction === PageDirection.NEXT) {
      pageToken = playlist.nextPageToken;
    } else if (direction === PageDirection.PREVIOUS) {
      pageToken = playlist.prevPageToken;
    }
    if (pageToken == null) {
      throw Observable.throw('Undefined pageToken');
    }
    return this.requestPlayList(playlist.id, pageToken);
  }


}
