var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SONAMES = ['да Марья', 'Верон', 'Маирабелла', 'Вальц',
 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(241, 43, 107)', 'rgb(215, 210, 55)', 'rgb(101, 137, 164)',
 'rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
 var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

var wizards = [
  {
    name: generRandomName(),
    coatColor: generRandomCoatColor(),
    eyesColor: generRandomEyesColor()
  },
  {
    name: generRandomName(),
    coatColor: generRandomCoatColor(),
    eyesColor: generRandomEyesColor()
  },
  {
    name: generRandomName(),
    coatColor: generRandomCoatColor(),
    eyesColor: generRandomEyesColor()
  },
  {
    name: generRandomName(),
    coatColor: generRandomCoatColor(),
    eyesColor: generRandomEyesColor()
  }
];

var renderWizard = function (wizard) {
	var wizardElement = similarWizardTemplate.cloneNode(true);
	wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
	wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
	wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
	return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
	fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');