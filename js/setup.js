'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SONAMES = ['да Марья', 'Верон', 'Маирабелла', 'Вальц',
 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(241, 43, 107)', 'rgb(215, 210, 55)', 'rgb(101, 137, 164)',
 'rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_QUANTITY = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// ДЗ №4 , Открытие/закрытие окна настройки персонажа
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizardForm = document.querySelector('.setup-wizard-form');
var setupSubmit = setup.querySelector('.setup-submit');
var yourWizardFeatures = document.querySelector('.setup-wizard');
var yourWizardCoatColor = yourWizardFeatures.querySelector('.wizard-coat');
var yourWizardEyesColor = yourWizardFeatures.querySelector('.wizard-eyes');
var yourWizardFireballColorContainer = document.querySelector('.setup-fireball-wrap');
var yourWizardFireballColor = yourWizardFireballColorContainer.querySelector('input');

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var generRandomName = function () {
	var wizardName = Math.floor(Math.random() * WIZARD_NAMES.length);
	var wizardSoname = Math.floor(Math.random() * WIZARD_SONAMES.length);
	var wizardFullName = WIZARD_NAMES[wizardName] + ' ' + WIZARD_SONAMES[wizardSoname];
	return wizardFullName;
};

var generRandomCoatColor = function () {
	var wizardCoatColor = Math.floor(Math.random() * WIZARD_COAT_COLORS.length);
	return WIZARD_COAT_COLORS[wizardCoatColor];
};

var generRandomEyesColor = function () {
	var wizardEyesColor = Math.floor(Math.random() * WIZARD_EYES_COLORS.length);
	return WIZARD_EYES_COLORS[wizardEyesColor];
};

var generRandomFireballColor = function () {
	var wizardFireballColor = Math.floor(Math.random() * WIZARD_FIREBALL_COLORS.length);
	return WIZARD_FIREBALL_COLORS[wizardFireballColor];
};

var renderWizardFeatures = function () {
	var wizardsFeaturesList = [];
	for (var i = 0; i < WIZARD_QUANTITY; i++) {
		wizardsFeaturesList[i] = {name: generRandomName(),
								coatColor: generRandomCoatColor(),
    							eyesColor: generRandomEyesColor()
    							}
	}
	return wizardsFeaturesList;
};

var renderWizard = function (wizard) {
	var wizardElement = similarWizardTemplate.cloneNode(true);
	wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
	wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
	wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
	return wizardElement;
};

var buildWizardsList = function () {
	var wizards = renderWizardFeatures();
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < wizards.length; i++) {
		fragment.appendChild(renderWizard(wizards[i]));
		similarListElement.appendChild(fragment);
	}
};
buildWizardsList();

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
	if (userNameInput === document.activeElement) {
		return;
	} else if (evt.keyCode === ESC_KEYCODE) {
		closePopup();
	}
};

var openPopup = function () {
	setup.classList.remove('hidden');
	document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
	setup.classList.add('hidden');
};

var sendWizardDataForm = function () {
	setupWizardForm.submit();
};

setupOpen.addEventListener('click', function () {
	openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
	if (evt.keyCode === ENTER_KEYCODE) {
		openPopup();
	}
});

setupClose.addEventListener('click', function () {
	closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
	if (evt.keyCode === ENTER_KEYCODE) {
		closePopup();
	}
});

setupSubmit.addEventListener('click', function () {
	sendWizardDataForm();
});

setupSubmit.addEventListener('keydown', function (evt) {
	if (evt.keyCode === ENTER_KEYCODE) {
		sendWizardDataForm();
	}
});

userNameInput.addEventListener('invalid', function () {
	if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
	} else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
	} else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
	} else {
    userNameInput.setCustomValidity('');
	}
});

yourWizardCoatColor.addEventListener('click', function () {
	yourWizardCoatColor.style.fill = generRandomCoatColor ();
});

yourWizardEyesColor.addEventListener('click', function () {
	yourWizardEyesColor.style.fill = generRandomEyesColor ();
});

yourWizardFireballColorContainer.addEventListener('click', function () {
	yourWizardFireballColor.value = generRandomFireballColor ();
});
