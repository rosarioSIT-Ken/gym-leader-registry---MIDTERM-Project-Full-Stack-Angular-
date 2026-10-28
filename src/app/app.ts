import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Intro } from './components/intro/intro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Intro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  showIntro = signal(!this.introSeen());

  onIntroDone(): void {
    this.showIntro.set(false);
    try {
      sessionStorage.setItem('introSeen', 'yes');
    } catch {
 
    }
  }

  private introSeen(): boolean {
    try {
      return sessionStorage.getItem('introSeen') === 'yes';
    } catch {
      return false;
    }
  }
}