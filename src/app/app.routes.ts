import { Routes } from '@angular/router';
import { LandingComponent } from './main/landing/landing.component';
import { RegisterComponent } from './main/register/register.component';
import { ToolsComponent } from './main/tools/tools.component';
import { LoginComponent } from './main/login/login.component';
import { AboutComponent } from './main/about/about.component';
import { FaqComponent } from './main/faq/faq.component';
import { ContactComponent } from './main/contact/contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestsComponent } from './pages/guests/guests.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { PicturesComponent } from './pages/pictures/pictures.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { TodosComponent } from './pages/todos/todos.component';
import { canActivate } from './main/security/authguard';
import { InvitationComponent } from './main/invitation/invitation.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { NotfoundComponent } from './main/notfound/notfound.component';
import { NeweventComponent } from './main/newevent/newevent.component';

export const routes: Routes = [
    {path: "home", component: LandingComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: "tools", component: ToolsComponent},
    {path: "about", component: AboutComponent},
    {path: "faq", component: FaqComponent},
    {path: "contact", component: ContactComponent},
    {path: "guests", component: GuestsComponent},
    {path: "invitation/:id", component: InvitationComponent},
    {path: "notfound", component: NotfoundComponent},    
    {path: "newevent", component: NeweventComponent},    
    {
        path: "dashboard", 
        component: DashboardComponent,
        children: [
            {path: "overview", component: OverviewComponent},
            {path: "guests", component: GuestsComponent},
            {path: "gifts", component: GiftsComponent},
            {path: "pictures", component: PicturesComponent},
            {path: "planning", component: PlanningComponent},
            {path: "todos", component: TodosComponent}
        ]
    },
    {path: "", pathMatch: "full", redirectTo: "home"}
];
