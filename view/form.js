const appointmentForm = document.getElementById('appointment-form');

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the form from submitting normally
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const data = { name, email, phone, date, time };

  try {
    const response = await axios.post('http://localhost:3300/user', data, {
      headers: { 'Content-Type': 'application/json' }
    });
           
    console.log(response.data);
    displayAppointments(); 
    appointmentForm.reset();
  } catch (error) {
    console.error(error); // log the error to the console
    // display an error message to the user
  }
});

async function displayAppointments() {
  try {
    const response = await axios.get('http://localhost:3300/users');
    const appointments = response.data;
    const tableBody = document.querySelector('#appointments-table-body');
    let html = '';
    for (const appointment of appointments) {
      html += `
        <tr>
          <td>${appointment.name}</td>
          <td>${appointment.email}</td>
          <td>${appointment.phone}</td>
          <td>${appointment.date}</td>
          <td>${appointment.time}</td>
          <td><button class="delete-btn" data-id="${appointment.id}">Delete</button></td>
        </tr>
      `;
    }
    tableBody.innerHTML = html;

    tableBody.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const appointmentId = event.target.dataset.id;
    const confirmDelete = confirm('Are you sure you want to delete this appointment?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3300/users/${appointmentId}`);
        event.target.parentElement.parentElement.remove();
      } catch (error) {
        console.error(error);
      }
    }
  }
});

    
  } catch (error) {
    console.error(error);
  }
}



document.addEventListener('DOMContentLoaded', () => {
  displayAppointments();
});


