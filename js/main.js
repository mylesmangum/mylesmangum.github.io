

function ShowContact(){
    document.getElementById("contact-form").style.display = "block";
    document.getElementById("contact-button").style.display = "none";
}

function CloseContact(){
    document.getElementById("contact-form").style.display = "none";
    document.getElementById("contact-button").style.display = "block";
}


window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
  }