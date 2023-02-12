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


const myOrdersButton = document.getElementById('my-orders');
const ordersModal = document.getElementById('orders-modal');
const ordersList = document.getElementById('orders-list');
const noOrdersMessage = document.getElementById('no-orders-message');

myOrdersButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/orders');
    const orders = await response.json();

    if (orders.length === 0) {
      ordersModal.style.display = 'none';
      noOrdersMessage.style.display = 'block';
      return;
    }

    noOrdersMessage.style.display = 'none';
    ordersList.innerHTML = '';
    orders.forEach((order) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${order.food} ${order.motherBet}`;

      const cancelButton = document.createElement('button');
      cancelButton.innerHTML = 'Cancel';
      cancelButton.addEventListener('click', async () => {
        const confirmation = window.confirm('Are you sure?');
        if (!confirmation) {
          return;
        }

        try {
          const deleteResponse = await fetch(`/api/orders/${order.id}`, {
            method: 'DELETE',
          });
          if (!deleteResponse.ok) {
            throw new Error(deleteResponse.statusText);
          }
          listItem.remove();
        } catch (error) {
          console.error(error);
        }
      });

      listItem.appendChild(cancelButton);
      ordersList.appendChild(listItem);
    });

    ordersModal.style.display = 'block';
  } catch (error) {
    console.error(error);
  }
});
