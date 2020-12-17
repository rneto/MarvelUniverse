import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Character, ComicDate, ResourceListItem } from 'src/app/core/models';
import { Comic } from 'src/app/core/models/comic';
import { MarvelApiService, MockedMarvelApiService, SnackBarService } from 'src/app/core/services';
import { ComicDetailsComponent } from '../comic-details/comic-details.component';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  displayedColumns: string[] = ['thumbnail', 'title', 'onSale', 'characters', 'creators', 'pageCount'];
  dataSource: MatTableDataSource<Comic>;
  characterItems$: Observable<Character[]> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    //private marvelApiService: MockedMarvelApiService,
    private marvelApiService: MarvelApiService,
    private snackBarService: SnackBarService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      comicTitle: '',
      character: '',
      onSaleStartDate: '',
      onSaleEndDate: ''
    });

    this.characterItems$ = this.form.get('character').valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      map(value => typeof value === 'string' ? value : value.name),
      switchMap(value => {
        if (value !== '') {
          return this.searchCharacters(value);
        } else {
          return of(null);
        }
      })
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        this.loading = true;

        const comicTitle = this.form.get('comicTitle').value;
        const character = (this.form.get('character').value ? this.form.get('character').value.id : null);
        const onSaleStartDate = (this.form.get('onSaleStartDate').value ? this.form.get('onSaleStartDate').value : null);
        const onSaleEndDate = (this.form.get('onSaleEndDate').value ? this.form.get('onSaleEndDate').value : null);

        await this.marvelApiService.comics(comicTitle, character, onSaleStartDate, onSaleEndDate)
          .subscribe(
              data => {
                  this.dataSource = new MatTableDataSource(data);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.dataSource.sortingDataAccessor = (item, property) => {
                    switch (property) {
                      case 'onSale': return item.dates.find(this.findOnSale).date;
                      default: return item[property];
                    }
                  };

                  this.loading = false;
              },
              error => {
                this.snackBarService.open('Error loading comics.');
                this.loading = false;
              });

      } catch (err) {
        this.snackBarService.open('Invalid search.');
        this.loading = false;
      }
    }
  }

  get comicTitle(): any { return this.form.get('comicTitle'); }
  get character(): any { return this.form.get('character'); }
  get onSaleStartDate(): any { return this.form.get('onSaleStartDate'); }
  get onSaleEndDate(): any { return this.form.get('onSaleEndDate'); }

  searchCharacters(value: string): Observable<Character[]> {
    return this.marvelApiService.characters(value).pipe(
      map(data => {
        return data;
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  showComicDetails(comic: Comic) {
    this.marvelApiService.comic(comic.id).subscribe(
      (comicDetails: Comic) => {
        this.dialog.open(ComicDetailsComponent, {
          data: comicDetails
        });
      });
  }

  displayCharacterName(character: Character) {
    return character && character.name ? character.name : '';
  }

  findOnSale(date: ComicDate): boolean {
    return date.type === 'onsaleDate';
  }

  getNames(items: ResourceListItem[]): string[] {
    return items.map(i => i.name);
  }

  clearComicTitle() {
    this.comicTitle.reset();
  }

  clearCharacter() {
    this.character.reset();
    this.character.setValue('none');
  }

  clearOnSalePicker() {
    this.onSaleStartDate.reset();
    this.onSaleEndDate.reset();
  }

}
