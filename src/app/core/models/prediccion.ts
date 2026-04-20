export interface Dia {
  fecha: string;
  temperatura: { maxima: number; minima: number; };
  sensTermica: { maxima: number; minima: number; };
  humedadRelativa: { maxima: number; minima: number; };
  estadoCielo: Array<{ value: string; descripcion: string; periodo?: string; }>;
  probPrecipitacion: Array<{ value: number; periodo?: string; }>;
  viento: Array<{ direccion: string; velocidad: number; periodo?: string; }>;
  uvMax?: number;
}

export interface Prediccion {
  nombre: string;
  provincia: string;
  elaborado: string;
  prediccion: {
    dia: Dia[];
  };
}