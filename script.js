const n = 10;

const array = [];

init();

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }

  showBars();
}

function play() {
  const copy = [...array];
  const swaps = bubbleSort(copy);
  animate(swaps);
}

function animate(swaps) {
  if (swaps.length === 0) {
    showBars();
    return;
  }

  const [i, j] = swaps.shift();
  [array[i], array[j]] = [array[j], array[i]];
  showBars([i, j]);
  setTimeout(function () {
    animate(swaps);
  }, 1500);
}

function bubbleSort(array) {
  const swaps = [];

  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
        swaps.push([i, i + 1]);
      }
    }
  } while (swapped);

  return swaps;
}

function showBars(indices) {
  container.innerHTML = '';

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.style.height = array[i] * 100 + '%';
    bar.classList.add('bar');
    if (indices && indices.includes(i)) {
      bar.style.backgroundColor = 'red';
    }
    container.appendChild(bar);
  }
}
