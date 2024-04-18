document.addEventListener('DOMContentLoaded', () => {
  // Tab handling logic
  const buttons = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.content-section');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      contents.forEach(content => content.style.display = 'none');
      
      button.classList.add('active');
      const contentId = button.id.replace('-btn', '-content');
      document.getElementById(contentId).style.display = 'block';
    });
  });

  // Address validation logic
  const validateAddressBtn = document.getElementById('validateAddressBtn');
  const validationMessage = document.getElementById('validationMessage');
  const deliveryInformationSection = document.getElementById('deliveryInformationSection');
  const shippingOptions = document.getElementsByName('shippingOption');

  validateAddressBtn.addEventListener('click', function() {
    if (checkRequiredFields() && shippingIsSelected()) {
      showValidationSuccess();
      deliveryInformationSection.style.display = 'block';
      updateDeliveryInformation();
    } else {
      showValidationFailed();
      deliveryInformationSection.style.display = 'none';
    }
  });

  function checkRequiredFields() {
    let firstName = document.getElementById('form7Example1').value.trim();
    let lastName = document.getElementById('form7Example2').value.trim();
    let address = document.getElementById('form7Example4').value.trim();
    let email = document.getElementById('form7Example5').value.trim();
    return firstName && lastName && address && email;
  }

  function shippingIsSelected() {
    return Array.from(shippingOptions).some(option => option.checked);
  }

  function showValidationSuccess() {
    validationMessage.textContent = 'Address and shipping validated successfully.';
    validationMessage.classList.remove('text-danger');
    validationMessage.classList.add('text-success');
    validationMessage.style.display = 'block';
  }

  function showValidationFailed() {
    validationMessage.textContent = 'Please fill out all required fields and select a shipping method.';
    validationMessage.classList.remove('text-success');
    validationMessage.classList.add('text-danger');
    validationMessage.style.display = 'block';
  }

  // Calculate and return the estimated delivery date
  function calculateEstimatedDelivery(daysToAdd) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate.toLocaleDateString();
  }

  // Update the delivery information section
  function updateDeliveryInformation() {
    let standardShipping = document.getElementById('standardShipping').checked;
    let expeditedShipping = document.getElementById('expeditedShipping').checked;
    let deliveryPriceText = document.getElementById('deliveryPrice');
    let estimatedDeliveryDateText = document.getElementById('estimatedDeliveryDate');
    let deliveryMethodText = document.getElementById('deliveryMethod');

    if (standardShipping) {
      deliveryPriceText.textContent = "Delivery Price: $5.00";
      estimatedDeliveryDateText.textContent = "Estimated Delivery Date: " + calculateEstimatedDelivery(5);
      deliveryMethodText.textContent = "Delivery Method: Standard Delivery";
    } else if (expeditedShipping) {
      deliveryPriceText.textContent = "Delivery Price: $10.00";
      estimatedDeliveryDateText.textContent = "Estimated Delivery Date: " + calculateEstimatedDelivery(2);
      deliveryMethodText.textContent = "Delivery Method: Express Delivery";
    }
  }

  // Add event listeners for shipping method selection
  document.getElementById('standardShipping').addEventListener('change', updateDeliveryInformation);
  document.getElementById('expeditedShipping').addEventListener('change', updateDeliveryInformation);
});