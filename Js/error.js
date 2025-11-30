let timeouted;
let iserror = true;


function lenerror(active, numL, numH) {
    const low = active.length < numL
    const high = active.length > numH
    if (high || low) {
        return true
    }
    return false
}


function alerting(className, errorSpace, erroricon, icon, message) {
    $(className).find(errorSpace).html(message);
    $(className).find(erroricon).text(icon);
    $(className).show();
    timeouted = setTimeout(function () {
        $(className).fadeOut();
    }, 3000);
}

function passwordError(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
        return "Password must contain both letters and numbers";
    }
    if (lenerror(password, 5, 8)) {
        return "Password must be 5-8 characters"
    };
    return "";
}

function gmailerror(email) {
    const requiredEnd = "@gmail.com";
    const symbolRegex = /[!#$%^&*(),?":{}|<>]/;

    if (!email.endsWith(requiredEnd)) {
        return `Email must end with ${requiredEnd}`;
    }

    const firstChar = email.charAt(0);
    if (!/[a-zA-Z]/.test(firstChar)) {
        return "First character must be a letter";
    }

    if (symbolRegex.test(email)) {
        return "Email must not contain symbols (!#$%^&*, etc.)";
    }

    const username = email.slice(0, -10);
    if (!/^[a-zA-Z0-9.]+$/.test(username)) {
        return "Email can only contain letters, numbers, and dots (.) before @gmail.com";
    }

    const len = lenerror(email, 13, 24);
    if (len) {
        return "Email must be 13-24 characters";
    }

    return "";
}

function checkEditName(input) {
    // !/^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(input)
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(input)) {
        return "Only First name and Last name is required | <span class='warning'>Name can only be letters</span>";
    }

    const [firstName, lastName] = input.split(' ');

    if (lenerror(firstName, 3, 20)) {
        return "First name must be 3-20 characters";
    }

    if (lenerror(lastName, 3, 20)) {
        return "Last name must be 3-20 characters";
    }

    return "";
}

function checkEditBirth(input) {
    const age = calculateAge(input);
    if (age < 16) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "You must be at least 16 years old.");
        return true
    }
    return false
}


$(document).ready(function () {

    $(".password").on("input", function () {
        const password = $(this).val().trim();
        const warn = $(this).closest('form').find('.warn');
        const eyelid = $(this).siblings('.eye').find('.eyelid');
        const pupil = $(this).siblings('.eye').find('.pubdy');
        const passwordErrorCheck = passwordError(password)
        if (!password) {
            eyelid.removeClass('erroreye');
            pupil.removeClass('errorpupil');
        } else {
            if (passwordErrorCheck) {
                eyelid.addClass('erroreye');
                pupil.addClass('errorpupil');
                warn.removeClass('strong');
            } else {
                clearTimeout(timeouted);
                $(".alerted").fadeOut();
                eyelid.removeClass('erroreye');
                pupil.removeClass('errorpupil');
                warn.addClass('strong');
            }
        }
    });



    $("form").submit(function (e) {
        e.preventDefault();
        const password = $(this).find('.password').val().trim();
        const email = $(this).find('.email').val().trim();
        const emailError = gmailerror(email)
        const passwordErrorCheck = passwordError(password)
       
        if (passwordErrorCheck || emailError) {
            iserror = true;
        }
        if (emailError) {
            alerting(".alerted", ".errormes", ".erroricon", "👀", `Invalid Email | <span class="warning">${emailError}</span>`);
            return;
        }
        if (passwordErrorCheck) {
            alerting(".alerted", ".errormes", ".erroricon", "👀", `${passwordErrorCheck}`);
            return;
        }

       
    });
});