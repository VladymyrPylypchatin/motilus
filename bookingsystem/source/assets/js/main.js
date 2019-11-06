let booking = new BookingView();
booking.run();
let invalidForms = document.querySelectorAll(".not-action");
invalidForms.forEach((form)=>{
    form.addEventListener("submit", function(event){
        event.preventDefault();
    });
});