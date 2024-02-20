import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie';
import { imagesBaseUrl } from '../../constants/images-sizes';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item : Movie | null = null;

  imageBaseUrl = imagesBaseUrl;
}
