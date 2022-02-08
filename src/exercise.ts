import {
  lowerCaseLetters,
  upperCaseLetters,
  specialChars,
  numbers
} from "./character-sets";

// password configuration
const mustHaveUpperCaseLetters: boolean = true;
const mustHaveLowerCaseLetters: boolean = true;
const mustHaveNumbers: boolean = true;
const mustHaveSpecialCharacters: boolean = true;
const passwordLength: number = 20;

// get all characters that are allowed according to our setup
function getAllowedCharacters(): (string | number)[] {
  const allowedCharacters: (string | number)[] = [];

  if (mustHaveLowerCaseLetters) allowedCharacters.push(...lowerCaseLetters);
  if (mustHaveUpperCaseLetters) allowedCharacters.push(...upperCaseLetters);
  if (mustHaveSpecialCharacters) allowedCharacters.push(...specialChars);
  if (mustHaveNumbers) allowedCharacters.push(...numbers);

  return allowedCharacters;
}

// given an array, return a random item from it
function getRandomItemFromArray(array: (string | number)[]) {
  const randomIndex: number = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

// make sure at least one of the required characters is present, to pass a potential validator
function getMandatoryCharacters() {
  const result = [];

  if (mustHaveLowerCaseLetters) {
    const character: string | number = getRandomItemFromArray(lowerCaseLetters);
    result.push(character);
  }
  if (mustHaveUpperCaseLetters) {
    const character: string | number = getRandomItemFromArray(upperCaseLetters);
    result.push(character);
  }
  if (mustHaveSpecialCharacters) {
    const character: string | number = getRandomItemFromArray(specialChars);
    result.push(character);
  }
  if (mustHaveNumbers) {
    const number: number | string = getRandomItemFromArray(numbers);
    result.push(number);
  }

  return result;
}

// fill the rest of the password with whatever is allowed
function getRandomCharacters(numberOfCharacters: number) {
  const randomCharacters: (string | number)[] = [];
  const allowedCharacters: (string | number)[] = getAllowedCharacters();

  for (let i = 1; i <= numberOfCharacters; i++) {
    const randomChar: string | number = getRandomItemFromArray(allowedCharacters);
    randomCharacters.push(randomChar);
  }
  return randomCharacters;
}

// randomize the order of items in the array
function shuffleArray(array: (string | number)[]): (string | number)[] {
  return array.sort(() => 0.5 - Math.random());
}

// generate the final result
function generatePassword() {
  const requiredCharacters: (string | number)[] = getMandatoryCharacters();
  const remainingCharacters: (string | number)[] = getRandomCharacters(passwordLength - requiredCharacters.length);

  const generatedCharacters: (string | number)[] = [...requiredCharacters, ...remainingCharacters];
  const shuffledChars = shuffleArray(generatedCharacters);

  const password: string = shuffledChars.join("");
  if (!password.length) {
    console.log("Please set at least one condition to generate password");
  } else {
    console.log("Here's your password:  ", password);
  }
}

// init, essentially.
export default generatePassword
