const n = 10;

const array = [];

init();

let audioCtx = null;

function playNote(freq) {
  if (audioCtx === null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.01;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }

  showBars();
}

function play() {
  const copy = [...array];
  const moves = bubbleSort(copy);
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    showBars();
    return;
  }

  const move = moves.shift();
  const [i, j] = move.indices;

  if (move.type === 'swap') {
    [array[i], array[j]] = [array[j], array[i]];
  }

  showBars(move);
  setTimeout(function () {
    animate(moves);
  }, 200);
}

function bubbleSort(array) {
  const moves = [];

  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      moves.push({ indices: [i, i + 1], type: 'comp' });
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        moves.push({ indices: [i, i + 1], type: 'swap' });
        swapped = true;
      }
    }
  } while (swapped);

  return moves;
}

function showBars(move) {
  container.innerHTML = '';

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.style.height = array[i] * 100 + '%';
    bar.classList.add('bar');
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type === 'swap' ? 'red' : 'blue';
      //   if (move.type === 'comp') {
      //     playNote(100);
      //   }
      if (move.type === 'swap') {
        playNote(200);
      }
    }

    container.appendChild(bar);
  }
}
