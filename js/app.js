/**
 * call to input
 */
function selectFile() {
  document.getElementById("inputFile").click();
}

/**
 * Listen input change
 */
document.getElementById("inputFile").addEventListener("change", () => {
  loadImg(document.getElementById("inputFile").files[0]);
  document.getElementById("contImg").classList.add("active");
});

/**
 * receive file and load image
 * @param {*} data  Image to load
 */
function loadImg(data) {
  //evaluate if data is empty
  data
    ? (tipo = data.type.substring(0, 7))
    : () => {
        return;
      };

  //evaluate if data is an image
  if (tipo.includes("image/")) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const image = reader.result;
        const parent = document.getElementById("contImg");
        createImage(image, parent);
      },
      false
    );
    if (data) {
      reader.readAsDataURL(data);
    }
  } else {
    alert("Sólo se pueden cargar imágenes.");
  }
}

/**
 * Create image and button tags
 * @param {*} image is file image
 * @param {*} parent is parent tag
 */
function createImage(image, parent) {
  //hide file selection
  document.getElementById("divInput").classList.remove("active");
  //make a new image tag
  let newImg = document.createElement("img");
  newImg.src = image;
  newImg.id = "newImg";
  //make a new button tag
  let newBut = document.createElement("button");
  newBut.id = "butClose";
  newBut.innerHTML = "X";
  //add event to close it
  newBut.addEventListener("click", () => {
    removeImg();
  });
  //push image and button
  parent.appendChild(newImg);
  parent.appendChild(newBut);
}

/**
 * Remove html tags and change html values
 */
function removeImg() {
  const parent = document.getElementById("contImg");
  const image = document.getElementById("newImg");
  const butClose = document.getElementById("butClose");
  parent.removeChild(image);
  parent.removeChild(butClose);
  document.getElementById("divInput").classList.add("active");
  document.getElementById("contImg").classList.remove("active");
}

/**
 * Add drogArea values
 */
document.getElementById("contImg").addEventListener("dragover", (e) => {
  e.preventDefault();
  document.getElementById("contImg").classList.add("active");
});

/**
 * Remove dragArea values
 */
document.getElementById("contImg").addEventListener("dragleave", (e) => {
  e.preventDefault();
  document.getElementById("contImg").classList.remove("active");
});

/**
 * call loadImg with drop image
 */
document.getElementById("contImg").addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files;
  loadImg(file[0]);
});
