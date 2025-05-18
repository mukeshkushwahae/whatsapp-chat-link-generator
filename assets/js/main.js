// Query Selectors
const doc = document;
const getId = "getElementById";
const countryInput = doc[getId]("countryInput");
const numberInput = doc[getId]("numberInput");
const messageInput = doc[getId]("messageInput");
const generatedLink = doc[getId]("generatedLink");
const generateBtn = doc[getId]("generateBtn");
const copyBtn = doc[getId]("copyBtn");
const clearBtn = doc[getId]("clearBtn");
const generatedLinkHidden = doc[getId]("generatedLinkHidden");

// Regex
const numberInputRegex = /^\d{5,15}$/;

// Generate Button
generateBtn.addEventListener("click", function () {
   if (numberInput.value === "") {
      window.alert("Oops, The phone number is empty.");
      return false;
   } else if (!numberInputRegex.test(numberInput.value)) {
      window.alert("Enter a valid phone number (5–15 digits).");
      return false;
   } else {
      generateBtn.innerHTML = "Generating...";
      generateBtn.disabled = true;
      setTimeout(() => {
         let finalUrl = "https://wa.me/" + countryInput.value + numberInput.value;
         if (messageInput.value) finalUrl += '?text=' + encodeURIComponent(messageInput.value);
         generatedLink.value = finalUrl;
         generateBtn.innerHTML = "Generate";
         generateBtn.disabled = false;
         generatedLinkHidden.classList.remove("hidden");
      }, 1000);
   }
});

// Copy Button
copyBtn.addEventListener("click", function () {
   if (numberInput.value === "") {
      window.alert("Oops, The phone number is empty.");
      return false;
   } else if (!numberInputRegex.test(numberInput.value)) {
      window.alert("Enter a valid phone number (5–15 digits).");
      return false;
   } else {
      copyBtn.innerHTML = "Copying...";
      copyBtn.disabled = true;
      setTimeout(() => {
         copyBtn.innerHTML = "Copy";
         copyBtn.disabled = false;
      }, 1000);
      generatedLink.select();
      document.execCommand("copy");
   }
});

// Clear Button
clearBtn.addEventListener("click", function () {
   if (numberInput.value === "") {
      window.alert("Oops, The phone number is empty.");
      return false;
   } else {
      clearBtn.innerHTML = "Clearing...";
      clearBtn.disabled = true;
      setTimeout(() => {
         numberInput.value = "";
         messageInput.value = "";
         generatedLink.value = "";
         clearBtn.innerHTML = "Clear";
         clearBtn.disabled = false;
         generatedLinkHidden.classList.add("hidden");
      }, 1000);
   }
});

// Set Country Code Based on Location
document.addEventListener("DOMContentLoaded", function () {
   function setCountryByIsoCode(isoCode) {
      for (let i = 0; i < countryInput.options.length; i++) {
         if (countryInput.options[i].dataset.code === isoCode) {
            countryInput.selectedIndex = i;
            break;
         }
      }
   }

   const savedCountryCode = localStorage.getItem("savedCountryCode");
   if (savedCountryCode) {
      setCountryByIsoCode(savedCountryCode);
   } else {
      fetch("https://ipapi.co/json/")
         .then(response => response.json())
         .then(locationData => {
            const detectedCountryCode = locationData.country;
            localStorage.setItem("savedCountryCode", detectedCountryCode);
            setCountryByIsoCode(detectedCountryCode);
         })
         .catch(() => {
            console.warn("Could not fetch geolocation. Default country not set.");
         });
   }
});