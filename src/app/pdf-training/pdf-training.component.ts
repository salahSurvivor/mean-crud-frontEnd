import { Component } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-training',
  templateUrl: './pdf-training.component.html',
  styleUrls: ['./pdf-training.component.css']
})
export class PdfTrainingComponent {
  previewUrl: string;

  generatePDF(){
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    //doc.save('save.pdf');
    const pdfDataUri = doc.output('datauristring');
    const newWindow = window.open();
    newWindow.document.write('<iframe src="' + pdfDataUri + '" width="100%" height="100%"></iframe>');
  }
}
