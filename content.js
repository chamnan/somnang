let clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: ''
    }
});
let greeting = new Vue({
    el: '#greeting',
    data: { greet: ''}
});

let week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

setInterval(updateContent, 1000);
updateContent();

function updateContent() {
    let cd = new Date();            
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    
    let hours = cd.getHours();            
    if (hours < 12)
        greeting.greet = 'Good Morning';
    else if (hours >= 12 && hours <= 17)
        greeting.greet = 'Good Afternoon';
    else if (hours >= 17 && hours <= 24)
        greeting.greet = 'Good Evening';
};

function zeroPadding(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}