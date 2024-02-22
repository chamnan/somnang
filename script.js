var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: ''
    }
});
var greeting = new Vue({
    el: '#greeting',
    data: { greet: ''}
});

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
setInterval(updateContent, 1000);
updateContent();

function updateContent() {
    var cd = new Date();            
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    
    var hours = cd.getHours();            
    if (hours < 12)
        greeting.greet = 'Good Morning';
    else if (hours >= 12 && hours <= 17)
        greeting.greet = 'Good Afternoon';
    else if (hours >= 17 && hours <= 24)
        greeting.greet = 'Good Evening';
};

function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}