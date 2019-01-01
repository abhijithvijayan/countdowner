var UIController = (function() {

    const DOMStrings = {
        daysCount: ".timer__content--days",
        hourCount: ".timer__content--hours",
        minCount: ".timer__content--minutes",
        secCount: ".timer__content--seconds",
    }

    let update = (pos, value) => {
        document.querySelector(pos).textContent = value;
    };

    const getTrueNumber = (num) => (num < 10 ? "0" + num : num);

    return {

        updateUIElements: (obj) => {
            update(DOMStrings.daysCount, getTrueNumber(obj.days));
            update(DOMStrings.hourCount, getTrueNumber(obj.hours));
            update(DOMStrings.minCount, getTrueNumber(obj.minutes));
            update(DOMStrings.secCount, getTrueNumber(obj.seconds));
        }
    }

})();

var globalController = (function() {

    let getDate = () => {
        let dateNow, dateFuture, seconds, minutes, hours, days, cutoff;

        dateNow = new Date();
        // console.log(dateNow);
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

        // new Date(2014, 1, 1) creates a date for 2014-02-01 
        dateFuture = new Date(new Date().getFullYear() +1, 0, 1);

        seconds = Math.floor((dateFuture - dateNow) / 1000);
        cutoff = seconds;
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            cutoff: cutoff
        }

    };

    return {

        init: () => {
            countdown = getDate();
            return countdown.cutoff;
        }

    };

})();

let countdownCall = setInterval(() => {
    let countDownVal = globalController.init();
    // stop timer
    if (countDownVal <= 0) {
        clearInterval(countdownCall);
        document.getElementById('timer__content--inner').textContent = "New Year Wishes!!";
    } 
    else {
        UIController.updateUIElements(countdown);
    }
}, 1000);