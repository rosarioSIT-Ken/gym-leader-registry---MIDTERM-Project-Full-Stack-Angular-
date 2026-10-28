import { Component, ElementRef, afterNextRender, inject, output, signal } from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.css',
  host: {
    role: 'button',
    tabindex: '0',
    '[class.leaving]': 'leaving()',
    '(click)': 'next()',
    '(keydown.enter)': 'next()',
    '(keydown.space)': 'next()'
  }
})
export class Intro {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);


  stage = signal(1);
  leaving = signal(false);
  finished = output<void>();


  private focusOnLoad = afterNextRender(() => this.el.nativeElement.focus());

  next(): void {
    if (this.stage() === 1) {
      this.stage.set(2);
      return;
    }
    if (!this.leaving()) {
      this.leaving.set(true);
      setTimeout(() => this.finished.emit(), 800);
    }
  }
}