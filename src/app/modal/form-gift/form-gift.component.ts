import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Gift } from '../../utils/types';
import { GiftService } from '../../services/gift.service';
import { Subscription } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';  
import { ToastService } from '../../services/toast.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-gift',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    CommonModule,
    DialogModule,
    ToastModule
  ],
  providers: [
    MessageService, 
    ToastService
  ],
  templateUrl: './form-gift.component.html',
  styleUrl: './form-gift.component.scss'
})
export class FormGiftComponent {

  isModalOpen: boolean = false;
  @Input() goToModify: EventEmitter<any> = new EventEmitter();
  @Output() tellParentChangesWereMade: EventEmitter<any> = new EventEmitter();
  temporalGift: Gift = newGift();
  formGift: Gift = newGift();
  routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private giftService: GiftService,
    private toastService: ToastService
  ){
    this.storageService.currentItem.subscribe((gift: Gift | null)=> {
      console.log("El regalo recibido del service es: ", gift);

      if(gift != null){
        this.temporalGift.id = gift.id;
        this.temporalGift.name = gift.name;
        this.temporalGift.selected = gift.selected;
      }
    });

    if(!!this.temporalGift){
      this.formGift = this.temporalGift;
      console.log("FormGift relleno con lo recibido del service: ", this.formGift);
    }
  }

  ngOnInit() {
    console.log("Incializando componente hijo FormGift");

    this.goToModify.subscribe(() =>{ 
      console.log("Recibiendo aviso para editar regalo ");

      console.log("Abriendo modal en onInit");
      this.toggleModal();
    })

    // this.routerSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     // Navigation started, reset form
    //     this.clearFormFields();
    //   }
    // });
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  clearFormFields() {
    this.storageService.saveItemForChanges(null);
    this.formGift.id = 0;
    this.formGift.name = '';
    this.formGift.selected = false;
    console.log("Abriendo modal en clearFormFields");
    this.toggleModal();
    this.router.navigate(['/gifts']);
  }

  acceptChanges() {
    console.log('Mandando evento a padre para que actualice tabla');
    // this.tellParentChangesWereMade.emit();
  }

  onSubmit() {
    if (this.temporalGift.id > 0) {
      this.giftService.modifyGift(this.formGift).subscribe({
        next: ()=>{
          console.log("Gift modified by this: ", this.formGift);
          this.tellParentChangesWereMade.emit();
          sleep(500).then(() => {
            this.toastService.success(
              'El regalo ' +
              this.temporalGift.name +
              ' ha sido modificado correctamente!'
            );
          });
        },
        error: (error) =>{
          this.toastService.error(error);
        }
      })
    }else{
      let selectedWeddingId = this.storageService.getWeddingId();
      this.giftService.createGift(selectedWeddingId, this.formGift).subscribe({
        next: ()=>{
          this.tellParentChangesWereMade.emit();
          sleep(500).then(() => {
            this.toastService.success(
              'El regalo ' +
                this.formGift.name +
                ' se ha creado correctamente!'
            );
          });
        },
        error: (error) =>{
          this.toastService.error(error);
        }
      })
    }
    console.log("Cerrando modal en onSubmit");
    this.clearFormFields();
    // this.toggleModal();
  }
}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function newGift(): Gift {
  return {
    id: 0,
    name: '',
    selected: false
  };
}
