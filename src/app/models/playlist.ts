import { Video } from './video';

export class PlayList {
    id: string;
    total: number;
    pages: number;
    actual: number;
    nextPageToken: string;
    prevPageToken: string;
    videos: Video[];
}
