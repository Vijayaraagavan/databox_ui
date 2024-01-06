import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div id="video-container" style="max-width: 720px; max-height: 520px;">
      <video
        id="video-el"
        controls
        #target
        class="vjs-fill"
        preload="auto"
        style="width: 100%; height: 100%; position: relative;"
      >
        <source src="http://localhost:8081/api/videos/2" type="video/mp4" />
        <source src="http://localhost:8081/api/videos/2" type="video/mkv" />
        Your browser does not support the video tag.
      </video>
      <div id="control-bar" class="control-bar d-flex">
        <div id="mode-controller">
          <button (click)="skipByValue(-10)" class="btn ">
            <img
              src="assets/custom_icons/skip_back.svg"
              class="btn-icon"
              alt="skip back"
            />
          </button>
          <button *ngIf="!videoState.playing" class="btn">
            <i class="bi bi-play-fill text-white" (click)="togglePlay(1)"></i>
          </button>
          <button *ngIf="videoState.playing" class="btn">
            <i class="bi bi-pause-fill text-white" (click)="togglePlay(2)"></i>
          </button>
          <button (click)="skipByValue(10)" class="btn ">
            <img
              src="assets/custom_icons/skip_forward.svg"
              class="btn-icon"
              alt="skip back"
            />
          </button>
        </div>
        <div class="flex-grow-1"></div>
        <div id="screen-controller">
          <button class="btn text-white" (click)="toggleFull()">
            <i class="bi bi-fullscreen"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./video.component.sass'],
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;
  videoState = {
    playing: false,
  };

  // See options: https://videojs.com/guides/options
  options = {
    fill: true,
    controlBar: {
      playToggle: true,
      volumePanel: true,
      currentTimeDisplay: true,
      timeDivider: true,
      durationDisplay: true,
      progressControl: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true,
    },
    sources: [{ src: 'http://192.168.0.100:8081/api/videos/2', type: 'video/mp4' }],
  };

  player!: Player;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady');
        
      }
    );
    var customElement = document.getElementById('control-bar');
    if (customElement) {
      this.player.el().appendChild(customElement);
    }
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  togglePlay(mode: number) {
    if (mode == 1) {
      this.player.play();
    } else if (mode == 2) {
      this.player.pause();
    }
    this.videoState.playing = this.isVideoPlaying();
    this.cdr.detectChanges();
  }
  isVideoPlaying() {
    return !this.player.paused() && !this.player.ended();
  }

  skipByValue(value: number) {
    const current: number | undefined = this.player.currentTime();
    if (current) {
      this.player.currentTime(current + value);
    }
  }

  toggleFull() {
    this.player.isFullscreen();
    if (this.player.isFullscreen()) {
      this.player.exitFullscreen()
    } else {
      this.player.requestFullscreen()
    }
  }
}
