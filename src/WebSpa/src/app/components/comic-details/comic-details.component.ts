import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comic } from 'src/app/core/models';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.scss'],
})
export class ComicDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Comic) {}

  getTitle() {
    return this.data.title;
  }

  getImage() {
    return this.data.images[0]
      ? this.data.images[0].path + '.' + this.data.images[0].extension
      : '/assets/images/image_not_available.jpg';
  }

  getOnSale() {
    return this.data.dates.find(d => d.type === 'onsaleDate')?.date ?? null;
  }

  getWriter() {
    return this.data.creators.items.filter(i => i.role === 'editor').map(i => i.name) ?? [];
  }

  getCoverArtist() {
    return this.data.creators.items.filter(i => i.role === 'penciller (cover)').map(i => i.name) ?? [];
  }
}
