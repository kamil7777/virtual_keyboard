/* eslint-disable linebreak-style */
import translateObj from "./translate.js";
// turn off highlight buttons
const buttons = document.querySelectorAll('button');
const keyLine = document.querySelector('.key_line');
const capslock = document.querySelector('[data-name="CapsLock"]');
const textarea = document.querySelector('.textarea');

function deleteHighlight() {
  buttons.forEach((item) => item.classList.remove('hover'));
}
document.addEventListener('keyup', deleteHighlight);
// hihghlight virtual button at click mouse

function keyListen(event) {
  if (event.target.classList.contains('button')) {
    if (!event.target.dataset.spec) {
      textarea.focus();
      textarea.textContent += event.target.textContent;
      textarea.selectionStart = textarea.value.length;
      /* buttons.keydown = (event) => event.preventDefault(); */
    }
  }
}
keyLine.addEventListener('click', keyListen);

// hihghlight virtual button at key down

function addHighLight(event) {
  buttons.forEach((item) => {
    if (event.code === item.dataset.name) {
      if (event.target.dataset.spec) {
        textarea.textContent += event.target.textContent;
      }
      item.classList.add('hover');
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

document.onkeydown = function (event) {
  if (event.code === 'ShiftLeft') {
    document.onkeyup = function (event) {
      if (event.code === 'AltLeft') {
        if (lang === 'en') {
          translateLetterRu();
        } else {
          translateLetterEn();
        }
      }
    };
  }
};
