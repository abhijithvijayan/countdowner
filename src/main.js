const DOMStrings = {
    daysCount: ".timer__content--days",
    hourCount: ".timer__content--hours",
    minCount: ".timer__content--minutes",
    secCount: ".timer__content--seconds",
    timer: "timer__content--inner"
};

let countDowner = setInterval(() => {
    let dateNow, dateFuture, seconds, minutes, hours, days, cutoff;

    dateNow = new Date();

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

    if (cutoff <= 0) {
        clearInterval(countDowner);
        document.getElementById(timer).textContent = "New Year Wishes!!";
    }
    else {
        update(DOMStrings.daysCount, getTrueNumber(days));
        update(DOMStrings.hourCount, getTrueNumber(hours));
        update(DOMStrings.minCount, getTrueNumber(minutes));
        update(DOMStrings.secCount, getTrueNumber(seconds));
    }

}, 1000);

// content updation
let update = (pos, value) => {
    document.querySelector(pos).textContent = value;
};

// append 0 to the number if < 10
const getTrueNumber = (num) => (num < 10 ? "0" + num : num);