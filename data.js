import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'gumelar',
      email: 'admin@example.com',
      password: bcrypt.hashSync('07032023'),
      isAdmin: true,
    },
    {
      name: 'users',
      email: 'users@example.com',
      password: bcrypt.hashSync('07032023'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: '1',
      name: 'Nike Slime shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirt',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 0,
      brand: 'Nike',
      rating: 1.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
    {
      //_id: '2',
      name: 'Adidas Fit shirt',
      slug: 'adidas-fit-shirt',
      category: 'shirt',
      image: '/images/p2.jpg',
      price: 65,
      countInStock: 10,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
    {
      //_id: '3',
      name: 'Nike Slime pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image: '/images/p3.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
    {
      //_id: '4',
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 10,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
  ],
};

export default data;
