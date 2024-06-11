import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invitation, Wedding } from '../../utils/types';
import { InvitationService } from '../../services/invitation.service';
import { WeddingService } from '../../services/wedding.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {

  // invitationDto: any = {
  //   id: null,
  //   name: null,
  //   email: null,
  //   accepted: null,
  //   allergies: null,
  //   weddingId: null,
  //   guestId: null,
  // };

  id!: any;
  selectedInvitation!: Invitation;
  selectedWedding!: Wedding;

  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService,
    private weddingService: WeddingService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getInvitation(this.id);
  }

  getInvitation(id: number){
    this.invitationService.getInvitationById(id).subscribe({
      next: (data) => {
        this.selectedInvitation = data;
        this.getWeddingById(this.selectedInvitation.weddingId);
      },
      error: (error) => {console.error(error)},
    });
  }

  getWeddingById(id: number){
    this.weddingService.getWeddingById(id).subscribe({
      next: (data) => {
        console.log('Recibiendo boda del http request: ', data);
        this.selectedWedding = data;
      },
      error: (error) => {console.error(error)},
    })
  }

}
