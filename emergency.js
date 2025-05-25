function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const output = `Latitude: ${lat}, Longitude: ${long}`;
        document.getElementById('location-output').innerText = output;
        document.getElementById('location').value = output;
      }, function() {
        alert("Location access denied.");
      });
    } else {
      alert("Geolocation not supported by this browser.");
    }
  }

//   callibg ambulance

  function copyNumber() {
    navigator.clipboard.writeText("102").then(function () {
      document.getElementById("copiedText").style.display = "block";
    }, function (err) {
      alert("Failed to copy number. Please copy manually.");
    });
  }