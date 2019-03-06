document.getElementById('loan-form').addEventListener('submit', function(e){
  //Hide results
  document.getElementById('results').style.display = 'none';

  //show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Calculate Results

function calculateResults() {
  //UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100/ 12 ;
  const CalculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, CalculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * CalculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * CalculatedPayments)-principal).toFixed(2);

    //show results
    document.getElementById('results').style.display = 'block';
    
    //Hide loader 
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('please check the numbers');
  }
  
}

// Show Error
function showError(error) {

  

    //show results
    document.getElementById('results').style.display = 'none';
    
    //Hide loader 
    document.getElementById('loading').style.display = 'none';
  //create a div
  const errorDiv = document.createElement('div');

  //Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className ='alert alert-danger';

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
  
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}