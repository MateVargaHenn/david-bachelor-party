import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonList, IonItem, IonContent, IonTitle, IonGrid, IonRow, IonHeader, IonInput, PopoverController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-custom-popover',
  templateUrl: './custom-popover.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, IonInput, IonHeader, IonRow, IonGrid, IonTitle, IonContent, IonButton, IonList, IonItem, NgForOf, NgIf],
  styleUrls: ['./custom-popover.component.scss'],
})
export class CustomPopoverComponent  implements OnInit {
  fg!: FormGroup;
  codeIsAnswered: boolean = false;
  help: boolean = false;
  @Input() options: any = {id: '', title: '', description: '', help: '', correctAnswer: '' };
  constructor(private fb: FormBuilder, private popoverController: PopoverController) {
    this.fg = this.fb.group({
      answer: [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    const answer = this.fg.controls['answer'].value;
    this.popoverController.dismiss(answer);
  }
  showHelp() {
    this.help = true;
  }
}
