import { Component, inject, signal } from '@angular/core';
import { TiempoService } from '../../../core/services/tiempo-service';
import { DatePipe } from '@angular/common';
import { Prediccion } from '../../../core/models/prediccion';

@Component({
  selector: 'app-tabla-tiempo',
  imports: [DatePipe],
  templateUrl: './tabla-tiempo.html',
  styleUrl: './tabla-tiempo.css',
})
export class TablaTiempo {

  private tiempoService = inject(TiempoService);

  tiempo = signal<Prediccion | null>(null);
  cargando = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.tiempoService.getTiempo().subscribe({
      next: (datos) => {
        this.tiempo.set(datos[0]);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los datos');
        this.cargando.set(false);
      }
    });
  }
}
