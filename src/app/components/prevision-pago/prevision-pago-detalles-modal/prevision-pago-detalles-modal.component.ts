import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'app-prevision-pago-detalles-modal',
  templateUrl: './prevision-pago-detalles-modal.component.html',
})
export class PrevisionPagoDetallesModalComponent {
  @Input() prevision!: any;  
  @Output() cerrar = new EventEmitter<void>();  

  constructor() {}

  ngOnInit(): void {}
  cerrarModal() {
    this.cerrar.emit();
  }
}
