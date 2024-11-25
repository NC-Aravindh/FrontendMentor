const introPage = document.getElementById("intro-page");
const successPage = document.getElementById("success-page");

// document.getElementById("submit").addEventListener("click", (event) => {
//   event.preventDefault();
//   introPage.setAttribute("class", "hidden");
//   successPage.classList.remove('hidden')
// });

function submitForm(event) {
  event.preventDefault();
  const mailId = event.target[0].value;
  const isValidEmail =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
      mailId
    );
    console.log('validity:',isValidEmail)
  if (isValidEmail) {
    introPage.setAttribute("class", "hidden");
    successPage.classList.remove("hidden");
    document.getElementById("success-email-id").innerHTML = mailId;
  }
  else{
      const emailValidity =  document.getElementById('email-error');
      emailValidity.classList.remove('hidden');
  }
}

function refreshPage() {
  window.location.reload();
}
