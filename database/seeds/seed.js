// Bcrypted string for password: 123456
const password = '$2a$08$AG0JJ5WquAZFbmuTClhSoeDc8NIXs30y5JS17.T.F.zD7HNdAuyNa';

const users = [
  {
    id: 1,
    email: 'admin1@mail.com',
    password,
    firstName: 'Test',
    lastName: 'Admin',
    role: 'admin',
    createdAt: new Date()
  },
  {
    id: 2,
    email: 'user2@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 2',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 3,
    email: 'user3@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 3',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 4,
    email: 'user4@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 4',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 5,
    email: 'user5@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 5',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 6,
    email: 'user6@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 6',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 7,
    email: 'user7@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 7',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 8,
    email: 'user8@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 8',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 9,
    email: 'user9@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 9',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 10,
    email: 'user10@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 10',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: 11,
    email: 'user11@mail.com',
    password,
    firstName: 'Test',
    lastName: 'User 11',
    role: 'user',
    createdAt: new Date()
  }
];

const events = [
  {
    id: 1,
    title: 'Тедді',
    address: 'Рівне, вул. Корольова, 3',
    shortDescription: 'Християнські заняття з дітьми.',
    description: '<strong>Дошкільний розвиток дітей оснований на християнських засадах...</strong>',
    date: '2020-01-25',
    startedAt: '10:00:00',
    finishedAt: '15:00:00',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: '25 років з дня відкриття церкви.',
    address: 'Рівне, вул. Корольова, 3',
    shortDescription: 'Святкове служіння присвячене 25-річчю церкви.',
    description: '<strong>Святкове</strong> служіння присвячене 25-річчю церкви. Запрошені перші пастори церкви...',
    date: '2020-01-26',
    startedAt: '12:00:00',
    finishedAt: '15:00:00',
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'Весілля',
    address: 'Рівне, вул. Корольова, 3',
    shortDescription: 'Служіння разом з вінчанням.',
    description: '<strong>Вінчання наших друзів...</strong>',
    date: '2020-01-28',
    startedAt: '10:00:00',
    finishedAt: '17:00:00',
    createdAt: new Date(),
  },
  {
    id: 4,
    title: 'Дитяче служіння',
    address: 'Рівне, вул. Корольова, 3',
    shortDescription: 'Служіння за участі дітей.',
    description: '<p>І <strong>Він</strong> їх навчав по їхніх синагогах, і всі Його славили. І прибув Він до Назарету, де був вихований. ' + 
    'І звичаєм Своїм Він прийшов дня суботнього до синагоги, і встав, щоб читати. І подали Йому книгу пророка Ісаї. ' +
    'Розгорнувши ж Він книгу, знайшов місце, де було так написано:  На Мені Дух Господній, бо Мене Він помазав, ' + 
    'щоб Добру Новину звіщати вбогим. Послав Він Мене проповідувати полоненим визволення, а незрячим прозріння, ' + 
    'відпустити на волю помучених, щоб проповідувати рік Господнього змилування. І, книгу згорнувши, віддав службі й сів. ' +
    'А очі всіх у синагозі звернулись на Нього. І почав Він до них говорити: Сьогодні збулося Писання, яке ви почули! ' +
    'І всі Йому стверджували й дивувались словам благодаті, що линули з уст Його.</p>',
    date: '2020-01-30',
    startedAt: '10:00:00',
    finishedAt: '18:00:00',
    createdAt: new Date(),
  }
];


const sermons = [
  {
    id: 1,
    title: 'Другий прихід Христа',
    subject: 'Другий прихід Христа',
    speaker: 'Олександер Попчук',
    text: '<p>І <strong>Він</strong> їх навчав по їхніх синагогах, і всі Його славили. І прибув Він до Назарету, де був вихований. ' + 
      'І звичаєм Своїм Він прийшов дня суботнього до синагоги, і встав, щоб читати. І подали Йому книгу пророка Ісаї. ' +
      'Розгорнувши ж Він книгу, знайшов місце, де було так написано:  На Мені Дух Господній, бо Мене Він помазав, ' + 
      'щоб Добру Новину звіщати вбогим. Послав Він Мене проповідувати полоненим визволення, а незрячим прозріння, ' + 
      'відпустити на волю помучених, щоб проповідувати рік Господнього змилування. І, книгу згорнувши, віддав службі й сів. ' +
      'А очі всіх у синагозі звернулись на Нього. І почав Він до них говорити: Сьогодні збулося Писання, яке ви почули! ' +
      'І всі Йому стверджували й дивувались словам благодаті, що линули з уст Його.</p>',
    date: '2020-01-30',
    createdAt: new Date()
  },
  {
    id: 2,
    title: 'Життя Християнина',
    subject: 'Життя Християнина',
    speaker: 'Субот Сергій',
    text: '<strong>Текст проповіді...</strong>',
    date: '2020-01-30',
    createdAt: new Date()
  },
  {
    id: 3,
    title: 'Народження з гори',
    subject: 'Народження з гори',
    speaker: 'Зозуля Віталій',
    text: '<strong>Текст проповіді...</strong>',
    date: '2020-01-30',
    createdAt: new Date()
  },
  {
    id: 4,
    title: 'Христос - Месія',
    subject: 'Христос - Месія',
    speaker: 'В\'ячеслав Марчук',
    text: '<strong>Текст проповіді...</strong>',
    date: '2020-01-30',
    createdAt: new Date()
  }
];

exports.seed = async knex => {
  await knex('users').insert(users);
  await knex('events').insert(events);
  await knex('sermons').insert(sermons);
};
