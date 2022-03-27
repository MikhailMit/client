import { svgbtnInput, svgChangeSpiner, svgDeleteCrest, svgDeleteSpiner, svgEditClient, svgfb, svgMail, svgOther, svgtel, svgVK } from "./svg.js";
import { spinerPreloder } from "./preloder.js";
import { validateContact } from "./validateContact.js";
import { validateForm } from "./validateForm.js";
import { getSort } from "./sort.js"


(() => {

    const tbody = document.querySelector('tbody')
    const btnAddContact = document.querySelector('.client-card__button--add-client');
    const clientCardSelect = document.querySelector('.client-card__select');
    const safeClient = document.querySelector('#addClient');
    const btnSafe = document.querySelector('.btn-safe')
    const headerWrap = document.querySelector('.form-inline');
    const serchList = document.createElement('ul')

    serchList.classList.add('navbar__find-list', 'd-none')
    headerWrap.append(serchList);
    let clients = [{}];
    let clientsArr = [];
    let listOfContacts = [];
    const preloaderAdd = spinerPreloder()
    tbody.append(preloaderAdd)
    const clientSafeSpiner = document.createElement('span');
    clientSafeSpiner.classList.add('table__spiner-edit');
    clientSafeSpiner.innerHTML = svgChangeSpiner;
    btnSafe.prepend(clientSafeSpiner);

    // создание формы
    // открытие модального окна добавить клиента
    const btn = document.getElementById('add-client')
    const body = document.querySelector('body')
    const shadow = document.querySelector('.client-card__modal-shadow');
    const modal = document.querySelector('.client-card__modal');
    const btnClose = document.querySelector('.btn-close');

    btn.addEventListener('click', () => {
        safeClient.id = 'addClient';
        addClientModall();
        addNewClient();
    })

    function addClientModall() {
        modal.classList.add('modal-active');
        shadow.classList.add('modal-active');

        const newSelect = document.querySelectorAll('.client-card__select-wrap');

        newSelect.forEach(element => {
            element.remove();
        });

        const hederModal = document.querySelector('.client-card__header');
        const declaneBtn = document.querySelector('.btn-delete');
        const surname = document.querySelector('#inputSurname');
        const name = document.querySelector('#inputName');
        const patronymic = document.querySelector('#inputPatronymic');
        const safeBtnWarp = document.querySelector('.client-card__btn--wrap');
        hederModal.textContent = 'Новый клиент'
        declaneBtn.textContent = 'отмена'
        surname.value = '';
        name.value = '';
        patronymic.value = '';
        const errorWrap = document.createElement('div');
        const errorText = document.createElement('p');
        const incorectSymbole = document.createElement('span');
        const writeName = document.createElement('span');
        const writeSurname = document.createElement('span');
        const writePatronymic = document.createElement('span');
        const requireValue = document.createElement('span');
        const requireContacts = document.createElement('span');
        errorText.id = 'errorText';
        errorWrap.classList.add('d-flex', 'justify-content-center');
        errorText.classList.add('client-card__error', 'pt-2', 'mb-2')
        incorectSymbole.id = 'incorectSymbole';
        writeName.id = 'writeName';
        writeSurname.id = 'writeSurname';
        writePatronymic.id = 'writePatronymic';
        requireValue.id = 'requireValue';
        requireContacts.id = 'requireContacts';
        errorText.append(incorectSymbole, writeName, writeSurname, writePatronymic, requireValue, requireContacts);
        errorWrap.append(errorText)
        safeBtnWarp.before(errorWrap);
    }
    btnClose.addEventListener('click', () => {
        modal.classList.remove('modal-active');
        shadow.classList.remove('modal-active');
    });
    document.addEventListener('click', (e) => {

        if (e.target == modal || e.target == document.querySelector('.btn-delete')) {
            modal.classList.remove('modal-active');
            shadow.classList.remove('modal-active');
        };
    })

    btnAddContact.addEventListener('click', addContact);

    function addContact(contact) {
        const newSelectWrap = document.createElement('div');
        const contactContainer = document.createElement('div');
        const newSelect = document.createElement('select');
        const optsekected = document.createElement('option');
        const optTel = document.createElement('option');
        const optMail = document.createElement('option');
        const optTelegram = document.createElement('option');
        const optVk = document.createElement('option');
        const optFb = document.createElement('option');
        const input = document.createElement('input');
        const btnInput = document.createElement('button');
        const tooltypeErase = document.createElement('p');
        btnInput.classList.add('btn-reset', 'btn-erase');
        contactContainer.classList.add('d-flex', 'mb-2', 'client-card__select-wrap');
        tooltypeErase.classList.add('comon-tooltip');
        input.classList.add('form-control', 'client-card__input--contact', 'w-100', 'border-right-0');
        newSelect.classList.add('form-select');
        optFb.setAttribute('data-contacts', 'fb');
        optTel.setAttribute('data-contacts', 'tel');
        optMail.setAttribute('data-contacts', 'Email');
        optTelegram.setAttribute('data-contacts', 'Email');
        optVk.setAttribute('data-contacts', 'vk');
        input.setAttribute('name', 'contact');
        optsekected.selected
        btnInput.style.display = 'none';
        newSelect.ariaLabel = 'селект';
        input.placeholder = 'введите данные контакта';
        input.ariaLabel = 'инпут вместе с селектом';
        if (contact.value == undefined) {
            contact.value = ''
        }
        optTelegram.value = 'telegram';
        input.value = contact.value
        optMail.value = 'Email';
        optTel.value = 'tel';
        optVk.value = 'vk';
        optFb.value = 'fb';

        btnInput.innerHTML = svgbtnInput;
        tooltypeErase.textContent = 'удалить контакт';
        optsekected.textContent = 'Контакты';
        optTel.textContent = 'телефон';
        optMail.textContent = 'почта';
        optTelegram.textContent = 'телеграм';
        optVk.textContent = 'ВКонтакте';
        optFb.textContent = 'Facebook';
        btnInput.append(tooltypeErase);
        newSelect.append(optsekected, optTel, optMail, optTelegram, optVk, optFb);
        contactContainer.append(newSelect, input, btnInput)
        clientCardSelect.append(contactContainer);
        btnErase(btnInput);
        defaultSelect(contact.type);



        listOfContacts = document.querySelectorAll('.client-card__select-wrap');
        // const modal = document.querySelector('.client-card__modal');
        // const clientCard = document.querySelector('.client-card__modal--window');
        if (listOfContacts.length > 9) {
            btnAddContact.style.display = 'none';
        }

        // if (listOfContacts.length > 5) {
        //     modal.style.top = '10%';
        //     clientCard.style.paddingTop = '20%';
        // }
        // if (listOfContacts.length > 8) {
        //     clientCard.style.paddingTop = '40%';
        // } else {
        //     modal.style.top = '0';
        //     clientCard.style.paddingTop = '0';
        // }
    }

    // удаление контактов

    function btnEraseListener() {
        const inputContact = document.querySelectorAll('.client-card__input--contact');
        inputContact.forEach(input => {
            input.addEventListener('input', () => {
                document.querySelector('.btn-erase').style.display = 'inline-block'
            })
        })
    }
    btnEraseListener();

    function btnErase(btnInput) {
        const inputContact = document.querySelectorAll('.client-card__input--contact');
        inputContact.forEach(input => {
            input.addEventListener('input', () => {
                btnInput.style.display = 'inline-block'
                btnInput.addEventListener('click', (event) => {
                    let div = event.target.closest('div')
                    div.remove();
                    document.querySelector('.client-card__button--add-client').style.display = 'inline-block';
                });
            });
        });
    }

    function defaultSelect(type) {
        const select = document.querySelectorAll('.form-select');
        select.forEach(element => {
            const choices = new Choices(element, {
                    searchEnabled: false,
                },
                element.addEventListener('addItem', function(event) {
                    const wrapChoise = element.closest('.d-flex');
                    const input = wrapChoise.querySelector('input');
                    input.setAttribute('data-type', `${event.detail.value}`);
                }),
            );
            choices.setChoiceByValue(type)
        })
    }




    // Получение данных из формы и отправка на сервер
    async function addNewClient() {
        safeClient.addEventListener('submit', async(event) => {
            event.preventDefault();

            if (!validateForm()) {
                return;
            }
            const form = safeClient;
            const editClientArr = enrolClient(form);

            if (enrolClient(form) === null) {
                return
            }

            try {
                clientSafeSpiner.style.display = 'block'
                const data = await sendClientData(editClientArr, 'POST');
                tbody.append(createClient(data));
                modal.classList.remove('modal-active');
                shadow.classList.remove('modal-active');
            } catch (error) {
                console.log(error);
            } finally {
                clientSafeSpiner.style.display = 'none'
            }




        })
    }

    function enrolClient(form) {
        const contacts = form.elements.contact;
        clients = null;
        let contactsArr = [];
        let editClientArr = [];
        let typeOfContacts
        let clientContact

        if (contacts !== undefined) {
            if (Array.from(contacts).length > 0) {
                for (let input of contacts) {
                    typeOfContacts = input.dataset.type;
                    clientContact = input.value;


                    if (!validateContact(typeOfContacts, input)) {
                        return null
                    } else {
                        contactsArr.push({
                            type: typeOfContacts,
                            value: clientContact
                        })
                    }

                }

            } else {
                typeOfContacts = contacts.dataset.type;
                clientContact = contacts.value;

                if (!validateContact(typeOfContacts, contacts)) {
                    return null
                } else {
                    contactsArr.push({
                        type: typeOfContacts,
                        value: clientContact
                    })
                }

            }
        }

        clients = [{
            surname: form.elements.surname.value,
            name: form.elements.name.value,
            lastName: form.elements.patronymic.value,
            contacts: contactsArr,
        }]
        editClientArr = Object.assign({}, ...clients, );

        console.log(editClientArr)
        return editClientArr
    }

    // получение клиентов с сервера
    async function getClients() {
        try {
            const response = await fetch('https://vast-tor-64234.herokuapp.com/api/clients', {
                method: 'GET'
            });
            const result = await response.json();

            return result
        } catch (error) {
            console.log(error)
        }
    }
    async function sendClientData(client, method, id = null) {
        try {
            const response = await fetch(`https://vast-tor-64234.herokuapp.com/api/clients/${method === 'POST'? '' : id}`, {
                headers: {
                    'content-Type': 'application/json'
                },
                method,
                body: JSON.stringify(client)
            });
            const result = await response.json();
            return result
        } catch (error) {
            console.log(error)
        }

    }
    (async() => {
        await getClients()
    })();
    //удаление клиента с сервера
    async function deleteClientItem(id) {
        try {
            const response = await fetch(`https://vast-tor-64234.herokuapp.com/api/clients/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.log(error)
        }

    }

    async function findClient(value) {
        try {
            const response = await fetch(`https://vast-tor-64234.herokuapp.com/api/clients?search=${value}`, {
                method: 'GET'
            });
            const result = await response.json();

            return result;
        } catch (error) {
            console.log(error)
        }
    }
    // добавление клиента в список
    function createClient(data) {
        const clientTr = document.createElement('tr');
        const clientIdTd = document.createElement('td');
        const clientId = document.createElement('span');
        const clientFullName = document.createElement('td');
        const clientName = document.createElement('span');
        const clientSurname = document.createElement('span');
        const clientLastName = document.createElement('span');
        const clientCreated = document.createElement('td');
        const createDate = document.createElement('span');
        const createdTime = document.createElement('span');
        const clientChanged = document.createElement('td');
        const changedDate = document.createElement('span');
        const changedTime = document.createElement('span');
        const clientContacts = document.createElement('td');
        const clientActions = document.createElement('td');
        const clientEdit = document.createElement('button');
        const clientEditPen = document.createElement('span');
        const clientEditSpiner = document.createElement('span');
        const clientDelete = document.createElement('button');
        const clientDeleteCrest = document.createElement('span');
        const clientDeleteSpiner = document.createElement('span');
        clientEdit.classList.add('btn-reset', 'clients-list--edit', 'pl-lg-3', 'd-flex');
        clientTr.classList.add('table__clients--tr');
        clientTr.id = data._id;
        clientEditSpiner.classList.add('table__spiner-edit');
        clientEditPen.classList.add('table__pen-edit');
        clientDelete.classList.add('btn-reset', 'clients-list--delete', 'pl-lg-3', 'd-flex');
        clientDeleteCrest.classList.add('table__delete-crest');
        clientDeleteSpiner.classList.add('table__delete-spiner');
        createdTime.classList.add('table__clients-time');
        createdTime.classList.add('d-block', 'd-lg-inline');
        changedTime.classList.add('d-block', 'd-lg-inline');
        changedTime.classList.add('table__clients-time');
        clientFullName.classList.add('py-3');
        clientCreated.classList.add('py-3');
        clientChanged.classList.add('py-3');
        clientContacts.classList.add('client-contacts')
        clientActions.classList.add('py-3', 'd-lg-flex');
        clientIdTd.classList.add('p-3', 'table__clients--id');
        clientEditPen.innerHTML = svgEditClient;
        clientEditSpiner.innerHTML = svgChangeSpiner;
        clientDeleteCrest.innerHTML = svgDeleteCrest;
        clientDeleteSpiner.innerHTML = svgDeleteSpiner;
        // добовление данных в форму изменить данные клиента


        data.contacts.forEach(contact => {
            createContacktItemByType(contact.type, contact.value, clientContacts)
        })
        clientDelete.addEventListener('click', () => {

            clientDeleteCrest.style.display = 'none';
            clientDeleteSpiner.style.display = 'block';
            setTimeout(() => {
                document.body.append(deleteClientModal().deleteModal)
                document.querySelector('.delete-modal__delete').addEventListener('click', () => {
                    deleteClientItem(data._id)
                    document.getElementById(data._id).remove();
                    document.querySelector('.modal-active--dlete').remove()
                });
                clientDeleteSpiner.style.display = 'none';
                clientDeleteCrest.style.display = 'block';
            }, 300);
        })


        clientEdit.addEventListener('click', () => {
            clientEditSpiner.style.display = 'block';
            clientEditPen.style.display = 'none';
            setTimeout(() => {
                safeClient.id = 'edit-client'
                editClientModal(data)
                clientEditSpiner.style.display = 'none';
                clientEditPen.style.display = 'block';
            }, 300);

        })

        clientId.textContent = data._id.substr(3, 6);
        clientName.textContent = data.name;
        clientSurname.textContent = data.surname;
        clientLastName.textContent = data.lastName;
        clientEdit.textContent = 'Изменить';
        clientDelete.textContent = 'Удалить';
        createDate.textContent = formatData(data.createdAt);
        createdTime.textContent = formatTime(data.createdAt);
        changedDate.textContent = formatData(data.updatedAt);
        changedTime.textContent = formatTime(data.updatedAt);
        clientEdit.prepend(clientEditPen, clientEditSpiner);
        clientDelete.prepend(clientDeleteCrest, clientDeleteSpiner)
        clientFullName.append(clientName, clientSurname, clientLastName);
        clientCreated.append(createDate, createdTime);
        clientChanged.append(changedDate, changedTime);
        clientActions.append(clientEdit, clientDelete);
        clientIdTd.append(clientId);
        clientTr.append(clientIdTd, clientFullName, clientCreated, clientChanged, clientContacts, clientActions);
        return clientTr
    }


    (async function addClientToList() {
        try {
            clients = await getClients()

            serchClients(clients)
            clients.forEach(client => {
                document.querySelector('tbody').append(createClient(client))
            })
        } catch (error) {} finally {
            const preloader = document.querySelector('.preloader');
            setTimeout(() => preloader.remove(), 700);
        }
    })()

    function formatData(data) {
        const newDate = new Date(data);
        const correctDate = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }
        const resultDate = newDate.toLocaleDateString('ru', correctDate);
        return resultDate;
    }

    function formatTime(data) {
        const newDate = new Date(data);
        const resultTime = (`${newDate.getHours()}` + ':' + `${newDate.getMinutes()}`);

        return resultTime;
    }

    function contactTooltipe(type, value) {
        const tooltip = document.createElement('div');
        const tooltipType = document.createElement('span');
        const tooltipValue = document.createElement('a');

        tooltip.classList.add('contact-tooltip', 'site-tooltip');
        tooltipType.classList.add('contact-tooltip__type');
        tooltipValue.classList.add('contact-tooltip__value');

        tooltipType.textContent = type + ': ';
        tooltipValue.textContent = value;

        tooltip.append(tooltipType, tooltipValue);
        return {
            tooltip,
            tooltipType,
            tooltipValue
        }
    }


    function createContacktLink(type, value, element, svg, item) {
        const setTooltipe = contactTooltipe(type, value);
        element = document.createElement('a');
        element.classList.add('contacts__link', 'align-content-around');
        element.innerHTML = svg
        if (type === 'Email') {
            element.href = `mailto:${value.trim()}`
        } else if (type === 'tel') {
            element.href = `tel:${value.trim()}`
            setTooltipe.tooltipValue.style.color = 'var(--color-decoration08)'
            setTooltipe.tooltipValue.style.textDecoration = 'none'
        } else {
            element.href = value.trim();
        }
        element.append(setTooltipe.tooltip);
        item.append(element);
    }


    function createContacktItemByType(type, value, item) {
        switch (type) {
            case 'tel':
                let phone;
                createContacktLink(type, value, phone, svgtel, item);
                break
            case 'telegram':
                let telega;
                createContacktLink(type, value, telega, svgtel, item);
                break
            case 'fb':
                let fb;
                createContacktLink(type, value, fb, svgfb, item);
                break
            case 'Email':
                let email;
                createContacktLink(type, value, email, svgMail, item);
                break
            case 'vk':
                let vk;
                createContacktLink(type, value, vk, svgVK, item);
                break
            case 'Контакты':
                let other;
                createContacktLink(type, value, other, svgOther, item);
                break
            default:
                break;
        }
    }

    // Добавление тултипа



    // Создание окна удаление клиента
    function deleteClientModal() {
        const deleteModalContent = document.createElement('div');
        const modalClose = document.createElement('button');
        const deleteModalTitle = document.createElement('h2');
        const deleteModalText = document.createElement('p');
        const deleteModal = document.createElement('div');
        const deleteModalDelete = document.createElement('button');
        const deleteModalBack = document.createElement('button');
        deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active--dlete');
        deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active--dlete');
        deleteModalText.classList.add('delete-modal__text');
        deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
        deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
        deleteModalBack.classList.add('delete-modal__back', 'btn-reset');
        modalClose.classList.add('modal__close', 'btn-reset');

        deleteModalTitle.textContent = 'Удалить клиента';
        deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
        deleteModalDelete.textContent = 'Удалить';
        deleteModalBack.textContent = 'Отмена';

        deleteModalContent.append(
            modalClose,
            deleteModalTitle,
            deleteModalText,
            deleteModalDelete,
            deleteModalBack
        )
        deleteModal.append(deleteModalContent);
        modalClose.addEventListener('click', () => deleteModal.remove());
        deleteModalBack.addEventListener('click', () => deleteModal.remove());
        window.addEventListener('click', (e) => {
            if (e.target === deleteModal) {
                deleteModal.remove();
            }
        });
        document.querySelector('body').append(deleteModal)

        return {
            deleteModal,
            deleteModalContent,
            deleteModalDelete
        }
    }
    // Изменение данных клиента
    function editClientModal(data) {
        addClientModall()
        const hederModal = document.querySelector('.client-card__header');
        const declaneBtn = document.querySelector('.btn-delete');
        const createTitleId = document.createElement('span');
        const surname = document.querySelector('#inputSurname');
        const name = document.querySelector('#inputName');
        const patronymic = document.querySelector('#inputPatronymic');
        const safeClient = document.querySelector('#edit-client')
        declaneBtn.addEventListener('click', () => {
            const deleteModal = deleteClientModal()
            document.body.append(deleteModal.deleteModal);
            document.querySelector('.delete-modal__delete').addEventListener('click', () => {
                deleteClientItem(data._id)
                document.getElementById(data._id).remove();

            });
        })
        createTitleId.textContent = 'ID:' + ' ' + data._id.substr(3, 6);
        hederModal.textContent = 'изменить данные';
        hederModal.append(createTitleId);
        declaneBtn.textContent = 'удалить клиента';
        surname.value = data.surname;
        name.value = data.name;
        patronymic.value = data.lastName;

        data.contacts.forEach(contact => {
            addContact(contact)
        })

        safeClient.addEventListener('submit', async(event) => {
            event.preventDefault();
            const form = safeClient;
            const editClientArr = enrolClient(form)
            try {
                clientSafeSpiner.style.display = 'block'
                const editData = await sendClientData(editClientArr, 'PATCH', data._id)
                tbody.replaceChild(createClient(editData), document.getElementById(editData._id));
                modal.classList.remove('modal-active');
                shadow.classList.remove('modal-active');
            } catch (error) {
                console.log(error);
            } finally {
                clientSafeSpiner.style.display = 'none'
            }
        })
    }

    function serchClients(targetClients) {
        const findList = document.querySelector('.navbar__find-list');
        const input = document.querySelector('.form-inline input');
        targetClients.forEach(client => {
            const findItem = document.createElement('li');
            const findLink = document.createElement('a');

            findItem.classList.add('navbar__find-list--li');
            findLink.classList.add('navbar__find-list--a');

            findLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
            findLink.href = '#';

            findItem.append(findLink);
            findList.append(findItem);
        });

        async function rewriteTabel(string) {
            const response = await findClient(string);
            tbody.innerHTML = '';

            response.forEach(client => {
                tbody.append(createClient(client));
            })
        }
        input.addEventListener('input', async() => {
            const value = input.value.trim();
            const foundClients = document.querySelectorAll('.navbar__find-list--a');

            if (value !== '') {
                rewriteTabel(value);
                foundClients.forEach(link => {
                    if (link.innerText.search(value) == -1) {
                        link.classList.add('d-none');
                        link.innerHTML = link.innerText;

                    } else {
                        link.classList.remove('d-none');
                        findList.classList.remove('d-none');
                        const string = link.innerText;
                        link.innerHTML = spotLight(string, link.innerHTML.search(value), value.length);
                    }
                });
            } else {
                foundClients.forEach(link => {
                    tbody.innerHTML = '';

                    clients.forEach(client => tbody.append(createClient(client)));

                    link.classList.remove('d-none');
                    findList.classList.add('d-none');

                    link.innerHTML = link.innerText;
                })
            }
        });
    }

    const spotLight = (string, position, length) => string
        .slice(0, position) + `<mark>` + string
        .slice(position, position + length) + `</mark>` + string
        .slice(position + length);
    (() => {
        document.querySelector('.navbar__logo').addEventListener('click', () => {
            document.querySelector('.navbar__iput').classList.toggle('serch-active');
        })
    })()

})();
