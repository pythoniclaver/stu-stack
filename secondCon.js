// Find the div with the specified styling
const divs = document.getElementsByTagName("div");
let targetDiv = null;

for (let i = 0; i < divs.length; i++) {
  const div = divs[i];
  const divStyle = div.getAttribute("style");

  console.log("Div Style: " + divStyle);

  const trimmedDivStyle = divStyle.replace(/\s/g, "");

  if (
    trimmedDivStyle ===
    `position:fixed;display:block;width:100%;height:100%;inset:0px;background-color:rgba(0,0,0,0);z-index:300000;`
  ) {
    targetDiv = div;
    break;
  }
}

// Extract the links from the target div and put them inside the container
if (targetDiv) {
  const container = document.querySelector(".latestPopoverContainer");
  const links = targetDiv.querySelectorAll("a");
  const iframes = targetDiv.querySelectorAll("iframe");

  if (container && links.length > 0) {
    links.forEach((link) => {
      container.appendChild(link);
    });

    iframes.forEach((iframe) => {
      container.appendChild(iframe);
    });

    // Remove the target div
    targetDiv.remove();
  }
}
