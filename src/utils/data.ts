interface LoginData {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  zipcode: number;
  result?: 'products' | 'locked_out' | 'wrong_credentials' | 'username_required' | 'password_required';
}

export const loginData: LoginData[] = [
  { username: 'standard_user', password: 'secret_sauce', firstname: 'John', lastname: 'Doe', zipcode: 12345, result: 'products' },
  { username: 'problem_user', password: 'secret_sauce', firstname: 'Jane', lastname: 'Smith', zipcode: 54321, result: 'products' },
  { username: 'performance_glitch_user', password: 'secret_sauce', firstname: 'Alice', lastname: 'Johnson', zipcode: 67890, result: 'products' },
  { username: 'error_user', password: 'secret_sauce', firstname: 'Bob', lastname: 'Brown', zipcode: 11223, result: 'products' },
  { username: 'visual_user', password: 'secret_sauce', firstname: 'Carol', lastname: 'Davis', zipcode: 44556, result: 'products' },
  { username: 'locked_out_user', password: 'secret_sauce', firstname: 'Dan', lastname: 'Wilson', zipcode: 78901, result: 'locked_out' },
  { username: 'standard_user', password: 'test123', firstname: 'Eva', lastname: 'Taylor', zipcode: 23456, result: 'wrong_credentials' },
  { username: '', password: 'secret_sauce', firstname: 'Frank', lastname: 'Anderson', zipcode: 34567, result: 'username_required' },
  { username: 'standard_user', password: '', firstname: 'Grace', lastname: 'Thomas', zipcode: 45678, result: 'password_required' }
];

export const validLoginData: LoginData[] = [
  { username: 'standard_user', password: 'secret_sauce', firstname: 'John', lastname: 'Doe', zipcode: 12345},
  { username: 'problem_user', password: 'secret_sauce', firstname: 'Jane', lastname: 'Smith', zipcode: 54321},
  { username: 'performance_glitch_user', password: 'secret_sauce', firstname: 'Alice', lastname: 'Johnson', zipcode: 67890},
  { username: 'error_user', password: 'secret_sauce', firstname: 'Bob', lastname: 'Brown', zipcode: 11223},
  { username: 'visual_user', password: 'secret_sauce', firstname: 'Carol', lastname: 'Davis', zipcode: 44556}
];


export const productsNames: string[] = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
  'sauce-labs-fleece-jacket',
  'sauce-labs-onesie',
  'test.allthethings()-t-shirt-(red)'
]

export interface Product {
  name: string
  description: string
  price: string
  idItem: number
}

export const productsDetails: Product[] = [
  {
    "name": "Sauce Labs Backpack",
    "description": "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    "price": "$29.99",
    "idItem": 4,

  },
  {
    "name": "Sauce Labs Bike Light",
    "description": "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    "price": "$9.99",
    "idItem": 0,

  },
  {
    "name": "Sauce Labs Bolt T-Shirt",
    "description": "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    "price": "$15.99",
    "idItem": 1,

  },
  {
    "name": "Sauce Labs Fleece Jacket",
    "description": "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    "price": "$49.99",
    "idItem": 5,

  },
  {
    "name": "Sauce Labs Onesie",
    "description": "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    "price": "$7.99",
    "idItem": 2,

  },
  {
    "name": "Test.allTheThings() T-Shirt (Red)",
    "description": "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
    "price": "$15.99",
    "idItem": 3,
  }
] 