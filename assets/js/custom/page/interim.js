const popup_triggers = document.querySelectorAll('.popup-trigger');
popup_triggers.forEach( (el) => {

	el.addEventListener( 'click', (event) => {
		event.preventDefault();
		const popup_id = event.target.dataset.popup_id;
		const popup_target = document.querySelector( popup_id );
		if ( popup_target ) {
			popup_target.showModal(); 
			document.querySelector('body').classList.add('no-scroll');
		}
	} );

});

const popup_close_buttons = document.querySelectorAll('.popup .close-popup');
popup_close_buttons.forEach( (el) => {

	el.addEventListener( 'click', (event) => {
		event.preventDefault();
		const popup_id = event.target.dataset.popup_id;
		const popup_target = document.querySelector( popup_id );
		if ( popup_target ) {
			popup_target.close(); 
			document.querySelector('body').classList.remove('no-scroll');
		}
	} );

});


const form_place_order = document.getElementById('form_place_order');
const form_place_order_message = document.getElementById('form_place_order_message');

if ( form_place_order && form_place_order_message ) {

	function validateEmail(email) {
		if ( ! email || !  email.trim() ) {
			return false;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validatePhoneNumber(phone) {
		if ( ! phone || !  phone.trim() ) {
			return false;
		}
		const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
		return phoneRegex.test(phone);
	}

	form_place_order.addEventListener('submit', function(event) {

		event.preventDefault();
	
		const firstName = document.getElementById('contact_fname')?.value;
		const lastName = document.getElementById('contact_lname')?.value;
		const phoneNumber = document.getElementById('contact_phone')?.value;
		const email = document.getElementById('contact_email')?.value;
		const description = document.getElementById('product_description')?.value;
		const callTime = document.querySelector('input[name="callTime"]:checked')?.value;
		const submitButton = form_place_order.querySelector('[type="submit"]');

		let errors = [];
		if ( ! firstName || ! firstName.trim() ) {
			errors.push( 'First Name is required.');
		}
		
		if ( ! lastName || ! lastName.trim() ) {
			errors.push( 'Last Name is required.');
		}

		if ( ! phoneNumber || ! phoneNumber.trim() ) {
			errors.push( 'Phone Number is required.');
		} else {
			if ( ! validatePhoneNumber( phoneNumber ) ) {
				errors.push( 'Please use phone number format: 123-456-7890');
			}
		}

		if ( ! email || ! email.trim() ) {
			errors.push( 'Email is required.');
		} else {
			if ( ! validateEmail( email ) ) {
				errors.push( 'Invalid email address.');
			}
		}

		if ( ! description || ! description.trim() ) {
			errors.push( 'Product Description is required.');
		}

		if ( ! callTime || ! callTime.trim() ) {
			errors.push( 'Call Time is required.');
		}

		if ( errors.length ) {
			form_place_order_message.classList.add('error');
			form_place_order_message.innerHTML = errors.join( '<br>' );

			form_place_order_message.scrollIntoView({ 
				behavior: 'smooth' 
			});

			return false;
		} else {
			form_place_order_message.classList.remove('error', 'success');
			form_place_order_message.innerHTML = '';
		}

		if ( form_place_order.classList.contains('loading') ) {
			return false;
		}

		form_place_order.classList.add('loading');
		submitButton.innerText = 'Submitting...';
		submitButton.disabled = true;

		const formData = {
			firstName,
			lastName,
			phoneNumber,
			email,
			description,
			callTime
		};
	
		const jsonData = JSON.stringify(formData);
		
		fetch('https://optaderm-server-aj7eqn5eqa-uc.a.run.app/form/optadermLanding', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: jsonData
		})
		.then(response => {
			if (response.status === 200) {
			  return response.json();
			} else {
			  throw new Error(`Unexpected HTTP status: ${response.status}`);
			}
		})
		.then(data => {
			console.log('Success:', data);
			form_place_order_message.classList.add('success');
			form_place_order_message.innerHTML = 'Your order has been sent. We will get in touch with you soon!';
			form_place_order.reset();
		})
		.catch(error => {
			console.error('Error:', error);
			form_place_order_message.classList.add('error');
			form_place_order_message.innerHTML = 'Error: ' + error.message;
		})
		.finally(() => {
			form_place_order.classList.remove('loading');
			submitButton.innerText = 'Submit';
			submitButton.disabled = false;

			form_place_order_message.scrollIntoView({ 
				behavior: 'smooth' 
			});
		});
	
	});	

}