import axios from 'axios';
import { useState } from 'react';

const accessKey = 'f69a0a5b-b333-4982-ae28-2a29c28c9a0c'; // move to .env?
const url = 'https://api.web3forms.com/submit'; // move to .env?
const initialState = {
	access_key: accessKey,
	subject: 'New Submission from Feast Fusion Contact Form',
	full_name: '',
	email: '',
	message: ''
}

function ContactForm() {

	const [formData, setFormData] = useState(initialState);
	const [alertMessage, setAlertMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(formData.email)) {
			setErrorMessage('Please enter a valid email address!');
			return;
		}

		await axios.post(url, formData);

		setAlertMessage('Your message has been received!');
		setErrorMessage('');

		setTimeout(() => {
			setAlertMessage('');
		}, 4500);

		setFormData({ ...initialState });
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	}

	return (

		<main id='contactStyle'>
			<section className="row formStyle">
			<form className="col-4 mx-auto" onSubmit={handleSubmit} id="contact">
				<h2>Contact Me</h2>

				{alertMessage && <p className="success text-center">{alertMessage}</p>}
				{errorMessage && <p className="error text-center">{errorMessage}</p>}

				<input type="hidden" name="access_key" value={accessKey} />
				<input type="hidden" name="subject" value="New Submission from Feast Fusion Contact Form" />
				<div className="mb-3">
					<input onChange={handleInputChange} value={formData.full_name} name="full_name" type="text" placeholder="Enter your full name" required />
				</div>
				<div className="mb-3">
					<input onChange={handleInputChange} value={formData.email} name="email" type="text" placeholder="Enter your email address" required />
				</div>
				<div className="mb-3">
					<textarea onChange={handleInputChange} value={formData.message} name="message" placeholder="Tell me something" required></textarea>
				</div>
				<button className="btn btn-primary btn-lg px-5">Send</button>
			</form>
			</section>
		</main>
	)
}

export default ContactForm;