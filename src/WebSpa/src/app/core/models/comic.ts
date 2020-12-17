import { ComicDate, Image, ResourceList, Thumbnail } from '.';


export interface Comic {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  resourceURI: string;
  dates: ComicDate[];
  thumbnail: Thumbnail;
  images: Image[];
  creators: ResourceList;
  characters: ResourceList;
}