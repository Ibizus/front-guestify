import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invitation, Wedding } from '../../utils/types';
import { InvitationService } from '../../services/invitation.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {

  invitationDto: any = {
    id: null,
    name: null,
    email: null,
    accepted: null,
    allergies: null,
    weddingId: null,
    guestId: null,
  };

  id!: any;
  selectedInvitation!: Invitation;
  selectedWedding!: Wedding;

  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('Id extraido de la url: ', this.id);

    this.getInvitation(this.id);
    console.log('Invitacion encontrada: ', this.selectedInvitation);

    //this.selectedWedding = this.selectedInvitation.wedding;
    console.log('Boda encontrada con id: ', this.selectedInvitation.weddingId);
  }

  getInvitation(id: number){
    this.invitationService.getInvitationById(id).subscribe({
      next: (data) => {
        console.log('Recibiendo respuesta del http request: ', data);
        this.selectedInvitation = data;
      },
      error: (error) => {console.error(error)},
    });
  }

  getWeddingFromInvitation(id: number){

  }

}
