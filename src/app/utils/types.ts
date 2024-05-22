interface User {
    '@id': number;
    id: number;
    name: string;
    surname: string;
    idNumber: string;
    phone: string;
    email: string;
}

interface Invitation {
    id: number;
    name: string;
    email: string;
}

interface Guest {
    id: number;
    name: string;
    email: string;
}

export {
    User,
    Invitation,
    Guest
}