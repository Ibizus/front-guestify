import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
// import { Wedding } from '../../utils/types';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  @Input() userWeddings!:any[];
  private router: Router = new Router();

  constructor(
    private storageService: StorageService
  ){}

  onSelectWedding(id: number) {
    this.storageService.saveSelectedWedding(id);
    this.router.navigate(['/dashboard/guests']);
  }

}
