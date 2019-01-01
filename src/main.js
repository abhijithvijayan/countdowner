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

    return {

        updateUIElements: (obj) => {
            update(DOMStrings.daysCount, obj.days);
            update(DOMStrings.hourCount, obj.hours);
            update(DOMStrings.minCount, obj.minutes);
            update(DOMStrings.secCount, obj.seconds);
        }
    }

})();

var globalController = (function(UICtrl) {

    let getDate = () => {
        let dateNow, dateFuture, seconds, minutes, hours, days;

        dateNow = new Date();
        console.log(dateNow);
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

        // new Date(2014, 1, 1) creates a date for 2014-02-01 
        dateFuture = new Date(new Date().getFullYear() + 1, 0, 1);
        console.log(dateFuture);

        seconds = Math.floor((dateFuture - dateNow) / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        console.log(days);
        console.log(hours);
        console.log(minutes);
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }

    };


    return {

        init: () => {
            countdown = getDate();
            console.log(countdown);
            UICtrl.updateUIElements(countdown);
        }

    };

})(UIController);

globalController.init();