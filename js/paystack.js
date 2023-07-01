function getAmount() {
    const params = new URLSearchParams(window.location.search);
    let getPrice = params.get('price');

    const params2 = new URLSearchParams(window.location.search);
    let getTime = params2.get('pick');
    console.log(getPrice, getTime)

    const begAmt = document.getElementById("amount");
    begAmt.setAttribute("value", `${getPrice}`);

    const getTd = document.getElementById("pickup");
    getTd.setAttribute("value", `${getTime}`);

}
getAmount()

function randomStr(len, arr) {
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    console.log(ans);
}

let paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', payWithPaystack, false);
function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: 'pk_test_943f098905d14e4d5fda0e493e72a1bfd5369b21',
    email: document.getElementById('email-address').value,
    amount: document.getElementById('amount').value * 100, 
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    pickUp: document.getElementById('pickup').value,



    currency: 'NGN',
    // ref: ""+Math.floor((Math.random() * 1000000000) + 1),
    ref: randomStr(16, '12345abcde'),

    callback: function(response) {
      //this happens after the payment is completed successfully
      let reference = response.reference;
    //   alert('Payment complete! Reference: ' + reference);

    const getToken = localStorage.getItem("token");
    const theToken = JSON.parse(getToken);

    const phoneHeader = new Headers();
    phoneHeader.append('Content-Type', 'application/json');
    phoneHeader.append("Authorization", `Bearer ${theToken}`);

    const getNew = localStorage.getItem("newService");
    const newSer = JSON.parse(getNew);

    const mytd = localStorage.getItem("td");

    const sendOrder = JSON.stringify({
        ref: reference,
        "pickup_time": mytd,
        "items":newSer
    });
    console.log(sendOrder)

    const orRequest = {
        method: 'POST',
        headers: phoneHeader,
        body: sendOrder
    }

    const url = `https://washsmart.onrender.com/api/booking/laundry-request`;
    fetch(url, orRequest)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        Swal.fire({
            icon: 'success',
            text: `Payment complete! Reference: ${reference}`,
            confirmButtonColor: '#00AEEF'
        })
        setTimeout(() => {
            location.href = "../pages/order.html"
        }, 3000)
    })
    .catch(error => console.log('error', error))
        
      // Make an AJAX call to your server with the reference to verify the transaction
    },
    onClose: function() {
    //   alert('Transaction was not completed, window closed.');
        Swal.fire({
            icon: 'info',
            text: `Payment incomplete!`,
            confirmButtonColor: '#00AEEF'
        })
    },
  });
  handler.openIframe();
}