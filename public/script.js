const arrowButton = document.getElementById("arrow-button");
const errorFields = document.querySelectorAll("#error-field");
const dateContainerInputs = Array.from(errorFields[0].parentElement.parentElement.getElementsByTagName('input')); 
const yearDisplay = document.getElementById('display-year');
const monthDisplay = document.getElementById('display-month');
const dayDisplay = document.getElementById('display-days');

arrowButton.addEventListener('click', () => {
    
    const day = document.getElementById('Day').value;
    const month = document.getElementById('Month').value;
    const year = document.getElementById('Year').value;

    let isError = false;
    errorFields.forEach(errorField => {
        const parent = errorField.parentElement;
        const inputField = parent.querySelector('input');
        const label = parent.querySelector('label');
        const inputFiledId = inputField.getAttribute('id');

        if (inputField.value === '') {
            removeHidden(errorField, inputField, label);
            isError = true  ; 
        } else {
            addHidden(errorField, inputField, label);

            if (inputFiledId === 'Day') {
                if (inputField.value < 1 || inputField.value > 31) {
                    errorField.innerHTML = 'Must be a valid day';
                    removeHidden(errorField, inputField, label);
                    isError = true;
                } else {
                    addHidden(errorField, inputField, label);
                }
            } else if (inputFiledId === 'Month') {
                if (inputField.value < 1 || inputField.value > 12) {
                    errorField.innerHTML = 'Must be a valid month';
                    removeHidden(errorField, inputField, label);
                    isError = true;
                } else {
                    addHidden(errorField, inputField, label);
                }
            } else if (inputFiledId === 'Year') {
                if (inputField.value > new Date().getFullYear()) {
                    errorField.innerHTML = 'Must be in past';
                    removeHidden(errorField, inputField, label);
                    isError = true;
                } else {
                    addHidden(errorField, inputField, label);
                }
                
            }
            
        }
    });
    function validateDay(){
        const inputFieldDay = document.querySelector('#Day');
        const dayLabel = document.querySelector('#day-label');
        const errorSpan = dayLabel.parentNode.querySelector('span');
        if (isValidDay(day, month, year)) {        
            addHidden(errorSpan, inputFieldDay, dayLabel);
            return true ; 
        } else {
            errorSpan.innerHTML = 'Must be a valid day';
            removeHidden(errorSpan, inputFieldDay, dayLabel);
            return false ; 
        }
    
    }
    
    if (isError || !validateDay()) {
        clearDisplay();
        dateContainerInputs.forEach(element => {
            element.classList.add('border-light-Red');
        });
        
    } else {
        dateContainerInputs.forEach(element => {
            element.classList.remove('border-light-Red');
        });
        
        //Means no error 
        // Call age function to caluclate age & insert into disokay eelemnts
        const display = calculateAge(day,month,year);
        console.log(display[0] , display[1] , display[2]);
        yearDisplay.innerHTML = display[0];
        monthDisplay.innerHTML = display[1];
        dayDisplay.innerHTML = display[2];

        
        
    }
});

function addHidden(errorField, inputField, label) {
    errorField.classList.add('hidden');
    inputField.classList.remove('border-light-Red');
    label.classList.remove('text-light-Red');
}

function removeHidden(errorField, inputField, label) {
    errorField.classList.remove('hidden');
    inputField.classList.add('border-light-Red');
    label.classList.add('text-light-Red');
}


// Check for leap years
const isLeapYear = (year) => {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    } else {
        return false;
    }
}

// Validate the days of a month function
const isValidDay = (day, month, year) => {
    const daysOfMonth = [0, 31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > 0 && day <= daysOfMonth[month]) {
        return true;
    } else {
        return false;
    }
}

// Calculate age
function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // Subtract 1 from month since month is zero-based in JavaScript Date constructor
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const daysOfMonth = [0, 31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let months = 0;
    let days = 0;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--; // Subtract 1 year if birthday hasn't occurred yet this year
        months = 12 - Math.abs(monthDiff); // Calculate months remaining until birthday
        if (dayDiff < 0) {
            days = daysOfMonth[birthDate.getMonth()] - birthDate.getDate() + today.getDate(); // Calculate days remaining until birthday
        } else {
            days = dayDiff; // Birthday is in current month but hasn't occurred yet
        }
    } else {
        months = Math.abs(monthDiff);
        days = dayDiff;
    }

    return [age, months, days];
}




// Clear display
function clearDisplay (){
    yearDisplay.innerHTML = '--';
        monthDisplay.innerHTML = '--';
        dayDisplay.innerHTML = '--';
}
// insert in dipslay 
