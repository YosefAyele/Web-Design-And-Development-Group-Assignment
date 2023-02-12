const orderModal = document.getElementById('orderNowModal');
const orderForm = orderModal.querySelector('form');
const submitButton = orderForm.querySelector('button[type="submit"]');



orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const order = Object.fromEntries(formData);

  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending...';

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    submitButton.innerHTML = 'Order sent!';
  } catch (error) {
    console.error(error);
    submitButton.innerHTML = 'Error';
  } finally {
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit';
    }, 2000);
  }
});


const myOrdersButton = document.getElementById('ordersButton');
const ordersModal = document.getElementById('orderModal');
const ordersList = document.getElementById('orderList');
const Food = document.getElementById('updateFood');
const MotherBet = document.getElementById('updateMotherBet');


// fetch orders and display in modal
myOrdersButton.addEventListener("click", function(){
    // fetch request to get orders
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // clear previous order data
          ordersList.innerHTML = "";
  
          // display orders in the modal
          data.forEach(order => {
            let orderItem = document.createElement("li");
            orderItem.innerHTML = `${order.food} ${order.motherBet}`;
            ordersList.appendChild(orderItem);
    
            // add update button to each order
            let updateBtn = document.createElement("button");
            updateBtn.innerHTML = "Update";
            updateBtn.addEventListener("click", function(){
              // prompt user to change food and motherBet
              let newFood = Food.value
              let newMotherBet = MotherBet.value
    
              // send PATCH request to update order
              fetch(`/api/orders/${order.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ food: newFood, motherBet: newMotherBet })
              })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                // update order in the modal
                orderItem.innerHTML = `${data.food} ${data.motherBet}`;
              })
              .catch(error => console.error(error));
            });
            orderItem.appendChild(updateBtn);
    
            // add cancel button to each order
            let cancelBtn = document.createElement("button");
            cancelBtn.innerHTML = "Cancel";
            cancelBtn.addEventListener("click", function(){
              if (confirm("Are you sure?")) {
                // send DELETE request to cancel order
                fetch(`/api/orders/${order.id}`, {
                  method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  // remove order from the modal
                  orderItem.remove();
                })
                .catch(error => console.error(error));
              }
            });
            orderItem.appendChild(cancelBtn);
        });
        ordersModal.classList.toggle("show")
    
        
          
        } else {
          alert("Sorry, you don't have any orders now. Place your first order.");
        }
      })
      .catch(error => console.error(error));
  });
  