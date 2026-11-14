let numberOfSelections = 0;
const totalAmountSpan = document.getElementById('total-amount');

function updateTotalAmount() {
  const totalAmount = 70 * numberOfSelections;
  totalAmountSpan.textContent = totalAmount + " ريال";
}

function incrementSelection() {
  numberOfSelections++;
  updateTotalAmount();
}

function decrementSelection() {
  if (numberOfSelections > 0) {
    numberOfSelections--;
    updateTotalAmount();
  }
}
let numberOfSelections200 = 0;
const totalAmountSpan200 = document.getElementById('total-amount-200');

function updateTotalAmount200() {
  const totalAmount200 = 200 * numberOfSelections200;
  totalAmountSpan200.textContent = totalAmount200 + " ريال";
}

function incrementSelection200() {
  numberOfSelections200++;
  updateTotalAmount200();
}

function decrementSelection200() {
  if (numberOfSelections200 > 0) {
    numberOfSelections200--;
    updateTotalAmount200();
  }
}
let numberOfSelections50 = 0;
const totalAmountSpan50 = document.getElementById('total-amount-50');

function updateTotalAmount50() {
  const totalAmount50 = 50 * numberOfSelections50;
  totalAmountSpan50.textContent = totalAmount50 + " ريال";
}

function incrementSelection50() {
  numberOfSelections50++;
  updateTotalAmount50();
}

function decrementSelection50() {
  if (numberOfSelections50 > 0) {
    numberOfSelections50--;
    updateTotalAmount50();
  }
}
let numberOfSelections20 = 0;
const totalAmountSpan20 = document.getElementById('total-amount-20');

function updateTotalAmount20() {
  const totalAmount20 = 20 * numberOfSelections20;
  totalAmountSpan20.textContent = totalAmount20 + " ريال";
}

function incrementSelection20() {
  numberOfSelections20++;
  updateTotalAmount20();
}

function decrementSelection20() {
  if (numberOfSelections20 > 0) {
    numberOfSelections20--;
    updateTotalAmount20();
  }
}
let customNumberOfSelections50 = 0;
const customTotalAmountSpan50 = document.getElementById('custom-total-amount-50');

function customUpdateTotalAmount50() {
  const customTotalAmount50 = 50 * customNumberOfSelections50;
  customTotalAmountSpan50.textContent = customTotalAmount50 + " ريال";
}

function customIncrementSelection50() {
  customNumberOfSelections50++;
  customUpdateTotalAmount50();
}

function customDecrementSelection50() {
  if (customNumberOfSelections50 > 0) {
    customNumberOfSelections50--;
    customUpdateTotalAmount50();
  }
}