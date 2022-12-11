// DOM Refs
const movementForm = document.querySelector('#movementForm');
const descriptionInput = document.querySelector('#movementDescription');
const amountInput = document.querySelector('#movementAmount');
const movementSelect = document.querySelector('#movementType');
const accountSelect = document.querySelector('#movementAccount');
const dateInput = document.querySelector('#movementDate');

const getMovementData = () => {
  const movementDescription = descriptionInput.value.trim();
  const movementAmount = Number(amountInput.value.trim());
  const movementType = movementSelect.options[movementSelect.selectedIndex].value;
  const movementAccount = accountSelect.options[accountSelect.selectedIndex].value;
  const movementDate = new Date(dateInput.value);

  return {
    movementDescription,
    movementAmount,
    movementType,
    movementAccount,
    movementDate,
  };
};

const validateDataMovement = (movementData) => {
  const { movementDescription, movementAmount, movementType, movementAccount, movementDate } =
    movementData;
  const movementTypes = ['income', 'spent', 'initial', 'transfer'];
  const accounts = ['mercadoPago', 'banorte', 'dinn', 'klar'];
  const errors = [];

  if (movementDescription === '') {
    errors.push({
      field: 'descriptionInput',
      message: 'The description cannot be empty',
    });
  } else if (movementDescription.length > 150) {
    errors.push({
      field: 'descriptionInput',
      message: 'Description cannot exceed 150 characters',
    });
  }

  if (movementAmount === 0) {
    errors.push({
      field: 'amountInput',
      message: 'The amount cannot be empty',
    });
  } else if (movementAmount < 0) {
    errors.push({
      field: 'amountInput',
      message: 'The amount cannot be negative',
    });
  } else if (Number.isNaN(movementAmount)) {
    errors.push({
      field: 'amountInput',
      message: 'The amount cannot be different from a number',
    });
  }

  if (!movementTypes.includes(movementType)) {
    errors.push({
      field: 'movementSelect',
      message: 'The selected movement cannot be different from those established',
    });
  }

  if (!accounts.includes(movementAccount)) {
    errors.push({
      field: 'accountSelect',
      message: 'The selected account cannot be different from those established',
    });
  }

  // eslint-disable-next-line eqeqeq
  if (movementDate == 'Invalid Date') {
    errors.push({
      field: 'accountSelect',
      message: 'The date account be empty',
    });
  }

  return errors;
};

const saveMovement = (e) => {
  e.preventDefault();

  const movementData = getMovementData();
  const errors = validateDataMovement(movementData);
  console.log({ movementData, errors });
};

movementForm.addEventListener('submit', saveMovement);
