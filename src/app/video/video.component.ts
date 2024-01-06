import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div style="max-width: 720px; max-height: 520px;">
  <video controls #target class="vjs-fill" preload="auto" style="width: 100%; height: 100%;">
    <source src="http://localhost:8081/api/videos/2" type="video/mp4" />
    <source src="http://localhost:8081/api/videos/2" type="video/mkv" />
    Your browser does not support the video tag.
  </video>
  <button (click)="togglePlay()" >play (x) pause</button>
</div>

  `,
  styleUrls: ['./video.component.sass'],
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;

  // See options: https://videojs.com/guides/options
  options = { autoplay: true, controls: true, sources: [{ src: 'http://localhost:8081/api/videos/2', type: 'video/mp4' }] };

  player!: Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady');
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  togglePlay() {
    this.player.play();
  }
}
