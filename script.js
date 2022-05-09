/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import translateObj from './translate.js';

// turn off highlight buttons
const buttons = document.querySelectorAll('button');
const keyLine = document.querySelector('.key_line');
const capsLock = document.querySelector('[data-name="CapsLock"]');
const textarea = document.querySelector('.textarea');

function deleteHighlight() {
  buttons.forEach((item) => {
    if (item.dataset.name !== 'CapsLock') {
      item.classList.remove('hover');
    }
  });
}
document.addEventListener('keyup', deleteHighlight);

// hihghlight virtual button at click mouse

function keyListen(event) {
  if (event.target.classList.contains('button')) {
    if (!event.target.dataset.spec) {
      textarea.focus();
      textarea.textContent += event.target.textContent;
      textarea.selectionStart = textarea.value.length;
    }
  }
}
keyLine.addEventListener('click', keyListen);

// hihghlight virtual button at key down

function addHighLight(event) {
  buttons.forEach((item) => {
    if (event.code === item.dataset.name) {
      if (!event.target.dataset.spec) {
        textarea.textContent += event.key;
      }
      if (event.code !== 'CapsLock') item.classList.add('hover');
    }
  });
  textarea.focus();
}
document.addEventListener('keydown', addHighLight);

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
  capsLock.classList.add('hover');
}

function letterDown() {
  buttons.forEach((item) => {
    const word = item.dataset.name.replace(/\w$/g, '');
    if (word === 'Key') {
      item.textContent = getDown(item);
    }
  });
  capsLock.classList.remove('hover');
}

function toggleCapsLock() {
  if (capsLock.classList.contains('hover')) {
    letterDown();
  } else {
    letterUp();
  }
}

capsLock.addEventListener('click', toggleCapsLock);
document.addEventListener('keydown', (event) => {
  if (event.code === 'CapsLock') {
    toggleCapsLock();
  }
});

// change language

const sd = document.querySelectorAll('[data-lang]');
let lang = 'en';

function translateLetterRu() {
  Array.from(sd).forEach((item) => {
    item.textContent = translateObj.ru[item.dataset.lang];
  });
  lang = 'ru';
}

function translateLetterEn() {
  Array.from(sd).forEach((item) => {
    item.textContent = translateObj.en[item.dataset.lang];
  });
  lang = 'en';
}

document.onkeydown = function pushCtrl(event) {
  if (event.code === 'ControlLeft') {
    document.onkeyup = function pushAlt(e) {
      if (e.code === 'AltLeft') {
        if (lang === 'en') {
          translateLetterRu();
        } else {
          translateLetterEn();
        }
      }
    };
  }
};
