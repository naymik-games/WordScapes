let gameMode = 'book';
let onLevel = 0;
let onPuzzle = 0;
let onBook = 0;
let onTheme = 0;
let bonusEarned = 0;
let load = false;
let gameData;
let defaultData = {
  coins: 0,
  level: 0,
  book: 0,
  puzzle: 0,
  theme: 0,
  progress: [[0, 0, 0, 0, 0, 0], [-1, -1, -1, -1, -1, -1]],
  tileOption: 0,
  music: true
}
let loadData;
let levelSaveDefault = {
  baseWord: '',
  words: [],
  grid: [],
  bonusWord: '',
  bounsFound: false,
  foundWords: [],
  puzzleFound: 0,
  gameMode: 'book',
  group: 0,
  level: 0,
}
const shuffle = str => [...str].sort(() => Math.random() - .5).join('');

let backs = ['back_00', 'back_01', 'back_02', 'back_03', 'back_04', 'back_05', 'back_06', 'back_07', 'back_07', 'back_08', 'back_09', 'back_10', 'back_11', 'back_12', 'back_13', 'back_14', 'back_15', 'back_16']
let tileImages = ['tiles-01', 'tiles-02', 'tiles-03', 'tiles-04']