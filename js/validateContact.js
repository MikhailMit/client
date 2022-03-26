export function validateContact(contactType, contactValue) {
    const writeContact = document.getElementById('writeSurname');

    const checkNumbers = /[^0-9]+$/g;
    const onlyEmail = /[^a-zA-Z|@|.]+$/g;

    function onInputValue(input) {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--text-gray: #B0B0B0)';
            writeContact.textContent = '';

        });
        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'var(--text-gray: #B0B0B0)';
            writeContact.textContent = '';

        }
    }

    function displayErrorMessage(message, block, input) {

        block.textContent = message;
        input.style.borderColor = 'var(--color-red)'
    }
    onInputValue(contactValue);

    if (!contactValue.value) {
        displayErrorMessage('заполните контакты!', writeContact, contactValue)
        return false
    }
    if (contactType === 'Email') {
        if (onlyEmail.test(contactValue.value)) {
            displayErrorMessage('неправильный Email', writeContact, contactValue);
            return false
        }
    }
    if (contactType === 'tel') {
        if (checkNumbers.test(contactValue.value)) {
            displayErrorMessage('Только цифры', writeContact, contactValue)
            return false
        } else if (contactValue.value.length !== 11) {
            displayErrorMessage('номер должен состоять из 11 цифр!', writeContact, contactValue)
            return false
        }
    }
    return true

}
