// Cover images are served by Vite from public/images.
export const GENRE_COLORS = {
  Action: ['#ff4757', '#c0392b'],
  RPG: ['#9b59b6', '#6c3483'],
  Strategy: ['#2980b9', '#1a5276'],
  Puzzle: ['#f39c12', '#d68910'],
  Horror: ['#2c3e50', '#1a252f'],
  Adventure: ['#27ae60', '#1e8449'],
  Shooter: ['#e74c3c', '#922b21'],
  Simulation: ['#16a085', '#0e6655'],
  Sports: ['#f1c40f', '#d4ac0d'],
  Indie: ['#8e44ad', '#6c3483'],
};

export const GENRES = ['Action', 'RPG', 'Strategy', 'Puzzle', 'Horror', 'Adventure', 'Shooter', 'Simulation', 'Sports', 'Indie'];

const gameCatalog = [
  { id: 1, title: 'Airborne Strike', genre: 'Action', image: '/images/1.jpg', developer: 'SkyForge Studios', price: 19.99, rating: 4.2, reviews: 342, downloads: 15200, tags: ['Jets', 'Flight', 'Action'], isNew: true, isFeatured: false, releaseDate: '2024-03-15' },
  { id: 2, title: 'Mystic Lands', genre: 'Strategy', image: '/images/2.jpg', developer: 'Alderac Entertainment Group', price: 14.99, rating: 4.1, reviews: 215, downloads: 9800, tags: ['Board Game', 'Fantasy', 'Strategy'], isNew: false, isFeatured: false, releaseDate: '2023-10-12' },
  { id: 3, title: 'Urbek City Builder', genre: 'Simulation', image: '/images/3.jpg', developer: 'Estudios Kremlinois', price: 18.99, rating: 4.3, reviews: 438, downloads: 26400, tags: ['City Builder', 'Management', 'Simulation'], isNew: false, isFeatured: true, releaseDate: '2022-07-13' },
  { id: 4, title: 'Cricket 19', genre: 'Sports', image: '/images/4.jpg', developer: 'Big Ant Studios', price: 24.99, rating: 4.0, reviews: 1240, downloads: 125000, tags: ['Cricket', 'Sports', 'Multiplayer'], isNew: false, isFeatured: true, releaseDate: '2019-07-30' },
  { id: 5, title: 'Don Bradman Cricket 17', genre: 'Sports', image: '/images/5.jpg', developer: 'Big Ant Studios', price: 19.99, rating: 4.1, reviews: 567, downloads: 31400, tags: ['Cricket', 'Sports'], isNew: false, isFeatured: false, releaseDate: '2017-01-16' },
  { id: 6, title: 'Don Bradman Cricket 14', genre: 'Sports', image: '/images/6.jpg', developer: 'Big Ant Studios', price: 14.99, rating: 4.0, reviews: 423, downloads: 27600, tags: ['Cricket', 'Sports'], isNew: false, isFeatured: false, releaseDate: '2014-04-03' },
  { id: 7, title: 'Ashes Cricket', genre: 'Sports', image: '/images/7.jpg', developer: 'Big Ant Studios', price: 19.99, rating: 4.1, reviews: 788, downloads: 62100, tags: ['Cricket', 'Sports'], isNew: false, isFeatured: false, releaseDate: '2017-12-15' },
  { id: 8, title: 'Cricket 24', genre: 'Sports', image: '/images/8.jpg', developer: 'Big Ant Studios', price: 39.99, rating: 4.2, reviews: 1890, downloads: 94300, tags: ['Cricket', 'Sports'], isNew: true, isFeatured: true, releaseDate: '2023-10-05' },
  { id: 9, title: 'EA Sports FC 25', genre: 'Sports', image: '/images/9.jpg', developer: 'EA Sports', price: 59.99, rating: 4.0, reviews: 2312, downloads: 218700, tags: ['Football', 'Sports', 'Multiplayer'], isNew: true, isFeatured: true, releaseDate: '2024-09-27' },
  { id: 10, title: 'Counter-Strike 2', genre: 'Shooter', image: '/images/10.jpg', developer: 'Valve', price: 0, rating: 4.4, reviews: 2341, downloads: 210000, tags: ['FPS', 'Tactical', 'Competitive', 'Free-to-Play'], isNew: false, isFeatured: true, releaseDate: '2023-09-27' },
  { id: 11, title: 'EA Sports FC 24', genre: 'Sports', image: '/images/11.jpg', developer: 'EA Sports', price: 39.99, rating: 4.0, reviews: 1445, downloads: 135600, tags: ['Football', 'Sports'], isNew: false, isFeatured: false, releaseDate: '2023-09-29' },
  { id: 12, title: 'Stardew Valley', genre: 'Simulation', image: '/images/12.jpg', developer: 'ConcernedApe', price: 14.99, rating: 4.9, reviews: 9678, downloads: 341200, tags: ['Farming', 'Cozy', 'Pixel-Art'], isNew: false, isFeatured: true, releaseDate: '2016-02-26' },
  { id: 13, title: 'Divinity: Original Sin II', genre: 'RPG', image: '/images/13.jpg', developer: 'Larian Studios', price: 44.99, rating: 4.8, reviews: 4678, downloads: 141200, tags: ['Fantasy', 'Turn-Based', 'Story-Rich'], isNew: false, isFeatured: true, releaseDate: '2017-09-14' },
  { id: 14, title: 'Elden Ring', genre: 'RPG', image: '/images/14.jpg', developer: 'FromSoftware', price: 59.99, rating: 4.9, reviews: 12567, downloads: 410000, tags: ['Souls-like', 'Open-World', 'Fantasy'], isNew: false, isFeatured: true, releaseDate: '2022-02-25' },
  { id: 15, title: 'Doom Eternal', genre: 'Shooter', image: '/images/15.jpg', developer: 'id Software', price: 39.99, rating: 4.7, reviews: 6567, downloads: 221400, tags: ['FPS', 'Action', 'Demons'], isNew: false, isFeatured: true, releaseDate: '2020-03-20' },
  { id: 16, title: 'Batman: Arkham City', genre: 'Action', image: '/images/16.jpg', developer: 'Rocksteady Studios', price: 19.99, rating: 4.8, reviews: 5862, downloads: 174200, tags: ['Superhero', 'Action', 'Stealth'], isNew: false, isFeatured: false, releaseDate: '2011-10-18' },
  { id: 17, title: 'Resident Evil 4', genre: 'Horror', image: '/images/17.jpg', developer: 'Capcom', price: 39.99, rating: 4.8, reviews: 8742, downloads: 243900, tags: ['Survival Horror', 'Action', 'Zombies'], isNew: false, isFeatured: true, releaseDate: '2023-03-24' },
  { id: 18, title: 'Hades', genre: 'Action', image: '/images/18.jpg', developer: 'Supergiant Games', price: 24.99, rating: 4.9, reviews: 9341, downloads: 310500, tags: ['Rogue-like', 'Action', 'Mythology'], isNew: false, isFeatured: true, releaseDate: '2020-09-17' },
  { id: 19, title: 'Madden NFL 25', genre: 'Sports', image: '/images/19.jpg', developer: 'EA Sports', price: 59.99, rating: 4.0, reviews: 1875, downloads: 98100, tags: ['Football', 'Sports', 'NFL'], isNew: true, isFeatured: false, releaseDate: '2024-08-16' },
  { id: 20, title: 'NBA 2K25', genre: 'Sports', image: '/images/20.jpg', developer: 'Visual Concepts', price: 59.99, rating: 4.1, reviews: 2944, downloads: 156200, tags: ['Basketball', 'Sports', 'NBA'], isNew: true, isFeatured: false, releaseDate: '2024-09-06' },
  { id: 21, title: "Tony Hawk's Pro Skater 1 + 2", genre: 'Sports', image: '/images/21.jpg', developer: 'Vicarious Visions', price: 39.99, rating: 4.6, reviews: 2271, downloads: 89300, tags: ['Skateboarding', 'Arcade', 'Sports'], isNew: false, isFeatured: false, releaseDate: '2020-09-04' },
  { id: 22, title: 'Football Manager 26', genre: 'Simulation', image: '/images/22.jpg', developer: 'Sports Interactive', price: 49.99, rating: 4.3, reviews: 1841, downloads: 77200, tags: ['Football', 'Management', 'Simulation'], isNew: true, isFeatured: false, releaseDate: '2025-11-04' },
  { id: 23, title: 'PC Building Simulator', genre: 'Simulation', image: '/images/23.jpg', developer: 'The Irregular Corporation', price: 19.99, rating: 4.4, reviews: 3220, downloads: 122500, tags: ['Building', 'Hardware', 'Simulation'], isNew: false, isFeatured: false, releaseDate: '2019-01-29' },
  { id: 24, title: 'Planet Zoo', genre: 'Simulation', image: '/images/24.jpg', developer: 'Frontier Developments', price: 44.99, rating: 4.6, reviews: 3710, downloads: 119400, tags: ['Management', 'Zoo', 'Simulation'], isNew: false, isFeatured: false, releaseDate: '2019-11-05' },
  { id: 25, title: 'Gas Station Simulator', genre: 'Simulation', image: '/images/25.jpg', developer: 'Drago Entertainment', price: 19.99, rating: 4.2, reviews: 2145, downloads: 80400, tags: ['Management', 'Business', 'Simulation'], isNew: false, isFeatured: false, releaseDate: '2021-09-15' },
  { id: 26, title: 'Two Point Museum', genre: 'Simulation', image: '/images/26.jpg', developer: 'Two Point Studios', price: 29.99, rating: 4.3, reviews: 1206, downloads: 51200, tags: ['Management', 'Museum', 'Simulation'], isNew: true, isFeatured: false, releaseDate: '2025-03-04' },
  { id: 27, title: 'Jurassic World Evolution 3', genre: 'Simulation', image: '/images/27.jpg', developer: 'Frontier Developments', price: 59.99, rating: 4.4, reviews: 1720, downloads: 87800, tags: ['Dinosaurs', 'Management', 'Simulation'], isNew: true, isFeatured: true, releaseDate: '2025-10-21' },
  { id: 28, title: 'Undertale', genre: 'Indie', image: '/images/28.jpg', developer: 'Toby Fox', price: 9.99, rating: 4.9, reviews: 7842, downloads: 260100, tags: ['RPG', 'Pixel-Art', 'Story-Rich'], isNew: false, isFeatured: true, releaseDate: '2015-09-15' },
  { id: 29, title: 'Fallout: New Vegas', genre: 'RPG', image: '/images/29.jpg', developer: 'Obsidian Entertainment', price: 9.99, rating: 4.8, reviews: 6920, downloads: 202400, tags: ['Post-Apocalyptic', 'Open-World', 'RPG'], isNew: false, isFeatured: false, releaseDate: '2010-10-19' },
  { id: 30, title: 'Haven', genre: 'RPG', image: '/images/30.jpg', developer: 'The Game Bakers', price: 24.99, rating: 4.4, reviews: 1089, downloads: 43800, tags: ['Romance', 'Adventure', 'RPG'], isNew: false, isFeatured: false, releaseDate: '2020-12-03' },
  { id: 31, title: 'Grim Dawn', genre: 'RPG', image: '/images/31.jpg', developer: 'Crate Entertainment', price: 24.99, rating: 4.6, reviews: 4421, downloads: 129700, tags: ['Action RPG', 'Dark Fantasy', 'Loot'], isNew: false, isFeatured: false, releaseDate: '2016-02-25' },
  { id: 32, title: 'Tails of Iron', genre: 'Adventure', image: '/images/32.jpg', developer: 'Odd Bug Studio', price: 24.99, rating: 4.5, reviews: 875, downloads: 38400, tags: ['Adventure', 'Souls-like', 'Hand-Drawn'], isNew: false, isFeatured: false, releaseDate: '2021-09-17' },
  { id: 33, title: 'Outer Wilds', genre: 'Adventure', image: '/images/33.jpg', developer: 'Mobius Digital', price: 24.99, rating: 4.9, reviews: 5518, downloads: 160900, tags: ['Exploration', 'Space', 'Mystery'], isNew: false, isFeatured: true, releaseDate: '2019-05-28' },
  { id: 34, title: 'Tomb Raider', genre: 'Action', image: '/images/34.jpg', developer: 'Crystal Dynamics', price: 19.99, rating: 4.6, reviews: 4130, downloads: 147600, tags: ['Adventure', 'Action', 'Survival'], isNew: false, isFeatured: false, releaseDate: '2013-03-05' },
  { id: 35, title: 'A Plague Tale: Innocence', genre: 'Adventure', image: '/images/35.jpg', developer: 'Asobo Studio', price: 39.99, rating: 4.7, reviews: 3296, downloads: 112800, tags: ['Story-Rich', 'Stealth', 'Adventure'], isNew: false, isFeatured: false, releaseDate: '2019-05-14' },
  { id: 36, title: 'Journey', genre: 'Adventure', image: '/images/36.jpg', developer: 'Thatgamecompany', price: 14.99, rating: 4.8, reviews: 2482, downloads: 90700, tags: ['Atmospheric', 'Exploration', 'Indie'], isNew: false, isFeatured: false, releaseDate: '2019-06-06' },
  { id: 37, title: 'Stray', genre: 'Adventure', image: '/images/37.jpg', developer: 'BlueTwelve Studio', price: 29.99, rating: 4.7, reviews: 5844, downloads: 181200, tags: ['Adventure', 'Cyberpunk', 'Exploration'], isNew: false, isFeatured: true, releaseDate: '2022-07-19' },
  { id: 38, title: 'Cyberpunk 2077', genre: 'RPG', image: '/images/38.jpg', developer: 'CD Projekt Red', price: 59.99, rating: 4.5, reviews: 13240, downloads: 390400, tags: ['Cyberpunk', 'Open-World', 'RPG'], isNew: false, isFeatured: true, releaseDate: '2020-12-10' },
  { id: 39, title: 'Ghost of Tsushima', genre: 'Action', image: '/images/39.jpg', developer: 'Sucker Punch Productions', price: 59.99, rating: 4.8, reviews: 6240, downloads: 176300, tags: ['Samurai', 'Open-World', 'Action'], isNew: true, isFeatured: true, releaseDate: '2024-05-16' },
  { id: 40, title: 'Grand Theft Auto V', genre: 'Action', image: '/images/40.jpg', developer: 'Rockstar North', price: 29.99, rating: 4.8, reviews: 18540, downloads: 520000, tags: ['Open-World', 'Crime', 'Action'], isNew: false, isFeatured: true, releaseDate: '2015-04-14' },
];

export const mockGames = gameCatalog.map(game => ({
  ...game,
  isFree: game.price === 0,
  screenshots: 3,
  description: game.description || `${game.title} brings ${game.tags.join(', ').toLowerCase()} gameplay to the GameVault catalog, with cover art matched from the local images folder.`,
}));

export const mockUsers = [
  { id: 1, name: 'Alex Morgan', email: 'alex@example.com', role: 'customer', avatar: null, joinDate: '2024-01-15', purchases: [1, 4, 6], cart: [] },
  { id: 2, name: 'Sam Chen', email: 'sam@example.com', role: 'developer', avatar: null, joinDate: '2023-11-08', studio: 'NovaStar Studios' },
  { id: 3, name: 'Admin User', email: 'admin@gamevault.com', role: 'admin', avatar: null, joinDate: '2023-01-01' },
];

export const mockReviews = [
  { id: 1, gameId: 1, userId: 1, userName: 'Alex Morgan', rating: 5, text: 'Absolutely incredible game! The space combat feels tight and responsive. Could play this for hours.', date: '2024-03-20', helpful: 42 },
  { id: 2, gameId: 1, userId: 4, userName: 'Jordan Kim', rating: 4, text: 'Great game overall. The story is engaging and the graphics are stunning. Minor performance issues on older hardware.', date: '2024-03-18', helpful: 28 },
  { id: 3, gameId: 2, userId: 1, userName: 'Alex Morgan', rating: 5, text: 'Best RPG I have played in years. The branching storylines are incredible and every choice matters.', date: '2024-01-10', helpful: 89 },
  { id: 4, gameId: 4, userId: 5, userName: 'Riley Stone', rating: 5, text: 'Free to play and still one of the best puzzle games out there. The devs really care about quality.', date: '2023-12-01', helpful: 156 },
];

export const mockOrders = [
  { id: 'ORD-001', userId: 1, gameId: 1, gameName: 'Airborne Strike', price: 19.99, date: '2024-03-15', status: 'completed', paymentMethod: 'Credit Card' },
  { id: 'ORD-002', userId: 1, gameId: 6, gameName: 'Don Bradman Cricket 14', price: 14.99, date: '2024-02-20', status: 'completed', paymentMethod: 'PayPal' },
];

export const mockAdminStats = {
  totalUsers: 15420,
  totalGames: gameCatalog.length,
  totalRevenue: 284650,
  totalOrders: 38920,
  newUsersThisMonth: 1240,
  revenueThisMonth: 24800,
  activeGames: gameCatalog.length,
  pendingApprovals: 7,
};
