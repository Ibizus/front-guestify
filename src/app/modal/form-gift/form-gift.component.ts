import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Gift } from '../../utils/types';
import { GiftService } from '../../services/gift.service';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-form-gift',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    CommonModule
  ],
  templateUrl: './form-gift.component.html',
  styleUrl: './form-gift.component.scss'
})
export class FormGiftComponent {

  isModalOpen: boolean = true;
  @Input() goToModify: EventEmitter<any> = new EventEmitter();
  temporalGift!: Gift | null;
  formGift: Gift = {
    id: 0,
    name: '',
    selected: false
  }
  routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private giftService: GiftService,
    //private toastService: ToastService
  ){
    this.storageService.currentItem.subscribe((gift) => {
      console.log("El regalo recibido del service es: ", gift);
      this.temporalGift = gift;
    });

    if(!!this.temporalGift){
      this.formGift = this.temporalGift;
    }
  }

  ngOnInit() {
    this.goToModify.subscribe(() =>{ 
      console.log("Recibiendo aviso para editar regalo ");

      this.isModalOpen = true;
    })

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Navigation started, reset form
        this.clearFormFields();
      }
    });
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    // const modal = document.getElementById('crud-modal');
    // modal?.classList.toggle('hidden');
    // modal?.classList.toggle('flex');
  }

  clearFormFields() {
    this.storageService.saveItemForChanges(null);
    this.formGift.id = 0;
    this.formGift.name = '';
    this.formGift.selected = false;
    this.toggleModal();
    this.router.navigate(['/gifts']);
  }



  onSubmit() {
    if (!!this.temporalGift) {
      this.giftService.modifyGift(this.formGift).subscribe({
        next: ()=>{
          // this.toastService.success(
          //   'El regalo ' +
          //     this.temporalGift?.name +
          //     ' ha sido modificado correctamente!'
          // );
          sleep(1000).then(() => {
            this.router.navigate(['/gifts']);
          });
        },
        error: (error) =>{
          // this.toastService.error(error);
        }
      })
    }else{

      this.giftService.createGift(this.formGift).subscribe({
        next: ()=>{
          // this.toastService.success(
          //   'El regalo ' +
          //     this.formGift?.name +
          //     ' se ha creado correctamente!'
          // );
          sleep(1000).then(() => {
            this.router.navigate(['/gifts']);
          });
        },
        error: (error) =>{
        //   this.toastService.error(error);
        }
      })
    }
    this.toggleModal();
  }

  
}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
