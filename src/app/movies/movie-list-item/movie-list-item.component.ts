import { Component, Input } from '@angular/core';
import { Movie, MoviesService } from 'src/app/movies.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent {
  @Input() movie?: Movie;
  faSpinner = faSpinner;
  coverImgUrl: string = "/assets/image_not_available.png";
  openModal: boolean = false;
  constructor(private service: MoviesService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.service.getMovieCover(this.movie!.imdbId).subscribe((data => {
      if (data !== undefined && data !== '') this.coverImgUrl = data
    }));
  }

  handleOpenDetailsModal() {
    const modalRef = this.modal.open(MovieDetailsComponent, { size: 'xl' });

    (modalRef.componentInstance as MovieDetailsComponent).movie = this.movie;
    (modalRef.componentInstance as MovieDetailsComponent).coverImgUrl = this.coverImgUrl;
  }
}
