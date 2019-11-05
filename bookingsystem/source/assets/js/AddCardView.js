class AddCardView{
    constructor(){
        // this._tabAPI
        this._from = document.getElementById('payment-form');
        try{
            this._stripe = Stripe('pk_live_lZrU6djcfBFM1EDTQzUVY03W00v8chGiIb');
            this._elements = this._stripe.elements();
            this._card = this._elements.create('card', {
                base: {
                    color: '#32325d',
                    lineHeight: '22px',
                    fontFamily: 'avenir-lt-w01_85-heavy1475544, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '18px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            });

            this._token = null; 
            this._operationStatus = "incomplete";

            // this.init();
        } catch(w) {

        }
    }


    init(){
        // Add an instance of the card Element into the `card-element` <div>
        this._card.mount('#card-element');
    
        this._card.addEventListener('change', ({
            error
        }) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });
    
        // Create a token or display an error when the form is submitted.
        
        // this._from.addEventListener('submit', this.submitCard.bind(this));
    
        
    }

    // sendForm(){
    //     this._from.submit();
    // }
    async submitCard(event){
        // console.dir(event);
        // event.preventDefault();
    
        const {
            token,
            error
        } = await this._stripe.createToken(this._card);

        if (error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
            return false;
        } else {
            this._token = token;
            return true;
        }
    }

    sendToken(){
        this._operationStatus = "successful";
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', this._token.id);
        this._from.appendChild(hiddenInput);

        Messanger.sendMessage("addCreditCard", this._token);
    }
}