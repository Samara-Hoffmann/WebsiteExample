/********w************
    
    Project 3 Javascript
    Name: Robinpreet Kaur Malhi
    Date: August 11 2023
    Description: Javascript for Project 4

********************/
function validate(e) {
    // Hides all error elements on the page
    hideErrors();

    // Determine if the form has errors
    if (formHasErrors()) {
        // Prevents the form from submitting
        e.preventDefault();
        return false;
    }
    alert("Thank you! Your reservation request has been received. The confirmation email will be delivered to you shortly.");

    return true;
}

function clearForm(e) {
    // Confirm that the user wants to clear the form.
    if (confirm('Clear reservation details?')) {
        // Hide all error messages 
        hideErrors();

        document.getElementById("fullname").value = "";
        document.getElementById("guests").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("email").value = "";
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
        document.getElementById("requirements").value = "";

        // Set focus to the full name field
        document.getElementById("fullname").focus();

        return true;
    }

    // Prevent the form from clearing
    e.preventDefault();

    return false;
}

function formHasErrors() {
    let errorFlag = false; // true when there is atleast one error
    let selectFlag = false; // true when the field with error is given focus/select

    // validation of full name field
    let fullName = document.getElementById("fullName");

    if (!formFieldHasInput(fullName)) {
        //Show fullName required message since fullname field is empty
        document.getElementById("fullName_error").style.display = "block";


        //set focus and select the text in this field
        if (!selectFlag) {
            fullName.focus();
            fullName.select();
            selectFlag = true;
        }
        errorFlag = true;
    }

    //validation of guests field
    //regular expression to check that user enters 1 or more guests
    let regexForGuests = new RegExp(/^[1-9]\d*$/);
    let guests = document.getElementById("guests");

    if (!formFieldHasInput(guests)) {
        //Show guests required message since guests field is empty
        document.getElementById("guests_error").style.display = "block";
        errorFlag = true;

        //set focus and select the text in this feild
        if (!selectFlag) {
            guests.focus();
            guests.select();
            selectFlag = true;
        }
    }
    else if (!regexForGuests.test(guests.value)) {
        //Show guest number invalid error since the entered guest number is less than 1
        document.getElementById("noGuests_Error").style.display = "block";
        errorFlag = true;

        //set focus and select the value in this field
        if (!selectFlag) {
            guests.focus();
            guests.select();
            selectFlag = true;
        }
    }

    //Validation of phone number field
    //regular expession for setting format of phone number
    let regexForPhoneNumber = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);

    let phoneNumber = document.getElementById("phoneNumber");

    if (!formFieldHasInput(phoneNumber)) {
        //Show phone number required message since phone number field is empty
        document.getElementById("phoneNumber_error").style.display = "block";
        errorFlag = true;

        //set focus and select the text in this field
        if (!selectFlag) {
            phoneNumber.focus();
            phoneNumber.select();
            selectFlag = true;
        }
    }
    else if (!regexForPhoneNumber.test(phoneNumber.value)) {
        //Show phone number format error since the entered phone number is invalid
        document.getElementById("phoneNumberFormat_error").style.display = "block";
        errorFlag = true;

        //set focus and select the text in this field
        if (!selectFlag) {
            phoneNumber.focus();
            phoneNumber.select();
            selectFlag = true;
        }
    }

    // Validation of email field
    //regular expession for setting format of email
    let regexForEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    let email = document.getElementById("email");

    if (!formFieldHasInput(email)) {
        //Show email required message since email field is empty
        document.getElementById("email_error").style.display = "block";
        errorFlag = true;

        //set focus and select the text in this field
        if (!selectFlag) {
            email.focus();
            email.select();
            selectFlag = true;
        }
    }
    else if (!regexForEmail.test(email.value)) {
        //Show email format error since the entered email is invalid
        document.getElementById("emailFormat_error").style.display = "block";
        errorFlag = true;

        //set focus and select the text in this field
        if (!selectFlag) {
            email.focus();
            email.select();
            selectFlag = true;
        }
    }

    // validation of date and time field
    let reservationDate = document.getElementById("date");
    let reservationTime = document.getElementById("time");

    if (!formFieldHasInput(reservationDate) || !formFieldHasInput(reservationTime)) {
        if (!formFieldHasInput(reservationDate)) {
            //Show date required message since date field is empty
            document.getElementById("date_error").style.display = "block";
            errorFlag = true;

            //set focus and select the values in this field
            if (!selectFlag) {
                reservationDate.focus();
                reservationDate.select();
                selectFlag = true;
            }
        }
        else if (formFieldHasInput(reservationData) && !formFieldHasInput(reservationTime)) {
            let currentDate = new Date();
            let reservationDateValue = new Date(`${reservationDate.value}T23:59`);
            if (reservationDateValue < currentDate) {
                //date error message
            }
        }

        if (!formFieldHasInput(reservationTime)) {
            //Show time required message since time field is empty
            document.getElementById("time_error").style.display = "block";
            errorFlag = true;

            //set focus and select the values in this field 
            if (!selectFlag) {
                reservationTime.focus();
                reservationTime.select();
                selectFlag = true;
            }
        }
    }
    else if (formFieldHasInput(reservationDate) && formFieldHasInput(reservationTime)) {
        // using the Date object to get the current date and time
        let currentDate = new Date();
        //let reservationDateValue = new Date(`${reservationDate}T00:00`);
        let reservationValue = new Date(`${reservationDate.value}T${reservationTime.value}`);
        let reservationDateValue = new Date(`${reservationDate.value}T23:59`);

        //comparing the reservation date and time with the current date and time
        if (reservationValue < currentDate) {
            //either the date or time value is invalid
            if (reservationDateValue < currentDate) {
                //show date invalid error since the entered reservation date is less than the current date
                document.getElementById("dateInvalid_error").style.display = "block";
                errorFlag = true;

                //set focus on the field
                if (!selectFlag) {
                    reservationDate.focus();
                    selectFlag = true;
                }
            } else {
                //show time invalid error since the entered reservation time is less than the current time
                document.getElementById("timeInvalid_error").style.display = "block";
                errorFlag = true;

                //set focus on the field
                if (!selectFlag) {
                    reservationTime.focus();
                    selectFlag = true;
                }
            }
        }
    }



    return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
    // Get an array of error elements
    let error = document.getElementsByClassName("error");

    // Loop through each element in the error array
    for (let i = 0; i < error.length; i++) {
        // Hide the error element by setting it's display style to "none"
        error[i].style.display = "none";
    }
}

/*
 * Determines if a text field element has input
 *
 * param fieldElement A text field input element object
 * return True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
    // Check if the textbox has a value
    if (fieldElement.value == null || fieldElement.value.trim() == "") {
        // Invalid entry
        return false;
    }

    //valid entry
    return true;
}

/*
 * Handles the load event of the document.
 */
function load() {
    //calling hideError() function to hide the error messages when the page loads
    hideErrors();

    let hamburger = document.getElementById("hamburger");
    let navItem = document.getElementById("navItems");
    let restaurantLogo = document.getElementById("restaurantLogo");
    let name = document.getElementById("name");
    let header = document.getElementById("header");

    hamburger.addEventListener("click", function () {
        if (window.innerWidth <= 980) {
            if (navItem.style.display === "none" || navItem.style.display === "") {
                navItem.style.display = "flex";
                restaurantLogo.style.display = "none";
                name.style.display = "none";
                header.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            } else {
                navItem.style.display = "none";
                restaurantLogo.style.display = "block";
                name.style.display = "block";
                header.style.backgroundColor = "black";
            }
        }
    })

    // Add event listener for the form submit
    document.getElementById("reservationForm").addEventListener("submit", validate);

    // Add event listener for the form reset
    document.getElementById("reservationForm").addEventListener("reset", clearForm);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
