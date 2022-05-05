/* eslint-disable linebreak-style */
// turn off highlight buttons
const buttons = document.querySelectorAll('button');
const keyLine = document.querySelector('.key_line');
const capslock = document.querySelector('[data-name="CapsLock"]');

function deleteHighlight() {
  buttons.forEach((item) => item.classList.remove('hover'));
}
document.addEventListener('keyup', deleteHighlight);

// hihghlight virtual button at key down
function addHighLight(event) {
  buttons.forEach((item) => {
    if (event.code === item.dataset.name) {
      if (!event.target.dataset.spec) {
        document.querySelector('.textarea').textContent += event.key;
      }
      item.classList.add('hover');
    }
  });
}
document.addEventListener('keydown', addHighLight);
// hihghlight virtual button at click mouse
function keyListen(event) {
  if (event.target.classList.contains('button')) {
    if (!event.target.dataset.spec) {
      document.querySelector('.textarea').textContent += event.target.textContent;
    }
  }
  deleteHighlight();
  event.target.classList.add('hover');
}
keyLine.addEventListener('click', keyListen);

// get up letter

function getUp(x) {
  return x.textContent.toUpperCase();
}
function getDown(x) {
  return x.textContent.toLowerCase();
}

function letterUp() {
  buttons.forEach((item) => {
    const word = item.dataset.name.replace(/\w$/g, '');
    if (word === 'Key') {
      item.textContent = getUp(item);
    }
  });
  capslock.classList.add('hover');
}

function letterDown() {
  buttons.forEach((item) => {
    const word = item.dataset.name.replace(/\w$/g, '');
    if (word === 'Key') {
      item.textContent = getDown(item);
    }
  });
  capslock.classList.remove('hover');
}

function toggleCapsLock() {
  if (capslock.classList.contains('hover')) {
    letterDown();
  } else {
    letterUp();
  }
}

capslock.addEventListener('click', toggleCapsLock);
capslock.addEventListener('keydown', toggleCapsLock);
