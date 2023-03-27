export class Address {
  street = '';
  city = '';
}

export class User {
  id = 0;
  name = '';
  email = '';
  address: Address[] = [];
}

export const user: User[] = [
  {
    id: 1,
    name: 'Linh',
    email: 'dtnlinh@gmail.com',
    address: [
      {
        street: 'Dinh Tien Hoang',
        city: 'HCM',
      },
      {
        street: 'Au Co',
        city: 'HCM',
      },
    ],
  },
  {
    id: 2,
    name: 'Vu',
    email: 'nguyenvu@gmail.com',
    address: [
      {
        street: 'Xa doi 61',
        city: 'Dong Nai',
      },
      {
        street: 'Au Co',
        city: 'HCM',
      },
    ],
  },
];
export const cities = ['HCM', 'Dong Nai', 'Ha Noi'];
