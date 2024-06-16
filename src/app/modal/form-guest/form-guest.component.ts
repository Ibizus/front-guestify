import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { GuestsComponent } from '../../pages/guests/guests.component';
import { InvitationService } from '../../services/invitation.service';
import { Invitation } from '../../utils/types';

@Component({
  selector: 'app-form-guest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    CommonModule
  ],
  templateUrl: './form-guest.component.html',
  styleUrl: './form-guest.component.scss'
})
export class FormGuestComponent {

  isModalOpen: boolean = false;
  @Input() goToModify: EventEmitter<any> = new EventEmitter();
  @Output() tellParentChangesWereMade: EventEmitter<any> = new EventEmitter();
  temporalInvitation: Invitation = newInvitation();
  formInvitation: Invitation = newInvitation();
  routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private invitationService: InvitationService,
    //private toastService: ToastService
  ){
    this.storageService.currentItem.subscribe((invitation: Invitation | null)=> {
      console.log("La invitacion recibida del service es: ", invitation);

      if(invitation != null){
        this.temporalInvitation.id = invitation.id;
        this.temporalInvitation.name = invitation.name;
        this.temporalInvitation.email = invitation.email;
        this.temporalInvitation.accepted = invitation.accepted;
        this.temporalInvitation.allergies = invitation.allergies;
      }
    });

    if(!!this.temporalInvitation){
      this.formInvitation = this.temporalInvitation;
      console.log("FormInvitation relleno con lo recibido del service: ", this.formInvitation);
    }
  }

  ngOnInit() {
    console.log("Incializando componente hijo FormGuest");

    this.goToModify.subscribe(() =>{ 
      console.log("Recibiendo aviso para editar regalo ");

      console.log("Abriendo modal en onInit");
      this.toggleModal();
    })
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  clearFormFields() {
    this.storageService.saveItemForChanges(null);
    this.formInvitation.id = 0;
    this.formInvitation.name = '';
    this.formInvitation.email = '';
    this.formInvitation.accepted = false;
    this.formInvitation.allergies = '';
    console.log("Abriendo modal en clearFormFields");
    this.toggleModal();
    this.router.navigate(['/guests']);
  }

  acceptChanges() {
    console.log('Mandando evento a padre para que actualice tabla');
    // this.tellParentChangesWereMade.emit();
  }

  onSubmit() {
    if (this.temporalInvitation.id > 0) {
      this.invitationService.modifyInvitation(this.formInvitation).subscribe({
        next: ()=>{
          console.log("Invitation modified by this: ", this.formInvitation);
          // this.toastService.success(
          //   'El regalo ' +
          //     this.temporalInvitation?.name +
          //     ' ha sido modificado correctamente!'
          // );
          this.tellParentChangesWereMade.emit();
        },
        error: (error) =>{
          // this.toastService.error(error);
        }
      })
    }else{
      let selectedWeddingId = this.storageService.getWeddingId();
      this.invitationService.createInvitation(selectedWeddingId, this.formInvitation).subscribe({
        next: ()=>{
          // this.toastService.success(
          //   'El regalo ' +
          //     this.formInvitation?.name +
          //     ' se ha creado correctamente!'
          // );
          this.tellParentChangesWereMade.emit();
        },
        error: (error) =>{
        //   this.toastService.error(error);
        }
      })
    }
    console.log("Abriendo modal en onSubmit");
    this.toggleModal();
  }


}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function newInvitation(): Invitation {
  return {
    id: 0,
    name: '',
    email: '',
    accepted: false,
    allergies: '',
    weddingId: 0,
    guestId: 0,
  };
}

