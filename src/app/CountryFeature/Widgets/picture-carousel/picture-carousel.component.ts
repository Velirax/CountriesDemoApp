import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-picture-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture-carousel.component.html',
  styleUrl: './picture-carousel.component.css'
})
export class PictureCarouselComponent {
  @Input() images: any[] = [];
  currentIndex: number = 0;
  @Input() imageWidth:number = 100;
  @Input() imageHeigth:number = 200;
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
}
