let accountId = null;
let timeouted;
let iserror = true;
let timeout;
let timeinterval;
let i = 0;
let j = 0;
let currentMessage = '';
let isDeleting = false;
const speed = 100; // Typing speed in ms


function Bank() {
    this.Accounts = {}
    this.userId;
    this.cashBack = 0.19
}

Bank.prototype.AcctId = function () {
    this.userId = generateMixedId();
    return this.userId;
}

Bank.prototype.AddAcount = function (account) {
    account.id = this.AcctId();
    this.Accounts[account.id] = account;
}

Bank.prototype.findAccount = function (id) {
    if (this.Accounts[id] !== undefined) {
        return this.Accounts[id];
    }
    return false;
}

function Account(username, emailaddress, dateofbirth, nin, password, balance, accountnumber) {
    this.userName = username;
    this.emailAddress = emailaddress;
    this.dateOfBirth = dateofbirth;
    this.NIN = nin;
    this.password = password;
    this.balance = balance;
    this.accountnumber = accountnumber;
    this.BVN = bvnNumber()
    this.bankName = 'Fɭo₩Ca$h';
    this.transactions = []
}

function generateMixedId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000)
}


function bvnNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000)
}


function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
}


const bank = new Bank()


function checkDuplicate(input1, input2) {
    const account = bank.findAccount(accountId);

    for (const id in bank.Accounts) {
        if (bank.Accounts.hasOwnProperty(id)) {
            const accountbank = bank.Accounts[id];

            if (accountbank.id === account.id) continue;

            if (accountbank.userName.toLowerCase() === input1.toLowerCase()) {
                iserror = true
                return "Username";
            }

            if (accountbank.emailAddress.toLowerCase() === input2.toLowerCase()) {
                iserror = true
                return "Email";
            }
        }
    }

    return ""; // No duplicates
}


function validateAlert(username, emailaddress, dateofbirth, nin, password) {
    const duplicateField = checkDuplicate(username, emailaddress);
    const checkEditUserName = checkEditName(username)
    const passwordErrorCheck = passwordError(password)
    const emailError = gmailerror(emailaddress)
    const age = calculateAge(dateofbirth);

    if (!username || !emailaddress || !dateofbirth || !nin || !password) {
        alerting(".alerted", ".errormes", ".erroricon", "⚠", "Please fill in all fields.");
        return;
    }

    if (checkEditUserName) {
        console.log('oh');
        alerting(".alerted", ".errormes", ".erroricon", "👀", `${checkEditUserName}`);
        return;
    }
    if (emailError) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", `Invalid Email |  <span class="warning">${emailError}</span>`);
        return;
    }
    if (age < 16) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "You must be at least 16 years old to create an account.");
        return;
    }
    if (lenerror(nin, 11, 11)) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "NIN must be 11 characters");
        return;
    }
    if (passwordErrorCheck) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", `${passwordErrorCheck}`);
        return;
    }

    if (duplicateField) {
        alerting(".alerted", ".errormes", ".erroricon", "⚠", ` <span class="warning">${duplicateField}</span> already exists`);
        return;
    }
}

function validateInput(username, emailaddress, dateofbirth, nin, password) {
    const duplicateField = checkDuplicate(username, emailaddress);
    const checkEditUserName = checkEditName(username)
    const passwordErrorCheck = passwordError(password)
    const emailError = gmailerror(emailaddress)
    const age = calculateAge(dateofbirth);

    if (!username || !emailaddress || !dateofbirth || !nin || !password) {
        iserror = true;
        return true;
    }
    if (age < 16 || passwordErrorCheck || lenerror(nin, 11, 11) || checkEditUserName || emailError || duplicateField) {
        iserror = true;
        return true;
    }
    iserror = false;
    return false
}

function createAccount(username, emailaddress, dateofbirth, nin, password, balance, accountnumber) {

    validateAlert(username, emailaddress, dateofbirth, nin, password)
    const valid = validateInput(username, emailaddress, dateofbirth, nin, password)

    if (!valid) {
        const newAccount = new Account(
            username,
            emailaddress,
            dateofbirth,
            nin,
            password,
            balance,
            accountnumber,
        );


        bank.AddAcount(newAccount)

        alerting(".alerted", ".errormes", ".erroricon", "✅", "Account created successfully!");
        console.log(bank)

        $('#showLogin').trigger('click');

    }
}

function bindId(accountId) {
    const account = bank.findAccount(accountId);
    $('.balance,.name,.birth,.emailed,.accountnum,.accountnumd, .accountno,.nin,.bvn,.profile,.logout,.beye,.eyelid,.bankopt,.btnsmon,.amount,.history,.his,.typejs,.edit,.done,.named,.copy').attr('id', account.id);
}


function showAccount(accountId) {

    const account = bank.findAccount(accountId);
    if (!account) {
        return;
    }

    $(`#${account.id}.balance`)
        .val(
            parseFloat(account.balance)
                .toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
        );


    $(`#${account.id}.name`).val(account.userName);
    $(`#${account.id}.named`).text(`Hello ${account.userName}`);
    $(`#${account.id}.birth`).val(account.dateOfBirth);
    $(`#${account.id}.emailed`).val(account.emailAddress);
    $(`#${account.id}.accountnum`).val(account.accountnumber);
    $(`#${account.id}.accountnumd`).text(account.accountnumber);
    $(`#${account.id}.nin`).val(account.NIN);
    $(`#${account.id}.bvn`).val(account.BVN);
    displayTransactions(account.id)
    attachEventListeners()

    const pupil = $(`#${account.id}.beye`).find('.pubdy');
    if (account.balance <= 200) {
        pupil.addClass('errorpupil');
    } else if (account.balance >= 200) {
        pupil.removeClass('errorpupil');
    }
}

function numericAmounts(amount) {
    let numericAmount;
    if (typeof amount === 'string') {
        numericAmount = Number(amount.split(',').join(''));
    } else {
        numericAmount = Number(amount);
    }
    return numericAmount
}

function validateAmount(amount) {
    let numericAmount = numericAmounts(amount)
    // Validate the amount
    if (isNaN(numericAmount)) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "Please enter a valid amount.");
        return;
    }

    if (numericAmount <= 200) {
        alerting(".alerted", ".errormes", ".erroricon", "🤨", "Amount must be greater than $200.");
        return;
    } else if (numericAmount > 300000) {
        alerting(".alerted", ".errormes", ".erroricon", "🤨", "Amount must be less than $300,000.");
        return;
    }

    return true

}

function htmltransaction(info1, action, actionclass, sign, amount) {
    const transact = `
        <div class="activity-item">
            <div class="activity-left">
                <div>
                    <div>${info1}</div>
                    <small>${action}</small>
                </div>
            </div>
            <div class="${actionclass}">${sign} $${amount.toLocaleString()}</div>
        </div>
     `
    return transact
}

function withdraw(accountId, amount) {
    validateAmount(amount)
    let numericAmount = numericAmounts(amount)
    const account = bank.findAccount(accountId);
    const balance = Number(account.balance);

    if (numericAmount > balance) {
        alerting(".alerted", ".errormes", ".erroricon", "🙄", "Insufficient funds.");
        return;
    }

    if (validateAmount(amount) && numericAmount <= balance) {
        const newBalance = balance - numericAmount;
        account.balance = newBalance + bank.cashBack;

        account.transactions.push(
            htmltransaction(account.userName, 'Debit', 'red', '-', numericAmount)
        );

        showAccount(accountId);
        loadpage(300, 10);
        clearTimeout(timeouted)
        alerting(".alerted", ".errormes", ".erroricon", "✅",
            `Withdrawal of $${numericAmount.toLocaleString()} successful!`);
        setTimeout(() => {
            clearTimeout(timeouted)
            alerting(".alerted", ".errormes", ".erroricon", "🤝", `Cashback of $${bank.cashBack} recevied 🤗`);
        }, 2400);

    }
}

function deposit(accountId, amount) {
    validateAmount(amount)
    let numericAmount = numericAmounts(amount)
    const account = bank.findAccount(accountId);
    const balance = Number(account.balance);

    if (validateAmount(amount)) {
        const newBalance = balance + numericAmount;
        account.balance = newBalance + bank.cashBack;

        account.transactions.push(
            htmltransaction(account.userName, 'Credit', 'green', '+', numericAmount)
        );
        showAccount(accountId);
        loadpage(300, 10);
        clearTimeout(timeouted)
        alerting(".alerted", ".errormes", ".erroricon", "✅", `Deposite of $${numericAmount.toLocaleString()} successful!`);
        setTimeout(() => {
            clearTimeout(timeouted)
            alerting(".alerted", ".errormes", ".erroricon", "🤝", `Cashback of $${bank.cashBack} recevied 🤗`);
        }, 2400);

    }
}

function transfer(accountId, amount, recipientAccountNumber, bankname) {
    // 1. Validate amount format
    validateAmount(amount)

    const numericAmount = numericAmounts(amount);
    const senderAccount = bank.findAccount(accountId);
    // 3. Validate recipient account exists and isn't sender
    let recipientAccount = null;
    for (const accountId in bank.Accounts) {
        if (bank.Accounts[accountId].accountnumber === recipientAccountNumber) {
            recipientAccount = bank.Accounts[accountId];
            break;
        }
    }

    if (!recipientAccount) {
        alerting(".alerted", ".errormes", ".erroricon", "⚠", "Recipient account not found");
        return false;
    }

    if (recipientAccount.bankName !== bankname) {
        alerting(".alerted", ".errormes", ".erroricon", "🏪❌", "Wrong Bank");
        return false;
    }

    if (recipientAccount.accountnumber === senderAccount.accountnumber) {
        alerting(".alerted", ".errormes", ".erroricon", "🙅", "Cannot transfer to yourself");
        return false;
    }

    // 4. Check sufficient balance
    if (Number(senderAccount.balance) < numericAmount) {
        alerting(".alerted", ".errormes", ".erroricon", "🙄", "Insufficient funds");
        return false;
    }

    // 5. PROCESS TRANSFER
    // Update balances
    senderAccount.balance = (Number(senderAccount.balance) - numericAmount + bank.cashBack).toFixed(2);
    recipientAccount.balance = (Number(recipientAccount.balance) + numericAmount).toFixed(2);

    // Record transactions
    const senderNote = `Transfer to ${recipientAccount.userName}`;
    const recipientNote = `Received from ${senderAccount.userName}`;

    senderAccount.transactions.push(
        htmltransaction(senderNote, 'Transfer', 'red', '-', numericAmount)
    );

    recipientAccount.transactions.push(
        htmltransaction(recipientNote, 'Receive', 'green', '+', numericAmount)
    );

    // 6. Update UI
    showAccount(accountId);
    clearTimeout(timeouted)// Refresh sender view
    alerting(".alerted", ".errormes", ".erroricon", "✅",
        `Transferred $${numericAmount.toLocaleString()} to ${recipientAccount.userName}`);
    setTimeout(() => {
        clearTimeout(timeouted)
        alerting(".alerted", ".errormes", ".erroricon", "🤝", `Cashback of $${bank.cashBack} recevied 🤗`);
    }, 2400);
    return true;
}

function displayTransactions(accountId) {
    const account = bank.findAccount(accountId)
    $('.trans').empty()
    account.transactions.forEach(function (trans) {
        $('.trans').prepend(trans)
    })
}

function copy(accountId, wattocopy) {
    const account = bank.findAccount(accountId)
    let ToCopy = account[wattocopy]
    let textToCopy = ToCopy;
    let tempTextarea = $("<textarea>");
    tempTextarea.val(textToCopy);
    $("body").append(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    $(tempTextarea).remove();
    alerting(".alerted", ".errormes", ".erroricon", "🔍", "Account Copied to Clipboard");
}

function attachEventListeners() {
    const account = bank.findAccount(accountId);
    $(`#${account.id}.btnsmon`).off('click').on('click', function () {

        const state = $(`#${account.id}.typejs`).text().trim();
        let amountInput = $(`#${account.id}.amount`).val().trim();
        let accountInput = $(`#${account.id}.accountno`).val().trim();
        let accountBankName = $(`#${account.id}.bankopt`).val();

        // Remove commas if present
        if (amountInput.includes(',')) {
            amountInput = amountInput.split(',').join('');
        }

        const numericAmount = Number(amountInput);

        if (state === 'Withdraw') {
            withdraw(account.id, numericAmount);
        } else if (state === 'Deposit' || state === 'Request') {
            deposit(account.id, numericAmount);
        } else if (state === 'Transfer') {
            transfer(account.id, numericAmount, accountInput, accountBankName)
            $(`#${account.id}.accountno`).val('')
        }

        // Clear input
        $(`#${account.id}.amount`).val('');
    });

    $(`#${account.id}.beye`).off('click').on('click', function () {
        const account = bank.findAccount(accountId);
        const $balanceInput = $(this).siblings('.balance');
        const $eyelid = $(this).find('.eyelid');
        const isOpening = !$eyelid.hasClass('opendeye');

        $eyelid.toggleClass('opendeye');

        if (isOpening) {
            // Restore the properly formatted value

            $balanceInput.val(
                parseFloat(account.balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );
        } else {
            // Just hide the value - no need to store since we'll regenerate it
            $balanceInput.val('**********');
        };
    });

    // Edit Button Click Handler
    $(`#${account.id}.edit`).off('click').on('click', function () {
        const $editButton = $(this);
        const $doneButton = $editButton.siblings('.done');
        const index = $('.edit').index(this);
        const fields = ['name', 'birth', 'emailed'];


        fields.forEach((field, i) => {
            const $field = $(`#${account.id}.${field}`);

            // Convert birth field to date input when editing


            if (i === index) {
                $field.prop('readonly', false)
                    .focus();
                $doneButton.show();
                $editButton.hide();
            } else {
                $field.prop('readonly', true);
            }

            if (field === fields[1] && i === index) {
                $field.prop('readonly', false)
                    .prop('type', 'date');
            }
        });

        // Hide other edit buttons
        $(`#${account.id}.edit`).not(this).hide();
        $(`.logout`).hide();
    });



    $(`#${account.id}.done`).off('click').on('click', function () {
        const $doneButton = $(this);
        const $editButton = $doneButton.siblings('.edit');
        const input = $doneButton.siblings(`input`)
        const index = $('.done').index(this);
        // Get input fields
        const $name = $(`#${account.id}.name`);
        const $email = $(`#${account.id}.emailed`);
        const $birth = $(`#${account.id}.birth`);



        checkEditBirth($birth.val())

        const checkEditUserName = checkEditName($name.val())
        const emailError = gmailerror($email.val())
        const duplicateField = checkDuplicate($name.val(), $email.val());

        if (duplicateField) {
            alerting(".alerted", ".errormes", ".erroricon", "⚠", ` <span class="warning">${duplicateField}</span> already exists`);
            return;
        }

        switch (index) {
            case 0: // Name
                if (!checkEditUserName) {
                    account.userName = $name.val();
                    $name.val(account.userName);
                } else {
                    alerting(".alerted", ".errormes", ".erroricon", "🔣", `${checkEditUserName}`);
                }
                break;
            case 1: // Email
                if (!checkEditBirth($birth.val()) && $birth.val()) {
                    $birth.prop('type', 'text');
                    account.dateOfBirth = $birth.val().trim();
                    $birth.val(account.dateOfBirth);
                } else {
                    alerting(".alerted", ".errormes", ".erroricon", "⚠", `Fill in date`);
                }

                break;
            case 2:
                if (!emailError) {
                    account.emailAddress = $email.val().trim();
                    $email.val(account.emailAddress);
                } else {
                    alerting(".alerted", ".errormes", ".erroricon", "⚠", `${emailError}`);
                }
                break;
        }

        if (!checkEditUserName && !checkEditBirth($birth.val()) && $birth.val() && !emailError) {
            input.prop('readonly', true);
            $doneButton.hide();
            $editButton.show();

            // Show all edit buttons again
            $(`#${account.id}.edit`).show();
            $(`.logout`).show();
        }

    });


    $(`#${account.id}.his`).off('click').on('click', function () {
        if (account.transactions.length > 0) {
            $(".history").slideToggle()
        } else if (account.transactions.length <= 0) {
            alerting(".alerted", ".errormes", ".erroricon", "⬛", "History is empty make some transactions");
        }
    })


    $(`#${account.id}.copy`).off('click').on('click', function () {
        copy(accountId, 'accountnumber')
    });

};


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





function tostringed(inputed) {
    return inputed.toLocaleString()
}


function intialitem(item1, item2, obj1, obj2) {
    $(item1).text(obj1)
    $(item2).text(obj2)
}

function dropWater(elm, item, classname, efft, obj1, obj2) {
    $(item).text(obj1)
    $(elm).addClass(classname)
    timeout = setTimeout(function () {
        $(efft).show()
        setTimeout(function () {
            $(efft).hide()
        }, 300)
        $(item).text(obj2)
        setTimeout(function () {
            $(elm).removeClass(classname)
            $(item).text('')
        }, 2300)
    }, 2000)

}

function loadpage(time1, time2) {
    $(".loader").show()
    $(".accountpage").fadeOut(time2)
    setTimeout(() => {
        $(".mybankpage").fadeIn(time2)
        setTimeout(() => {
            $(".loader").fadeOut()
        }, time2);
    }, time1);
}

function blinkEye() {
    $('.eyelid').addClass('blinked');
    setTimeout(() => {
        $('.eyelid').removeClass('blinked');
    }, 100);
}
const messages = [
    "Welcome back to your Trusted Bank",
    "Your security is our top priority",
    "✓ 60-second account setup",
    "✓ 24/7 fraud monitoring",
    "Banking that adapts to your ambitions",
    "Earn 3.5% APY on your savings today",
    "Join 2M+ customers who trust us",
];


function typeWriter() {
    const element = document.getElementById("typing-text");

    if (i < messages.length) {
        if (!isDeleting && j <= messages[i].length) {
            currentMessage = messages[i].substring(0, j);
            j++;
            element.innerHTML = currentMessage + '<span class="cursor-blink">|</span>';
            setTimeout(typeWriter, speed);
        }
        else if (isDeleting && j >= 0) {
            currentMessage = messages[i].substring(0, j);
            j--;
            element.innerHTML = currentMessage + '<span class="cursor-blink">|</span>';
            setTimeout(typeWriter, speed / 2);
        }
        else {
            isDeleting = !isDeleting;
            if (!isDeleting) i++;
            if (i >= messages.length) i = 0;
            setTimeout(typeWriter, 2000);
        }
    }
}


// 65
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

    $(".monbtn").click(function () {
        const account = bank.findAccount(accountId)
        const index = $('.monbtn').index(this)
        const clickedOn = $(this)
        const moneyClass = ['Withdraw', 'Deposit', 'Request', 'Transfer', 'Transfer', 'Deposit']
        $(".casf").slideDown()
        $('.monbtn').removeClass('acting')
        $("#amount").removeClass()
        moneyClass.forEach((item, i) => {
            if (i === index) {


                $(".typejs").text(item)
                $("#amount").addClass(`.${item.toLowerCase()}`)
                if (item === moneyClass[0] || item === moneyClass[1] || item === moneyClass[2]) {
                    $(`#${account.id}.bankopt option:eq(0)`).prop('selected', true);
                    $(`#${account.id}.accountno`).val(account.accountnumber)
                    $('.bankopt, .accountno').prop('disabled', true)
                } else {
                    $(`#${account.id}.accountno`).val('')
                    $('.bankopt, .accountno').prop('disabled', false)
                }
                $(".amount").prop('placeholder', `amount to ${item}`)
                clickedOn.addClass('acting')
            }
        })
    })

    $(".close").click(function () {
        $('.monbtn').removeClass('acting')
        $(".casf").fadeOut()
    })

    $(".close-alert").click(function () {
        $('.alerted').slideUp()
    })
    $(".opt").click(function () {
        $(".log").slideToggle()
        $(".profile-info").hide()
        $(".profile").removeClass('half')
    })



    $(".profile").click(function () {
        $(".profile-info").slideToggle()
        $(".profile").toggleClass('half')

    })
    $(".cover").click(function () {
        $(".cover").removeClass("covered")
        $(this).addClass('covered')
    })
    $('.tab-btn').click(function () {
        const clicked = $(this)
        const warn = $('.warn');
        $('.tab-btn').removeClass('active')
        if (clicked.has('.active')) {
            clicked.toggleClass('active')
        }
        if (clicked.notHas('.active')) {
            $('#username').val('');
            $('#emailaddress').val('');
            $('#dateofbirth').val('');
            $('#nin').val('');
            $('#password').val('');
            warn.removeClass('strong');
        }
    })

    $("#showSignup").click(function () {
        $("#signupForm").show()
        $("#loginForm").hide()
    })

    $("#showLogin").click(function () {
        $("#signupForm").hide()
        $("#loginForm").show()
    })

    $(".eyes").click(function () {
        const clickOn = $(this)
        const inputOf = clickOn.closest('.input-group').find('input')
        const eyelid = clickOn.find('.eyelid')
        eyelid.toggleClass('opendeye');



        const currentType = inputOf.prop('type')
        inputOf.prop('type', currentType === 'password' ? 'text' : 'password')

    })

    $("form").submit(function (e) {
        e.preventDefault()
    })

    function displayAccount() {
        const loginemailaddress = $('#loginemailaddress').val();
        const loginPassword = $('#loginpassword').val();

        // Check for empty fields
        if (!loginemailaddress || !loginPassword) {
            alerting(".alerted", ".errormes", ".erroricon", "⚠", "Please fill in all fields.");
            return;
        }

        let foundAccount = null;


        if (!gmailerror(loginemailaddress)) {
            // Loop through all accounts to find matching email
            for (const id in bank.Accounts) {
                const account = bank.findAccount(id); // Using your existing method
                if (account && account.emailAddress.toLowerCase() === loginemailaddress.toLowerCase()) {
                    foundAccount = account;
                    accountId = id; // Store the account ID
                    break;
                }
            }


            if (!foundAccount) {
                alerting(".alerted", ".errormes", ".erroricon", "⭕", "Account Does not Exist");
                return;
            }
            if (foundAccount.password !== loginPassword) {
                alerting(".alerted", ".errormes", ".erroricon", "❌", "Incorrect password.");
                return;
            }

            $('#loginemailaddress').val('');
            $('#loginpassword').val('');
            alerting(".alerted", ".errormes", ".erroricon", "👍", "Login successful!");
            setTimeout(() => {
                loadpage(7000, 2000)
                bindId(accountId);
                showAccount(accountId);
            }, 1000);
        }
    }




    $('#signupforms').submit(function () {
        let eye = $(this).find('.eyes')
        const username = $('#username').val().trim();
        const emailaddress = $('#emailaddress').val();
        const dateofbirth = $('#dateofbirth').val();
        const nin = $('#nin').val();
        const password = $('#password').val().trim();
        const balance = 0;
        const accountnumber = generateAccountNumber().toString();
        const warn = $('.warn');

        createAccount(username, emailaddress, dateofbirth, nin, password, balance, accountnumber);
        // Clear form
        if (!iserror) {
            if (eye.has('.opendeye')) {
                eye.trigger('click')
            }
            warn.removeClass('strong');
            $('#username').val('');
            $('#emailaddress').val('');
            $('#dateofbirth').val('');
            $('#nin').val('');
            $('#password').val('');
        }

    });


    $('#loginforms').submit(function () {
        displayAccount()
    });

    $(".logout").click(function () {
        accountId = null
        $(".accountpage").show()
        $('.monbtn').removeClass('acting')
        $(".profile").removeClass('half')
        $(".out").hide()
        iserror = true;
    })
    $('.balance').each(function () {
        const $balanceInput = $(this);

        // Convert to number FIRST, then format
        const numericValue = parseFloat($balanceInput.val()) || 0;
        const fixedValue = parseFloat(numericValue.toFixed(2)); // Keep as number

        $balanceInput.val(fixedValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));

        $balanceInput.data('original-value', fixedValue);
        $balanceInput.siblings('.eye').find('.eyelid').addClass('opendeye');
    });
    typeWriter()
    blinkEye()
    setInterval(blinkEye, 4000);
    intialitem('.wat', '.splash', '💧', '💦')
    timeinterval = setInterval(() => {
        clearTimeout(timeout)
        dropWater('.water', '.wat', 'Awater', '.splash', '💧', '💵')
    }, 4400)

    const pupil = document.querySelectorAll('.pubdy');

    let timeout;

    // Eye movement range (px from center)
    const maxMovement = 10;

    document.addEventListener('mousemove', (e) => {
        // Clear any pending reset
        clearTimeout(timeout);

        // Get mouse position as percentage
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;


        // Calculate pupil position (inverse movement)
        const leftX = -(0.5 - x) * maxMovement * 2;
        const leftY = -(0.5 - y) * maxMovement;


        pupil.forEach(pupil => {
            pupil.style.transform = `translate(calc(-50% + ${leftX}px), calc(-50% + ${leftY}px))`;
        })

        // Set reset timer when mouse stops
        timeout = setTimeout(resetPupils, 1000);
    });

    function resetPupils() {
        pupil.forEach(pupil => {
            pupil.style.transform = 'translate(-50%, -50%)';
        })
    }
})
