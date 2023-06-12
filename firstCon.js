// Get all the iframes with class name "elementor-widget-container"
var iframes = document.querySelectorAll(".elementor-widget-container iframe");

// Create a container element
var container = document.createElement("div");
container.className = "adContainer";

// Loop through each iframe and clone it to append it to the container
for (var i = 0; i < iframes.length; i++) {
  var iframe = iframes[i];
  var clonedIframe = iframe.cloneNode(true);
  container.appendChild(clonedIframe);
}

// Remove the iframes and their parent elements with class name "elementor-widget-container"
var widgetContainers = document.getElementsByClassName(
  "elementor-widget-container"
);
for (var i = widgetContainers.length - 1; i >= 0; i--) {
  widgetContainers[i].parentNode.removeChild(widgetContainers[i]);
}

// Append the container with all the cloned iframes to a desired location in the document
var targetElement = document.getElementById("mainCon");
targetElement.appendChild(container);

// Add click and hover event listeners to the adContainer
var adContainer = document.getElementById("mainCon");
var adsIframes = document.querySelectorAll(".adContainer iframe");
var links = document.querySelectorAll(".adContainer a");

var hoverTimeout; // Variable to hold the timeout ID for hover event
var clickFlag = false; // Flag to track if click event has been triggered

adContainer.addEventListener("click", function () {
  // Trigger click event on each iframe inside the adContainer
  if (!clickFlag) {
    for (var i = 0; i < adsIframes.length; i++) {
      var iframe = adsIframes[i];
      var link = links[i];
      iframe.click();
      link.click();
      console.log("Click event called for iframe:", iframe.id);
    }
    clickFlag = true;
  } else {
    clickFlag = false;
  }
});

adContainer.addEventListener("mouseover", function () {
  // Trigger hover event on each iframe inside the adContainer
  clearTimeout(hoverTimeout); // Clear previous timeout if exists

  for (var i = 0; i < adsIframes.length; i++) {
    var iframe = adsIframes[i];
    var link = links[i];
    if (!iframe.dataset.hoverTriggered || link.dataset.hoverTriggered) {
      var event = new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      iframe.dispatchEvent(event);
      link.dispatchEvent(event);
      iframe.dataset.hoverTriggered = true; // Set the flag to true
      link.dataset.hoverTriggered = true;
      console.log("Hover event called for iframe:", iframe.id);
    }
  }
});

adContainer.addEventListener("mouseout", function () {
  // Clear the hover event if the mouse moves out of the container
  clearTimeout(hoverTimeout);
});

// Hover event listener for each iframe
for (var i = 0; i < adsIframes.length; i++) {
  var iframe = adsIframes[i];
  var link = links[i];
  iframe.addEventListener("mouseover", function () {
    console.log("Mouseover event called for iframe:", this.id);
  });
  link.addEventListener("mouseover", function () {
    console.log("Mouseover event called for iframe:", this.id);
  });
}
