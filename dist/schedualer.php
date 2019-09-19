<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>

<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="assets/css/main.css?v=6">

<div class="booking-system">
    <div class="booking-system__header">
        <div class="booking-system__header-component">
            <div class="controlls"></div>
            <div class="booking-system__title">Book Online</div>
        </div>
    </div>
    <div class="booking-system__body">
        <div class="notification-wrapper">
            <div class="notification">
                <div class="notification__loader">
                    <div class="lds-roller white small">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
                <div class="notification__text">Loading</div>
            </div>
        </div>
      
        <div class="tab isActive scrollable" id="select-service">
            <div class="tab__body">
                <div class="tab__inner-body">
                    <div class="service-list">
                        
                    </div>
                    <div class="booking-systme__loader">
                        <div class="dots-loader">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                          </div>
                    </div>
                </div>
                <!-- <div id="continue-service-select-btn" class="booking-system__button next-button hidden">Continue</div> -->
            </div>
        </div>
        <div class="tab isInactive isRHS" id="chose-datetime">
            <div class="tab__body justify">
                <div class="tab__inner-body">
                    <div class="calendar" id="booking-calendar">
                        <div class="calendar__header">
                            <div class="calendar__week-bounds">
                                <span class="week-begin" tabindex="-1">24 JUN</span>
                                -
                                <span class="week-end">30 JUN</span>
                            </div>
                            <div class="calendar__week-controlls">
                                <div class="prev-week controlls">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
                                        <g>
                                            <path
                                                d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" />
                                        </g>
                                    </svg>
                                </div>
                                <div class="next-week controlls">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
                                        <g>
                                            <path
                                                d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="calendar__dates">
                            <ul class="weekdays-list">
                                <li>Sun</li>
                                <li>Mon</li>
                                <li>Tue</li>
                                <li>Wed</li>
                                <li>Thu</li>
                                <li>Fri</li>
                                <li>Sat</li>
                            </ul>
                            <ul class="dates-list">
                                <li class="date-wrapper">
                                    <div class="date-list__date">00</div>
                                </li>
                                <li class="date-wrapper">
                                    <div class="date-list__date">00</div>
                                </li>
                                <li class="date-wrapper">
                                    <div class="date-list__date">00</div>
                                </li>
                                <li class="date-wrapper">
                                    <div class="date-list__date">00</div>
                                </li>
                                <li class="date-wrapper">
                                    <div class="date-list__date">00</div>
                                </li>
                                <li class="date-wrapper">
                                    <div class="date-list__date">00</div>
                                </li>
                                <li class="date-wrapper">
                                    <div class="date-list__date">00</div>
                                </li>
                            </ul>
                        </div>
                        <div class="callendar__selected-time info-box hidden">
                            <div class="time">Morning 8:30 am</div>
                            <div class="change">Change</div>
                        </div>
                        <div class="calendar__avalible-timeslots">
                            <div class="calendar__timslot-container morning">
                                    <div class="calendar__timslot-container-header">
                                        Morning
                                    </div>
                                    <div class="slots">
                                    </div>
                            </div>
                            <div class="calendar__timslot-container day">
                                    <div class="calendar__timslot-container-header">
                                        Afternoon
                                    </div>
                                    <div class="slots">
                                    </div>
                            </div>
                            <div class="calendar__timslot-container evening">
                                    <div class="calendar__timslot-container-header">
                                        Evening
                                    </div>
                                    <div class="slots">
                                    </div>
                            </div>
                        </div>
                        <div class="callendar-preloader hidden">
                            <div class="lds-roller big blue">
                                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div>
                        </div>
                        <div class="no-avalible-slots hidden">
                            No appointment slots available for this date. Choose a different date
                        </div>
                    </div>
                </div>
                <div id="continue-service-select-btn" class="booking-system__button next-button hidden">Book Now</div>
            </div>
        </div>
        <div class="tab isInactive isRHS" id="customer-info">
            <div class="tab__body">
                <div class="tab__inner-body">
                    <div class="customer-info">
                        <div class="customer-info__navigation info-box">
                            <div class="navigation-item active">Your Details</div>
                            <div id="nav-login" class="navigation-item">Login</div>
                        </div>
                        <form id="registration-form" class="not-action">
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="text" name="name" tabindex="-1" placeholder="Name">
                            </div>
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="eamil" name="email" tabindex="-1" placeholder="Email">
                            </div>
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="tel" name="phone" tabindex="-1" placeholder="Phone">
                            </div>
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="text" name="address" tabindex="-1" placeholder="Address">
                            </div>
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="text" name="city" tabindex="-1" placeholder="City">
                            </div>
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="text" name="state" tabindex="-1" placeholder="State">
                            </div>
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="text" name="zipcode" tabindex="-1" placeholder="ZIP Code">
                            </div>
                           
                        </form>
                    </div>
                </div>
                <div id="continue-service-select-btn" class="booking-system__button next-button">Continue</div>
            </div>
        </div>
        <div class="tab isInactive isRHS" id="new-password">
            <div class="tab__body">
                <div class="tab__inner-body">
                    <div class="customer-info">
                        <div class="info-box">
                            <div class="info-box__content">
                                <div class="info-box__header">Create an Account</div>
                                <div class="info-box__text">
                                    Please enter a password for faster and easier bookings. 
                                </div>
                            </div>
                        </div>
                        <form id="new-password-form" class="not-action">
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="password" tabindex="-1" name="password" placeholder="New password">
                            </div>
                        </form>
                    </div>
                </div>
                <div id="continue-service-select-btn" class="booking-system__button next-button">Continue</div>
            </div>
        </div>
        <div class="tab isInactive isRHS" id="add-card">
            <div class="tab__body">
                <div class="tab__inner-body">
                    <div class="customer-info">
                        <div class="info-box">
                            <div class="info-box__content">
                                <div class="info-box__header">Please enter your credit card details</div>
                                <div class="info-box__text">
                                    We will not charge your card until after your service is completed. Motil does not store your complete credit card information for your security.
                                </div>
                            </div>
                        </div>
                        <div class="tab__strong-text">Credit or debit card</div>
                        <form action="/charge" method="post" id="payment-form">
                            <div class="form-row">
                              <!-- <label for="card-element" display="none">
                                Credit or debit card
                              </label> -->
                              <div id="card-element">
                                <!-- A Stripe Element will be inserted here. -->
                              </div>
                          
                              <!-- Used to display form errors. -->
                              <div id="card-errors" role="alert"></div>
                            </div>
                        </form>
                    
                    </div>
                </div>
                <div id="continue-service-select-btn" class="booking-system__button next-button">Complete Booking</div>
            </div>
        </div>
        <div class="tab isInactive isRHS" id="select-account">
            <div class="tab__body">
                <div class="tab__inner-body">
                    <div class="info-box select-account">
                        <div class="info-box__content">
                            <div class="info-box__header">
                                Hi Vova
                            </div>
                            <div class="info-box__text">
                                You are logged in as: djdfyz123@gmail.com.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="continue-service-select-btn" class="booking-system__button next-button">Continue with current account</div>
                    <div  class="booking-system__button_light login-as-another">Login as Another User</div>
                </div>
            </div>
        </div>
        <div class="tab isInactive isRHS" id="booking-status">
            <div class="tab__body">
                <div class="tab__inner-body">
                    <div class="booking-status">
                        <div class="booking-status__image">
                            <div class="content">4</div>
                        </div>
                        <div class="booking-status__header">Proccessing</div>
                        <div class="booking-status__text">Please wait while we confirm your booking information</div>
                    </div>
                </div>
                <div id="back-to-home-btn" class="booking-system__button next-button hidden">Back to the home page</div>
            </div>
        </div>
        <div class="tab isInactive isRHS" id="login">
            <div class="tab__body justify">
                <div class="tab__inner-body">
                    <div class="customer-info">
                        <div class="customer-info__navigation info-box">
                            <div id="nav-create-account" class="navigation-item">Create Account</div>
                            <div class="navigation-item active">Login</div>
                        </div>
                        <form id="login-form" class="not-action">
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="eamil" tabindex="-1" name="email" placeholder="Email">
                            </div>
                            <div class="custom-input">
                                <div class="cutom-input__icon"></div>
                                <input type="password" tabindex="-1" name="password" placeholder="Password">
                            </div>
                            <div class="reset-password">
                                Forgot your password?
                            </div>
                        </form>
                    </div>
                </div>
                <div id="continue-service-select-btn" class="booking-system__button next-button">Continue</div>
            </div>
        </div>
        <div class="tab isInactive isRHS" id="booking-error">
            <div class="tab__body">
                <div class="tab__inner-body">
                    <div class="booking-status booking-status-error">
                        <div class="booking-status__image">
                            <div class="content">X</div>
                        </div>
                        <div class="booking-status__header">NO AVALIBLE SPECIALISTS FOUND</div>
                        <div class="booking-status__text">Pleas try to book service again later</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script id="stripe" src="https://js.stripe.com/v3/"></script>
<script src="assets/js/main.min.js?v=9"></script>

<script>
    // document.addEventListener('keydown', (event) => {
    //     const keyName = event.key;
    //     console.log(event);
    //     event.preventDefault();
    //     // alert('keypress event\n\n' + 'key: ' + keyName);
    // });
    // let booking = new BookingView();
    // booking.run();
    let invalidForms = document.querySelectorAll(".not-action");
    invalidForms.forEach((form)=>{
        form.addEventListener("submit", function(event){
            event.preventDefault();
        });
    });

</script>