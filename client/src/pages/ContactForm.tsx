import axios from 'axios';
import { useState } from 'react';

const accessKey = 'f69a0a5b-b333-4982-ae28-2a29c28c9a0c';
const url = 'https://api.web3forms.com/submit';
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
		<form onSubmit={handleSubmit} id="contact">
			<h3 className="text-center">Contact Me</h3>

			{alertMessage && <p className="success text-center">{alertMessage}</p>}
			{errorMessage && <p className="error text-center">{errorMessage}</p>}

			<input type="hidden" name="access_key" value={accessKey} />
			<input type="hidden" name="subject" value="New Submission from Feast Fusion Contact Form" />

			<input onChange={handleInputChange} value={formData.full_name} name="full_name" type="text" placeholder="Enter your full name" required />
			<input onChange={handleInputChange} value={formData.email} name="email" type="text" placeholder="Enter your email address" required />
			<textarea onChange={handleInputChange} value={formData.message} name="message" placeholder="Tell me something" required></textarea>
			<button >Send</button>
		</form>
	)
}

export default ContactForm;