//ORDERING FEATURE
const orderModal = document.getElementById('orderNowModal');
const orderForm = orderModal.querySelector('form');
const submitButton = orderForm.querySelector('button[type="submit"]');
const motherBet = document.getElementById("motherBetInput")
const food = document.getElementById("mealInput")
console.log(orderForm)


orderForm.addEventListener('submit', async (event) => {
  console.log("create order called")
  event.preventDefault();

  const order = {
    food : food.value,
    motherbet: motherBet.value
  }
  
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending...';

  try {
    console.log(typeof localStorage.getItem('auth'), "here is athe auth")
    console.log(JSON.stringify(order))
    const response = await fetch('http://localhost:3000/orders/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : "bearer " + localStorage.getItem('auth')
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
const updateButton = document.getElementById('updateOrderButton')
const updateModal = document.getElementById("updateModal")

// fetch orders and display in modal
myOrdersButton.addEventListener("click", function(){
    console.log("my orders called")
    // fetch request to get orders
    fetch("http://localhost:3000/orders/get_order" , {
      method: "GET",
      headers: {
      'Content-Type': 'application/json',
      "Authorization" : "bearer "+localStorage.getItem('auth')
    },})
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // clear previous order data
          ordersList.innerHTML = "";
  
          // display orders in the modal
          data.forEach(order => {
            let orderItem = document.createElement("li");
            orderItem.innerHTML = `${order.food} ${order.motherbet}`;
            ordersList.appendChild(orderItem);
    
            // add update button to each order
            let updateBtn = document.createElement("button");

            updateBtn.innerHTML = "Update";
            updateBtn.setAttribute("data-bs-toggle", "modal")
            updateBtn.setAttribute("data-bs-target", "#updateModal")
            updateBtn.setAttribute("type","button")
            
            updateBtn.addEventListener("click",function(){
              if (updateModal.style.display === "none"){
                updateModal.style.display = "block"
              }

            })
            

            updateButton.addEventListener("click", async function(){
              
                
                
              const updatedFood = Food.value
              const updatedMotherbet = MotherBet.value
    
              // send PATCH request to update order
             response = await fetch(`http://localhost:3000/orders/update_order/${order.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization" : "bearer "+localStorage.getItem('auth')
                },
                body: JSON.stringify({ food: updatedFood, motherbet: updatedMotherbet })
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
                fetch(`http://localhost:3000/orders/delete_order/${order.id}`, {
                  method: 'DELETE'
                  ,
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization" : "bearer "+localStorage.getItem('auth')
                },
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
        // ordersModal.classList.toggle("show")
    
        
          
        } else {
          alert("Sorry, you don't have any orders now. Place your first order.");
        }
      })
      .catch(error => console.error(error));
  });
