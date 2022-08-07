const outputBox = document.querySelector('#output');
const inputDate = document.querySelector("#date");
const button = document.querySelector("#btn");
const loader = document.querySelector(".loader");
let message = "";

function reverseStr(str) {
    // str = abc
    let strArray = str.split(""); // ['a','b','c']
    let reverseArray = strArray.reverse(); // ['c','b','a']
    let reverseString = reverseArray.join(""); // 'cba'
    return reverseString;
}
//console.log(reverseStr("hello"));
function isPalindrome(str) {
    let reverseString = reverseStr(str);
    if (reverseString === str) {
        return true;
    }
    return false;
}
// console.log(isPalindrome("hello"));
// console.log(isPalindrome("car"));
// console.log(isPalindrome("120021"));

function numberToStr(dateObj) {
    let day = dateObj.day;
    let month = dateObj.month;
    let year = dateObj.year;

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return {
        day: day.toString(),
        month: month.toString(),
        year: year.toString()
    }
}
// let date = {
//     day: 7,
//     month: 10,
//     year: 2022
// }
// console.log(numberToStr(date));

function allFormateOfDate(dateObj) {
    let dateObjStr = numberToStr(dateObj);

    let day = dateObjStr.day;
    let month = dateObjStr.month;
    let year = dateObjStr.year;
    // DD-MM-YYYY
    // MM-DD-YYYY
    // YYYY-MM-DD
    // DD-MM-YY
    // MM-DD-YY
    // YY-MM-DD

    let ddmmyyyy = day + month + year;
    let mmddyyyy = month + day + year;
    let yyyymmdd = year + month + day;
    let ddmmyy = day + month + year.slice(2, 4);
    let mmddyy = month + day + year.slice(2, 4);
    let yymmdd = year.slice(2, 4) + month + day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// let date = {
//     day: 7,
//     month: 10,
//     year: 2022
// }
// console.log(allFormateOfDate(date));

function checkPalindromeForAllFormat(dateObj) {
    var allDateFormat = allFormateOfDate(dateObj);
    let flag = false;
    for (let i = 0; i < allDateFormat.length; i++) {
        if (isPalindrome(allDateFormat[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}
// console.log(checkPalindromeForAllFormat({
//     day: 22,
//     month: 2,
//     year: 2022
// }))
// console.log(checkPalindromeForAllFormat({
//     day: 21,
//     month: 2,
//     year: 2022
// }))

function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    }
    return false;
}

// console.log(isLeapYear(1988));
// console.log(isLeapYear(2020));
// console.log(isLeapYear(2021));

function nextDate(date) {
    let noOfDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day = date.day;
    let month = date.month;
    let year = date.year;
    day = day + 1;

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
                //days in leap year in feb month is 29 so if it is greater than 29 then make it 1 otherwise we already have increased day
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
                //days in leap year in feb month is 28 so if it is greater than 28 then make it 1 otherwise we already have increased day
            }
        }
    } else {
        // input month has range 1-12 and array start from 0 so make it month-1 to get days in that month
        if (day > noOfDayInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }
    if (month > 12) {
        month = 1;
        year = year + 1;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

// console.log(nextDate({
//     day: 31,
//     month: 12,
//     year: 2022
// }));

// console.log(nextDate({
//     day: 29,
//     month: 2,
//     year: 2020
// }));

// console.log(nextDate({
//     day: 28,
//     month: 2,
//     year: 2022
// }));

// console.log(nextDate({
//     day: 28,
//     month: 2,
//     year: 2024
// }));

function getNextPalindromeDate(dateObj) {
    if (checkPalindromeForAllFormat(dateObj)) {
        message = "Your birthdate is palindrome!!"
    } else {
        let futureDate = nextDate(dateObj);
        let count = 0;
        while (1) {
            count = count + 1;
            if (checkPalindromeForAllFormat(futureDate)) {
                break;
            }
            futureDate = nextDate(futureDate);
        }
        // console.log(futureDate);
        message = `You have missed ${count} ${count === 1 ? "day" : "days"} next palindrome date from your birthdate is day : ${futureDate.day}, month : ${futureDate.month}, year : ${futureDate.year}\n`;
    }
}
// console.log(getNextPalindromeDate({
//     day: 5,
//     month: 1,
//     year: 2020
// }));
// console.log(getNextPalindromeDate({
//     day: 21,
//     month: 2,
//     year: 2022
// }));

function decreaseDate(date) {
    let noOfDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day = date.day;
    let month = date.month;
    let year = date.year;
    day = day - 1;
    if (day === 0) {
        if (month == 3) {
            if (isLeapYear(year)) {
                day = 29;
                month = 2;
            } else {
                day = 28;
                month = 2;
            }
        } else {
            day = noOfDayInMonth[month - 1];
            month = month - 1;
        }
    }
    if (month < 1) {
        year = year - 1;
        month = 12;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

// console.log(decreaseDate({
//     day: 1,
//     month: 1,
//     year: 2022
// }));
// console.log(decreaseDate({
//     day: 1,
//     month: 3,
//     year: 2020
// }));
// console.log(decreaseDate({
//     day: 1,
//     month: 3,
//     year: 2021
// }));
// console.log(decreaseDate({
//     day: 1,
//     month: 5,
//     year: 2021
// }));

function getPastPalindromeDate(dateObj) {
    if (checkPalindromeForAllFormat(dateObj)) {
        message = "Your birthdate is palindrome!!"
    } else {
        let pastDate = decreaseDate(dateObj);
        let count = 0;
        while (1) {
            count = count + 1;
            if (checkPalindromeForAllFormat(pastDate)) {
                break;
            }
            pastDate = decreaseDate(pastDate);
        }
        console.log(pastDate);
        message = message + `\nYou have missed ${count} ${count === 1 ? "day" : "days"} in past palindrome date from your birthdate is day : ${pastDate.day}, month : ${pastDate.month}, year : ${pastDate.year}\n`;
    }
}

button.addEventListener('click', () => {
    //console.log(inputDate.value)
    let dateArray = inputDate.value.split('-');
    let date = {
        day: Number(dateArray[2]),
        month: Number(dateArray[1]),
        year: Number(dateArray[0])
    }
    outputBox.innerText = "";
    loader.style.display = "block";
    //console.log(date)
    setTimeout(() => {
        loader.style.display = "none";
        getNextPalindromeDate(date);
        getPastPalindromeDate(date);
        outputBox.innerText = message;
    }, 3000)
})