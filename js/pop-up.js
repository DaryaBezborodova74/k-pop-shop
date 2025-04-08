const dialog = document.getElementById('myDialog');
const dialogOpener = document.querySelector('.checkout-btn__oneclick');
const dialogCloser = dialog.querySelector('.closeDialogBtn');

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

// Event listeners
dialog.addEventListener('click', closeOnBackDropClick);
dialog.addEventListener('cancel', returnScroll);
dialogOpener.addEventListener('click', openModalAndLockScroll);
dialogCloser.addEventListener('click', (event) => {
    event.stopPropagation();
    close();
});

// Form submission handling
const checkoutForm = dialog.querySelector('.checkout-form');
checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Here you would typically collect form data and send to server
    const formData = new FormData(checkoutForm);
    
    // Example of collecting form data
    const orderData = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: {
            postalCode: formData.get('postalCode'),
            city: formData.get('city'),
            street: formData.get('street'),
            house: formData.get('house')
        },
        consent: formData.get('consent'),
        comments: formData.get('comments')
    };

    // You would typically send this data to your server here
    console.log('Order data:', orderData);
    
    // Close dialog after successful submission
    close();
    checkoutForm.reset();
});



// function openPopup() {
//     document.getElementById('oneClickCheckout').style.display = 'flex';
// }

// function closePopup() {
//     document.getElementById('oneClickCheckout').style.display = 'none';
// }

// const dialog = document.getElementById('myDialog')
// const dialogOpener = document.querySelector('.openDialogBtn')
// const dialogCloser = dialog.querySelector('.closeDialogBtn')

// function closeOnBackDropClick({ currentTarget, target }) {
//   const dialog = currentTarget
//   const isClickedOnBackDrop = target === dialog
//   if (isClickedOnBackDrop) {
//     close()
//   }
// }

// function openModalAndLockScroll() {
//   dialog.showModal()
//   document.body.classList.add('scroll-lock')
// }

// function returnScroll() {
//   document.body.classList.remove('scroll-lock')
// }

// function close() {
//   dialog.close()
//   returnScroll()
// }

// dialog.addEventListener('click', closeOnBackDropClick)
// dialog.addEventListener('cancel', (event) => {
//   returnScroll()
// });
// dialogOpener.addEventListener('click', openModalAndLockScroll)
// dialogCloser.addEventListener('click', (event) => {
//   event.stopPropagation()
//   close()
// })
