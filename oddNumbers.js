// function getOddNumbers(numbers) {
//   return numbers.filter((number) => number % 2 !== 0);
// }

// // Example usage
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const oddNumbers = getOddNumbers(numbers);

// console.log(oddNumbers); // Output: [1, 3, 5, 7, 9]

const getOddNumbers2 = (number) => {
  const oddNumber = number.filter((number) => number % 2 !== 0);
  const allNumberSum = number.reduce((a, b) => a + b);
  // const totalSumNumberSum = allNumberSum
  //   .toString()
  //   .split('')
  //   .map(Number)
  //   .reduce((a, b) => a + b);

  const getDigits = (num) => {
    if (num < 10) return num;
    return (num % 10) + getDigits(Math.floor(num / 10));
  };

  const totalSumNumberSum = getDigits(55);

  return { oddNumber, allNumberSum, totalSumNumberSum };
};

const numbers = [1, 2, 3, 4, 5, 6, 5, 7, 8, 9];
console.log(getOddNumbers2(numbers));

// 1. Find Even Numbers in an Array
const evenNumbers = numbers.filter((number) => number % 2 !== 0);
// 2. Calculate the Factorial of a Number
const factorial = (num) => (num > 1 ? num * factorial(num - 1) : 1);
console.log(factorial(4));

// 3. Reverse a String
const reverseString = (string) => string.split(' ').reverse().join();
console.log(reverseString('hello'));
// 4. Check if a String is a Palindrome
// const isPalindrome = (str) => {
//   const cleanedStr = str.replace(/\s+/g, '').toLowerCase();
//   return cleanedStr === cleanedStr.split('').reverse().join('');
// };
const isPalindrome = (str) => {
  // Convert the string to lowercase for case-insensitivity
  const cleanedStr = str.toLowerCase().split(''); // Split into an array of characters
  // .filter((char) => char !== ' ') // Remove spaces
  // .join(''); // Join back into a single string

  // Check if the cleaned string is equal to its reverse
  return cleanedStr;
};

const num = 140;
const getDigits = (num) => {
  if (num < 10) return num;
  return (num % 10) + getDigits(Math.floor(num / 10));
};

console.log(getDigits(num));

// 5. Find the Largest Number in an Array
const largestNumber = (numbers) => (numbers ? Math.max(...numbers) : 1);

console.log(largestNumber(numbers));

// 6. Calculate the Sum of an Array
const sumOfNumbers = (numbers) => numbers.reduce((a, b) => a + b);
console.log(sumOfNumbers(numbers));

// 7. Find Prime Numbers in an Array
const isPrime = (num) => Math.sqrt(num) % 1 === 0;

console.log(isPrime('rr'));

// 8. Find Odd Numbers in an Array with Total Digit Sum

// 9. Count Vowels in a String

// 10. Generate Fibonacci Sequence
