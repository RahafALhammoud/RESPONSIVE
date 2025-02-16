let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let imgBtn = document.querySelectorAll('.img-btn');

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});
imgBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#img-slider').src = src;
    });
});



function changeFontSize(scale) {
    document.documentElement.style.fontSize = (16 * scale) + "px"; 
}


document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("bookingForm");
const bookingsList = document.getElementById("bookingsList");
const recurringDaysContainer = document.getElementById("recurringDaysContainer");
const recurringDaysInput = document.getElementById("recurringDays");
const bookings = [];

document.getElementById("recurringTrip").addEventListener("change", function () {
    recurringDaysContainer.style.display = this.checked ? "block" : "none";
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const fullName = document.getElementById("fullName").value;
    const userType = document.getElementById("userType").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const departure = document.getElementById("departure").value;
    const destination = document.getElementById("destination").value;
    const dateTime = document.getElementById("dateTime").value;
    const roundTrip = document.getElementById("roundTrip").checked;
    const recurringTrip = document.getElementById("recurringTrip").checked;
    const recurringDays = recurringTrip ? recurringDaysInput.value : "";

    if (!validatePhoneNumber(phoneNumber)) {
        alert("Ogiltigt telefonnummer. Vänligen ange ett korrekt nummer.");

        return;
    }

   
    
    const booking = {
        fullName,
        userType,
        phoneNumber,
        departure,
        destination,
        dateTime,
        roundTrip,
        recurringTrip,
        recurringDays
    };
    
    bookings.push(booking);
    updateBookingsList();
    form.reset();
    recurringDaysContainer.style.display = "none";
});

function updateBookingsList() {
bookingsList.innerHTML = "";
bookings.forEach((booking, index) => {
const div = document.createElement("div");
div.classList.add("trip-item");
div.innerHTML = `
<p><strong>Namn:</strong> ${booking.fullName}</p>
<p><strong>Användartyp:</strong> ${booking.userType}</p>
<p><strong>Telefonnummer:</strong> ${booking.phoneNumber}</p>
<p><strong>Avresa:</strong> ${booking.departure} ➝ <strong>Destination:</strong> ${booking.destination}</p>
<p><strong>Datum och tid:</strong> ${booking.dateTime}</p>
${booking.roundTrip ? "<p><strong>Resa:</strong> Tur och retur</p>" : ""}
${booking.recurringTrip ? `<p><strong>Återkommande dagar:</strong> ${booking.recurringDays}</p>` : ""}
<button class="edit-btn" onclick="editBooking(${index})">✏ Ändra</button>
<button class="delete-btn" onclick="deleteBooking(${index})">🗑 Ta bort</button>
`;

bookingsList.appendChild(div);
});
}



window.deleteBooking = function (index) {
    bookings.splice(index, 1);
    updateBookingsList();
};

window.editBooking = function (index) {
    const booking = bookings[index];
    document.getElementById("fullName").value = booking.fullName;
    document.getElementById("userType").value = booking.userType;
    document.getElementById("phoneNumber").value = booking.phoneNumber;
    document.getElementById("departure").value = booking.departure;
    document.getElementById("destination").value = booking.destination;
    document.getElementById("dateTime").value = booking.dateTime;
    document.getElementById("roundTrip").checked = booking.roundTrip;
    document.getElementById("recurringTrip").checked = booking.recurringTrip;
    recurringDaysContainer.style.display = booking.recurringTrip ? "block" : "none";
    document.getElementById("recurringDays").value = booking.recurringDays;
    
    deleteBooking(index);
};

function validatePhoneNumber(phone) {
    return /^\d{10,15}$/.test(phone);
}

function validateDateTime(dateTime) {
    return /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} [APap][Mm]$/.test(dateTime);
}
});


function speakText(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'sv-SE';  
    window.speechSynthesis.speak(speech);
}
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.onstart = function() {
    console.log('Voice recognition started. Speak into the microphone.');
};

recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log('User said: ' + command);

    if (command.includes('hem')) {
        window.location.hash = '#home';  
    } else if (command.includes('boka')) {
        window.location.hash = '#book'; 
    }
};

function startRecognition() {
    recognition.start();
}
