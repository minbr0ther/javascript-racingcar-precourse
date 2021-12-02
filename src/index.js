import {
  $,
  isBlank,
  isIncludeSpace,
  isDuplicated,
  splitUsingComma,
  isOverFiveLetters,
  generateCars,
} from './utils.js';
import { default as UI } from './DOMUtils.js';
import { ERROR } from './constants.js';

export default function RacingCarGame() {
  let cars = [];

  const init = () => {
    activateEventListeners();
    UI.initSection();
  };

  const isValidCarNames = string => {
    if (isBlank(string)) return alert(ERROR.BLANK_SUBMIT);
    if (isIncludeSpace(string)) return alert(ERROR.INCLUDE_SPACE);

    const carNamesArray = splitUsingComma(string);
    if (isDuplicated(carNamesArray)) return alert(ERROR.DUPLICATED);
    if (isOverFiveLetters(carNamesArray)) return alert(ERROR.OVER_FIVE_LETTERS);

    return true;
  };

  const handleCarNamesSubmit = e => {
    e.preventDefault();

    const carNames = $('#car-names-input').value;
    if (!isValidCarNames(carNames)) return;
    cars = generateCars(carNames);

    UI.disableCarNamesForm();
    UI.showRacingCountSection();
  };

  const activateEventListeners = () => {
    $('#car-names-submit').onclick = handleCarNamesSubmit;
  };

  init();
}

new RacingCarGame();
