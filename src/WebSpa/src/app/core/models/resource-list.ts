import { ResourceListItem } from '.';

export interface ResourceList {
  available: number;
  collectionURI: string;
  items: ResourceListItem[];
}