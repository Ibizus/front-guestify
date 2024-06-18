import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
// import { Wedding } from '../../utils/types';
import { StorageService } from '../../services/storage.service';
import { IconFieldModule } from 'primeng/iconfield';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    NgClass,
    InputIconModule,
    IconFieldModule,
    TooltipModule,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  @Input() userWeddings!:any[];
  private router: Router = new Router();
  selectedWeddingId!: number;

  constructor(
    private storageService: StorageService
  ){}

  onSelectWedding(id: number) {
    this.storageService.saveSelectedWedding(id);
    this.selectedWeddingId = id;
    console.log('selectedWeddingId saved: ', this.selectedWeddingId)
    this.router.navigate(['/dashboard/guests']);
  }

  // Method to implement search bar
  onInputChange($event: Event) {
    throw new Error('Method not implemented.');
  }

}import { InputIconModule } from 'primeng/inputicon';