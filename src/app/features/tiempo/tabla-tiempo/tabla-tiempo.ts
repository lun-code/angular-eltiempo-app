import { Component, inject, signal, computed } from '@angular/core';
import { TiempoService } from '../../../core/services/tiempo-service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prediccion } from '../../../core/models/prediccion';
import { Municipio } from '../../../core/models/municipio';

@Component({
  selector: 'app-tabla-tiempo',
  imports: [DatePipe, FormsModule],
  templateUrl: './tabla-tiempo.html',
  styleUrl: './tabla-tiempo.css',
})
export class TablaTiempo {
  private tiempoService = inject(TiempoService);

  tiempo = signal<Prediccion | null>(null);
  cargando = signal(true);
  error = signal<string | null>(null);

  // Selector de municipio
  municipios = signal<Municipio[]>([]);
  busqueda = signal('');
  municipioSeleccionado = signal<Municipio | null>(null);
  selectorAbierto = signal(false);

  private normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  sugerencias = computed(() => {
    const q = this.normalizar(this.busqueda().trim());
    if (!q || q.length < 2) return [];
    return this.municipios()
      .filter(m => this.normalizar(m.nombre).includes(q))
      .slice(0, 8);
  });

  ngOnInit() {
    this.tiempoService.getMunicipios().subscribe({
      next: lista => this.municipios.set(lista),
    });

    this.cargarMunicipio({ id: 'id30030', nombre: 'Murcia', codigoMunicipio: '30030' });
  }

  cargarMunicipio(m: Municipio) {
    this.municipioSeleccionado.set(m);
    this.busqueda.set(m.nombre);
    this.selectorAbierto.set(false);
    this.cargando.set(true);
    this.error.set(null);
    this.tiempo.set(null);

    this.tiempoService.getTiempo(m.codigoMunicipio).subscribe({
      next: datos => {
        this.tiempo.set(datos[0]);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los datos del municipio');
        this.cargando.set(false);
      },
    });
  }

  onBusquedaChange(valor: string) {
    this.busqueda.set(valor);
    this.selectorAbierto.set(true);
  }

  cerrarSelector() {
    setTimeout(() => this.selectorAbierto.set(false), 150);
  }
}