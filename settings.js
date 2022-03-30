let gameMode = 'book';
let onLevel = 0;
let onPuzzle = 0;
let onBook = 0;
let onTheme = 0;
let bonusEarned = 0;
let gameData;
let defaultData = {
  coins: 0,
  level: 0,
  book: 0,
  puzzle: 0,
  theme: 0,
  progress: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
const shuffle = str => [...str].sort(() => Math.random() - .5).join('');

let backs = ['back_00', 'back_01', 'back_02', 'back_03', 'back_04', 'back_05', 'back_06', 'back_07', 'back_07', 'back_08', 'back_09', 'back_10', 'back_11', 'back_12', 'back_13', 'back_14', 'back_15', 'back_16']
