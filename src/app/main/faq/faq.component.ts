import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { Tab } from '../../utils/types';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'faq-component',
  standalone: true,
  imports: [AccordionModule],
  providers: [NgModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  tabs!: Tab[];
  lastIndex: number = -1;

  constructor(
    private faqService: FaqService){}

  ngOnInit(){
    this.getFaqs();
  }

  getFaqs(){
    this.faqService.getFaqs().subscribe({
      next: (data) => {
        this.tabs = data;
      },
      error: (error) => {console.error(error)},
    });
  }
  
  toggleOpen(id: number) {
    if(id!=this.lastIndex && this.lastIndex>0){
      this.tabs[this.lastIndex - 1].visible = false;
    }
    if (this.tabs[id - 1].id === id) {
      this.tabs[id - 1].visible = !this.tabs[id - 1].visible;
      this.lastIndex = id;
    }
  }

  // tabs: Tab[] = [
  //   {
  //     id: 1,
  //     title: '1. ¿Cómo funciona la gestión de invitados?',
  //     content: "Nuestro servicio de gestión de invitados te permite agregar, editar y organizar la lista de invitados de manera sencilla. Puedes enviar invitaciones digitales, realizar un seguimiento de las confirmaciones de asistencia (RSVP), y asignar asientos para la ceremonia y la recepción. Todo esto desde una interfaz intuitiva y fácil de usar.",
  //     visible: false,
  //   },
  //   {
  //     id: 2,
  //     title: '2. ¿Puedo personalizar el diseño de mi página de boda?',
  //     content: "Sí, ofrecemos varias plantillas de diseño que puedes personalizar para que coincidan con el estilo y el tema de tu boda. Puedes agregar tus fotos, cambiar colores y fuentes, y añadir secciones adicionales según tus necesidades. Queremos que tu página de boda sea única y refleje tu personalidad.",
  //     visible: false,
  //   },
  //   {
  //     id: 3,
  //     title: '3. ¿Es seguro utilizar su plataforma?',
  //     content: "La seguridad de tus datos es nuestra máxima prioridad. Utilizamos cifrado SSL para proteger toda la información que se transmite a través de nuestra plataforma. Además, tenemos políticas estrictas de privacidad para garantizar que tus datos personales y los de tus invitados estén protegidos en todo momento.",
  //     visible: false,
  //   },
  //   {
  //     id: 4,
  //     title:
  //       '4. ¿Puedo realizar cambios en la lista de invitados una vez enviada la invitación?',
  //     content: "Sí, puedes realizar cambios en la lista de invitados y en la organización de tu boda en cualquier momento. Nuestra plataforma está diseñada para ser flexible y adaptable a tus necesidades. Los cambios se actualizan automáticamente, y tus invitados recibirán notificaciones de cualquier modificación importante, asegurando que todos estén al tanto.",
  //     visible: false,
  //   },
  //   {
  //     id: 5,
  //     title: '5. ¿Puedo integrar mi cuenta con redes sociales?',
  //     content: "Sí, ofrecemos integración con varias redes sociales para facilitar la comunicación y la compartición de información sobre tu boda. Puedes sincronizar tu cuenta con plataformas como Facebook, Instagram y Twitter, permitiendo que tus invitados compartan fotos y momentos especiales usando hashtags personalizados. Esto también ayuda a mantener a todos informados y entusiasmados con los detalles de tu gran día.",
  //     visible: false,
  //   },
  //   {
  //     id: 6,
  //     title: '6. ¿Ofrecen soporte técnico?',
  //     content: "Sí, ofrecemos soporte técnico para ayudarte en cualquier etapa de tu planificación. Nuestro equipo de soporte está disponible por correo electrónico, chat en vivo y teléfono para resolver cualquier problema o responder a cualquier pregunta que puedas tener. Queremos asegurarnos de que tu experiencia sea lo más fluida y agradable posible.",
  //     visible: false,
  //   },
  // ];
}