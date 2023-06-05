var paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', payWithPaystack, false);
function payWithPaystack() {
  var handler = PaystackPop.setup({
    key: 'pk_test_e02d0a860334dac233aba58e1e68f038edc8ab30', // Replace with your public key
    email: document.getElementById('email-address').value,
    amount: document.getElementById('amount').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    ref: 'YOUR_REFERENCE', // Replace with a reference you generated
    callback: function(response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      alert('Payment complete! Reference: ' + reference);
        // Swal.fire({
        //     icon: 'success',
        //     text: `Payment complete! Reference: ${reference}`,
        //     confirmButtonColor: '#00AEEF'
        // })
        // localStorage.setItem("ref", reference);
        // setTimeout(() => {
        //     location.href = "../pages/order.html"
        // }, 3000)
        
      // Make an AJAX call to your server with the reference to verify the transaction
    },
    onClose: function() {
      alert('Transaction was not completed, window closed.');
    },
  });
  handler.openIframe();
}