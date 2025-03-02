
document.addEventListener("DOMContentLoaded", function() {
    var nextButton = document.getElementById("next-button");
    var radioButtons = document.querySelectorAll('input[name="weight-option"]');
    
    nextButton.addEventListener("click", function() {
      var selectedOption;
      radioButtons.forEach(function(radioButton) {
        if (radioButton.checked) {
          selectedOption = radioButton.value;
        }
      });
      if (selectedOption) {
        localStorage.setItem("selectedOption", selectedOption);
        // You can redirect to the next page or perform other actions here
        console.log("Selected option:", selectedOption);
      } else {
        alert("Please select an option!");
      }
    });
  });