import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'gumelar',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin2023'),
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
      name: 'Kaos one pice luffy',
      slug: `one-pice-1`,
      category: 'one pice',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 0,
      brand: 'distro',
      rating: 4.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
    {
      //_id: '2',
      name: 'kaos anya forger',
      slug: 'spy-x-familly-1',
      category: 'spy x familly',
      image: '/images/p2.jpg',
      price: 65,
      countInStock: 10,
      brand: 'distro',
      rating: 4.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
    {
      //_id: '3',
      name: 'Kaos child luffy',
      slug: 'one-pice-2',
      category: 'one pice',
      image: '/images/p3.jpg',
      price: 120,
      countInStock: 10,
      brand: 'distro',
      rating: 4.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
    {
      //_id: '4',
      name: 'Kaos Error 404',
      slug: 'anime-error',
      category: 'anime',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 10,
      brand: 'distro',
      rating: 4.5,
      numReviews: 10,
      description: 'hight quality shirt ',
    },
  ],
};

export default data;
