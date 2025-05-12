import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prevision-pago-detalles-modal',
  templateUrl: './prevision-pago-detalles-modal.component.html',
  standalone: false
})
export class PrevisionPagoDetallesModalComponent {
  @Input() prevision: any = null;
  @Input() modalAbierto: boolean = false;
  @Output() cerrarModalEvent = new EventEmitter<void>();

  cerrarModal() {
    this.cerrarModalEvent.emit();
  }
}