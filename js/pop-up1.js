const dialog = document.getElementById('myDialog');
const dialogOpener = document.querySelector('.checkout-btn__oneclick');
const dialogCloser = dialog.querySelector('.closeDialogBtn');
const checkoutForm = dialog.querySelector('.checkout-form');
const inputs = checkoutForm.querySelectorAll('input[required]');
const btnPayment = document.querySelector('.submit-btn');

function closeOnBackDropClick({ currentTarget, target }) {
    const dialog = currentTarget;
    const isClickedOnBackDrop = target === dialog;
    if (isClickedOnBackDrop) {
        close();
    }
}

function openModalAndLockScroll() {
    dialog.showModal();
    document.body.classList.add('scroll-lock');
}

function returnScroll() {
    document.body.classList.remove('scroll-lock');
}

function close() {
    dialog.close();
    returnScroll();
}

function showError(input, message) {
    input.classList.add('invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff0000';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    input.parentElement.appendChild(errorDiv);
}

function clearError(input) {
    input.classList.remove('invalid');
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 11) {
            value = '+7' + value.slice(1);
            if (value.length > 2) {
                value = value.slice(0, 2) + ' (' + value.slice(2);
            }
            if (value.length > 7) {
                value = value.slice(0, 7) + ') ' + value.slice(7);
            }
            if (value.length > 12) {
                value = value.slice(0, 12) + '-' + value.slice(12);
            }
            if (value.length > 15) {
                value = value.slice(0, 15) + '-' + value.slice(15);
            }
        }
    }
    input.value = value;
}

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length && i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    input.value = formattedValue;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        const month = value.slice(0, 2);
        const year = value.slice(2, 4);
        if (parseInt(month) > 12) {
            value = '12' + year;
        }
        value = month + (value.length > 2 ? '/' + year : '');
    }
    input.value = value;
}

function formatStreet(input) {
    let value = input.value.trim();
    if (!value.toLowerCase().startsWith('ул.') && value.length > 0) {
        input.value = 'ул. ' + value;
    }
}

function formatHouse(input) {
    let value = input.value.replace(/[^\d]/g, '');
    if (value) {
        input.value = value;
    }
}

function formatApartment(input) {
    let value = input.value.replace(/[^\d]/g, '');
    if (value) {
        input.value = value;
    }
}

function validateInput(input) {
    if (!input.value.trim()) {
        showError(input, 'Это поле является обязательным');
        return false;
    }
    clearError(input);
    return true;
}

function validateCardNumber(input) {
    const cardNumber = input.value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
        showError(input, 'Введите 16-значный номер карты');
        return false;
    }
    
    // Luhn algorithm check
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }
    
    if (sum % 10 !== 0) {
        showError(input, 'Неверный номер карты');
        return false;
    }
    
    clearError(input);
    return true;
}

function validateCVV(input) {
    const cvv = input.value;
    if (!/^\d{3}$/.test(cvv)) {
        showError(input, 'Введите 3-значный CVV код');
        return false;
    }
    clearError(input);
    return true;
}

function validateExpiryDate(input) {
    const expiry = input.value;
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
        showError(input, 'Введите срок в формате ММ/ГГ');
        return false;
    }

    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        showError(input, 'Срок действия карты истек');
        return false;
    }

    clearError(input);
    return true;
}

function validatePhoneNumber(input) {
    const phone = input.value.replace(/\D/g, '');
    if (phone.length !== 11 || !phone.startsWith('7')) {
        showError(input, 'Введите номер телефона в формате +7');
        return false;
    }
    clearError(input);
    return true;
}

// Event listeners
dialog.addEventListener('click', closeOnBackDropClick);
dialog.addEventListener('cancel', returnScroll);
dialogOpener.addEventListener('click', openModalAndLockScroll);
dialogCloser.addEventListener('click', (event) => {
    event.stopPropagation();
    close();
});

// Set CVV input type to password
const cvvInput = document.getElementById('cvv');
if (cvvInput) {
    cvvInput.type = 'password';
}

// Real-time validation and formatting
inputs.forEach(input => {
    input.addEventListener('input', () => {
        switch(input.id) {
            case 'cardNumber':
                formatCardNumber(input);
                validateCardNumber(input);
                break;
            case 'cvv':
                validateCVV(input);
                break;
            case 'expiryDate':
                formatExpiryDate(input);
                validateExpiryDate(input);
                break;
            case 'phone':
                formatPhoneNumber(input);
                validatePhoneNumber(input);
                break;
            case 'street':
                formatStreet(input);
                validateInput(input);
                break;
            case 'fullName':
                validateInput(input);
                break;
            case 'house':
                formatHouse(input);
                validateInput(input);
                break;
            case 'apartment':
                formatApartment(input);
                validateInput(input);
                break;
            default:
                validateInput(input);
        }
    });
});

// Form submission handling
btnPayment.addEventListener('click', async (event) => {
    event.preventDefault();
    let isValid = true;

    // Validate all required fields
    inputs.forEach(input => {
        switch(input.id) {
            case 'cardNumber':
                isValid = validateCardNumber(input) && isValid;
                break;
            case 'cvv':
                isValid = validateCVV(input) && isValid;
                break;
            case 'expiryDate':
                isValid = validateExpiryDate(input) && isValid;
                break;
            case 'phone':
                isValid = validatePhoneNumber(input) && isValid;
                break;
            case 'street':
                isValid = validateInput(input) && isValid;
                break;
            case 'fullName':
                validateInput(input);
                break;
            case 'house':
                isValid = validateInput(input) && isValid;
                break;
            case 'apartment':
                isValid = validateInput(input) && isValid;
                break;
            default:
                isValid = validateInput(input) && isValid;
        }
    });

    if (isValid) {
        const formData = new FormData(checkoutForm);
        
        const orderData = {
            personalInfo: {
                fullName: formData.get('fullName'),
                phone: formData.get('phone').replace(/\D/g, ''),
                email: formData.get('email')
            },
            address: {
                postalCode: formData.get('postalCode'),
                city: formData.get('city'),
                street: formData.get('street'),
                house: formData.get('house'),
                apartment: formData.get('apartment')
            },
            payment: {
                cardNumber: formData.get('cardNumber').replace(/\s/g, ''),
                expiryDate: formData.get('expiryDate'),
                cvv: formData.get('cvv')
            },
            consent: formData.get('consent') === 'on'
        };

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Order placed successfully:', orderData);
            alert('Заказ успешно оформлен!');
            close();
            checkoutForm.reset();
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
        }
    }
});


