import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GuestsComponent } from '../guests/guests.component';
import { GiftsComponent } from '../gifts/gifts.component';
import { PicturesComponent } from '../pictures/pictures.component';
import { PlanningComponent } from '../planning/planning.component';
import { TodosComponent } from '../todos/todos.component';
import { StorageService } from '../../services/storage.service';
// import { Wedding } from '../../utils/types';
import { WeddingService } from '../../services/wedding.service';
import { OverviewComponent } from "../overview/overview.component";
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        GuestsComponent,
        GiftsComponent,
        PicturesComponent,
        PlanningComponent,
        TodosComponent,
        OverviewComponent,
        NgClass
    ]
})
export class DashboardComponent implements OnInit{

  userId!:number;
  userWeddings!:any[];
  selectedWeddingId!: number;
  isAnyWeddingSelected: boolean = false;
  private router: Router = new Router();

  constructor(
    private storageService: StorageService,
    private weddingService: WeddingService
){}

  ngOnInit(){
    console.log('inicializando dashboard component');

    this.userId = this.storageService.getUser().id;
    console.log('user id recuperado de storageService', this.userId)

    if(!!this.userId){
      // If there is a user try to find its weddings:
      this.weddingService.getWeddingsByUserId(this.userId).subscribe({
        next: (data) => {
            console.log(data);
            this.userWeddings = data.weddings;

            // If no weddings created redirects to notfound:
            if(this.userWeddings.length <= 0){
              console.log('Redireccionando a bodas no encontradas')
              this.router.navigate(['/notfound']);
            }else{
              this.selectedWeddingId = this.storageService.getWeddingId();
              if(this.selectedWeddingId>=0){
                this.isAnyWeddingSelected = true;
              }
            }
        },
        error: (err) => {
            console.log('No wedding found by user id: ', err)
        },
      })
    }else{
      // If no user redirects to home:
      console.log('Redireccionando a home')
      this.router.navigate(['/home']);
    }
  }
 
}
