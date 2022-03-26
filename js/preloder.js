import { preloderSvgSpin } from "./svg.js";

export function spinerPreloder() {
    const preloderContainer = document.createElement('div');
    const preloderElement = document.createElement('span');

    preloderContainer.classList.add('container', 'preloader');
    preloderElement.id = 'preloader';

    preloderElement.innerHTML = preloderSvgSpin;

    preloderContainer.append(preloderElement);

    return preloderContainer;
}
