import { Component, Input } from '@angular/core';
import { Thumbnail } from 'src/app/core/models';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {

  @Input() alt: string;
  @Input() thumbnail: Thumbnail;

}
