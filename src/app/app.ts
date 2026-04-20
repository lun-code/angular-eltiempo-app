import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablaTiempo } from './features/tiempo/tabla-tiempo/tabla-tiempo'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TablaTiempo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-eltiempo-app');
}
