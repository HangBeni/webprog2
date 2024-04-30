export function emailValidator(email: string, emailError: Element | null) {
	const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	if (!isValid) {
		if (emailError) {
			emailError.textContent = 'Invalid email format';
			return false;
		}
	} else {
		if (emailError) {
			emailError.textContent = ''; // Clear error message if valid
			return true;
		}
	}
}

export function passwordValidator(password: string, passwordError: Element | null) {
	const isValid = password.length >= 5; // && /^(?=.*[0-9])(?=.*[a-zA-Z]).{5,}$/.test(password);

	if (!isValid) {
		if (passwordError) {
			passwordError.textContent =
				'Password must be at least 5 characters long and It must contains number and alphabetic character';
			return false;
		}
	} else {
		if (passwordError) {
			passwordError.textContent = ''; // Clear error message if valid
			return true;
		}
	}
}

export function nameValidator(name: string, nameError: Element | null) {
	const isValid = name.trim() !== '';

	if (!isValid) {
		if (nameError) {
			nameError.textContent = 'Name cannot be empty';
			return false;
		}
	} else {
		if (nameError) {
			nameError.textContent = ''; // Clear error message if valid
			return true;
		}
	}
}

export function birthValidator(birth: Date, birthError: Element | null) {
	const now = new Date();
	const birthDate = new Date(birth)
	const isLate = birthDate > now;
	if (isLate) {
		birthError!.textContent = `Birth cannot be later than the current Date: ${now.toDateString()}`;
		birthError!.classList.toggle('error');
	} else {
		if (birthError) {
			birthError.textContent = ``;
			birthError.classList.toggle('error');
		}
	}
}
