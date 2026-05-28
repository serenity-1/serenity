const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br>Message: ${mess.value}<br>`;

  Email.send({ 
    Host: "smtp.elasticemail.com",
    Username: "serenityfoundationn@gmail.com",
    Password: "4323A31CCED42BF72F7C3B552B9005D5892B",
    To: 'serenityfoundationn@gmail.com',
    From: "serenityfoundationn@gmail.com",
    Subject: subject.value,
    Body: bodyMessage 
  }).then(
    message => {
      if (message == "OK") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successully!",
          icon: "success"
        });
      }
    }
  );
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  sendEmail();
});



