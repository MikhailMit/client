export function validateForm() {
    const userName = document.getElementById('inputName');
    const userSurname = document.getElementById('inputSurname');
    const userPatronymic = document.getElementById('inputPatronymic');
    const incorectSymbole = document.getElementById('incorectSymbole');
    const writeName = document.getElementById('writeName');
    const writeSurname = document.getElementById('writeSurname');
    const writePatronymic = document.getElementById('writePatronymic');
    const requireValue = document.getElementById('requireValue');
    const requireContacts = document.getElementById('requireContacts');

    const validateArr = [incorectSymbole, writeName, writeSurname, writePatronymic, requireValue, requireContacts];
    const regExp = /[^а-яА-ЯёЁ]+$/g;

    function onInputValue(input) {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--text-gray: #B0B0B0)'
            validateArr.forEach(input => {
                input.textContent = '';
            });
            input.oncut = input.oncopy = input.onpaste = () => {
                input.style.borderColor = 'var(--text-gray: #B0B0B0)';
                validateArr.forEach(input => {
                    input.textContent = '';
                });
                input.onchange = () => {
                    input.style.borderColor = 'var(--text-gray: #B0B0B0)';
                    if (userSurname.value && userName.value && userPatronymic.value) {
                        validateArr.forEach(input => {
                            input.textContent = '';
                        });
                    }

                }
            }
        })
    }
    onInputValue(userName);
    onInputValue(userSurname);
    onInputValue(userPatronymic);

    function checkRequredName(input, message, name) {
        if (!input.value) {
            input.style.borderColor = 'var(--color-red)';
            message.textContent = `Ввидите ${name} клиента!`;
            return false
        } else {
            message.textContent = '';
        }
        return true;
    }

    function checkByRegExp(input, regexp) {
        if (regexp.test(input.value)) {
            input.style.borderColor = 'var(--color-red)'
            incorectSymbole.textContent = `Недопустимые символы!`;
            return false
        }
        return true
    };
    if (!checkRequredName(userName, writeName, 'Имя')) { return false };
    if (!checkRequredName(userSurname, writeSurname, 'Фамилию')) { return false };
    if (!checkRequredName(userPatronymic, writePatronymic, 'Отчество')) { return false };
    if (!checkByRegExp(userName, regExp, 'Имя')) { return false };
    if (!checkByRegExp(userSurname, regExp, 'Фамилию')) { return false };
    if (!checkByRegExp(userPatronymic, regExp, 'Отчество')) { return false };
    return true;
}
