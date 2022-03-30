import { svgChangeSpiner, svgCrestClose } from "./svg.js";

export function addModal() {
    const clientCardModal = document.createElement('div');
    const clientCardModalWindow = document.createElement('div');
    const clientCardBody = document.createElement('div');
    const clientCardTitleWrap = document.createElement('div');
    const clientCardHeader = document.createElement('h3');
    const btnClose = document.createElement('button');
    const formAddClient = document.createElement('form');
    const WrspAddClient = document.createElement('div');
    const labelInputSurname = document.createElement('label');
    const InputSurnameWrap = document.createElement('div');
    const InputSurname = document.createElement('input');
    const InputNameWrap = document.createElement('div');
    const labelInputName = document.createElement('label');
    const InputName = document.createElement('input');
    const labelInputPatronymic = document.createElement('label')
    const InputPatronymicWrap = document.createElement('div');
    const InputPatronymic = document.createElement('input');
    const clientCardSelect = document.createElement('div');
    const clientCardSelectWrap = document.createElement('div');
    const clientCardButtonAddContact = document.createElement('button');
    const biPlusCircle = document.createElement('i');
    const clientCardBtnWrap = document.createElement('div');
    const btnSafe = document.createElement('button');
    const btnCancelWrap = document.createElement('div');
    const btnCancel = document.createElement('button');
    const shadow = document.createElement('div');

    clientCardModal.classList.add('client-card__modal');
    clientCardModalWindow.classList.add('client-card', 'bg-white', 'w-25', 'client-card__modal--window');
    clientCardBody.classList.add('client-card__body');
    clientCardTitleWrap.classList.add('d-flex', 'justify-content-between', 'pt-4', 'px-4');
    clientCardHeader.classList.add('client-card__header');
    btnClose.classList.add('btn-reset', 'btn-close');
    shadow.classList.add('client-card__modal-shadow');

    WrspAddClient.classList.add('px-4', 'pb-4');
    labelInputSurname.classList.add('client-card__label');

    InputSurname.classList.add('client-card__input', 'w-100');
    labelInputName.classList.add('client-card__label');
    InputName.classList.add('client-card__input', 'w-100');
    labelInputPatronymic.classList.add('client-card__label');

    InputPatronymic.classList.add('client-card__input', 'w-100');
    clientCardSelect.classList.add('client-card__select', 'd-flex', 'flex-column', 'py-5', 'px-2', 'p-md-5');
    clientCardSelectWrap.classList.add('d-flex', 'justify-content-center', 'order-3');
    clientCardButtonAddContact.classList.add('client-card__button--add-client');
    biPlusCircle.classList.add('bi', 'bi-plus-circle');
    clientCardBtnWrap.classList.add('d-flex', 'client-card__btn--wrap', 'justify-content-center', 'pt-1', 'mb-1');
    btnSafe.classList.add('btn', 'd-flex', 'btn-safe');
    btnCancelWrap.classList.add('d-flex', 'justify-content-center', 'pb-4');
    btnCancel.classList.add('btn-delete');

    clientCardModal.id = 'Card-client';
    formAddClient.id = 'addClient';
    InputSurname.id = 'inputSurname';
    InputName.id = 'inputName';
    InputPatronymic.id = 'inputPatronymic';

    btnClose.innerHTML = svgCrestClose;
    formAddClient.setAttribute('action', '#');
    formAddClient.setAttribute('name', 'addClient');
    labelInputSurname.setAttribute('for', 'input-surname');
    labelInputName.setAttribute('for', 'input-name');
    labelInputPatronymic.setAttribute('for', 'input-patronymic');
    InputSurname.setAttribute('name', 'surname');
    InputName.setAttribute('name', 'name');
    InputPatronymic.setAttribute('name', 'patronymic');
    InputName.setAttribute('type', 'text');
    InputSurname.setAttribute('type', 'text');
    InputPatronymic.setAttribute('type', 'text');
    clientCardButtonAddContact.setAttribute('type', 'button');

    clientCardHeader.textContent = 'Новый клиент';
    labelInputSurname.textContent = 'Фамилия';
    labelInputName.textContent = 'Имя';
    labelInputPatronymic.textContent = 'Отчество';
    clientCardButtonAddContact.textContent = 'Добавить контакт'
    btnSafe.textContent = 'Сохранить'

    clientCardTitleWrap.append(clientCardHeader, btnClose);
    InputSurnameWrap.append(InputSurname);
    InputNameWrap.append(InputName);
    InputPatronymicWrap.append(InputPatronymic);
    WrspAddClient.append(labelInputSurname, InputSurnameWrap, labelInputName, InputNameWrap, labelInputPatronymic, InputPatronymicWrap)
    clientCardButtonAddContact.prepend(biPlusCircle)
    clientCardSelectWrap.append(clientCardButtonAddContact);
    clientCardSelect.append(clientCardSelectWrap);
    clientCardBtnWrap.append(btnSafe);
    formAddClient.append(WrspAddClient, clientCardSelect, clientCardBtnWrap);
    btnCancelWrap.append(btnCancel)
    clientCardBody.append(clientCardTitleWrap, formAddClient, btnCancelWrap);
    clientCardModalWindow.append(clientCardBody);
    clientCardModal.append(clientCardModalWindow);




    return {
        btnSafe,
        btnClose,
        clientCardHeader,
        btnCancel,
        InputSurname,
        InputName,
        InputPatronymic,
        clientCardBtnWrap,
        formAddClient,
        btnCancelWrap,
        btnClose,
        clientCardButtonAddContact,
        clientCardModal,
        clientCardSelect,
        shadow
    }
}