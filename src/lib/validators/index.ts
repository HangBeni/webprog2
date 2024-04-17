
export function emailValidator(email: string, emailError: Element | null) {
	// Basic email validation
	const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	if (!isValid) {
		if (emailError) {
			emailError.textContent = 'Invalid email format';
			emailError.classList.toggle('error');
		}
	} else {
		if (emailError) {
			emailError.textContent = ''; // Clear error message if valid
			emailError.classList.toggle('error');
		}
	}
}

export function passwordValidator(password: string, passwordError: Element | null) {
	// Basic password validation (e.g., minimum length)
	const isValid = password.length >= 5 && /^(?=.*[0-9])(?=.*[a-zA-Z]).{5,}$/.test(password);
	if (!isValid) {
		if (passwordError) {
			passwordError.textContent =
				'Password must be at least 5 characters long and It must contains number and alphabetic character';
			passwordError.classList.toggle('error');
		}
	} else {
		if (passwordError) {
			passwordError.textContent = ''; // Clear error message if valid
			passwordError.classList.toggle('error');
		}
	}
}

export function nameValidator(name: string, nameError: Element | null) {
	// Basic name validation (e.g., not empty)
	const isValid = name.trim() !== '';
	if (!isValid) {
		if (nameError) {
			nameError.textContent = 'Name cannot be empty';
			nameError.classList.toggle('error');
		}
	} else {
		if (nameError) {
			nameError.textContent = ''; // Clear error message if valid
			nameError.classList.toggle('error');
		}
	}
}
