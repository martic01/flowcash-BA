

function tostringed(inputed) {
    return inputed.toLocaleString()
}

$(document).ready(function () {
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

})