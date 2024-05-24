import { Time } from "@angular/common";

interface User {
    id: number;
    name: string;
    surname: string;
    surname2: string;
    address: string;
    address2: string;
    postalCode: string;
    city: string;
    region: string;
    idNumber: string;
    email: string;
    phone: string;
}

interface Invitation {
    id: number;
    name: string;
    email: string;
    accepted: boolean;
    allergies: string;
    wedding: Wedding;
    guest: Guest;
}

interface Guest {
    id: number;
    name: string;
    surname1: string;
    surname2: string;
    email: string;
    phone: string;
    invitation: Invitation;
}

interface Gift {
    id: number;
    name: string;
    selected: boolean;
}

interface WedEvent {
    id: number;
    place: string;
    description: string;
    time: Time;
}

interface Menu {
    id: number;
    name: string;
    starter: string;
    main: string;
    dessert: string;
}

interface Task {
    id: number;
    description: string;
    deathLine: Date;
    done: boolean;
}

interface Picture {
    id: number;
    name: string;
}

interface Wedding {
    id: number;
    name: string;
    date: Date;
    time: Time;
    nameCouple1: string;
    nameCouple2: string;
    address: string;
    address2: string;
    postalCode: string;
    city: string;
    region: string;
    events: WedEvent[];
    tasks: Task[];
    menus: Menu[];
    invitations: Invitation[];
    gifts: Gift[];
    pictures: Picture[];
}
interface Tab {
    id: number;
    title: string;
    content: string;
    visible: boolean;
  }

export {
    User,
    Invitation,
    Guest,
    Gift,
    WedEvent,
    Menu,
    Task,
    Picture,
    Wedding,
    Tab
}