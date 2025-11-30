let timeout;
let timeinterval;

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

function loadpage(time1,time2) {
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

let i = 0;
let j = 0;
let currentMessage = '';
let isDeleting = false;
const speed = 100; // Typing speed in ms

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
