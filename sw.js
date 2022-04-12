var cacheName = 'phaser-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/levelData.js',
  '/phaser.min.js',
  '/settings.js',
  '/themeData.js',

  '/scripts/crossword.js',
  '/scenes/endLevel.js',
  '/scenes/options.js',
  '/scenes/preload.js',
  '/scenes/selectLevel.js',
  '/scenes/selectTheme.js',
  '/scenes/startGame.js',

  '/assets/letter_alt_green.png',
  '/assets/letter-1.png',
  '/assets/letter-alt-circle.png',
  '/assets/letter-alt-theme.png',
  '/assets/letter-alt.png',
  '/assets/letters.png',
  '/assets/platform.png',
  '/assets/yellow-star.png',
  '/assets/ScrabbleWordListAlt.js',

  '/assets/fonts/clarendon.png',
  '/assets/fonts/lato.png',
  '/assets/fonts/clarendon.xml',
  '/assets/fonts/lato.xml',

  '/assets/sound/Inspiring-Acoustic-Guitar.mp3',

  '/assets/sprites/background.png',
  '/assets/sprites/check.png',
  '/assets/sprites/home_button.png',
  '/assets/sprites/home.png',
  '/assets/sprites/letter-alt-circle.png',
  '/assets/sprites/letter-alt-green.png',
  '/assets/sprites/open_button.png',
  '/assets/sprites/particle.png',
  '/assets/sprites/save_button.png',
  '/assets/sprites/select_icons.png',
  '/assets/sprites/settings_button.png',
  '/assets/sprites/star.png',
  '/assets/sprites/tile_icons.png',
  '/assets/sprites/toggle.png',

  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});