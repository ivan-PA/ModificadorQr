/**
 * call to input
 */
function selectFile() {
  document.getElementById("inputFile").click();
}

/**
 * Listen input change
 */
document.getElementById("inputFile").addEventListener("change", async () => {
  try {
    const file = document.getElementById("inputFile").files[0];
    if (!file) return;

    if (file.type.substring(0, 5) == "image") {
      const image = await loadImg(
        document.getElementById("inputFile").files[0]
      );

      const parent = document.getElementById("contImg");
      createImage(image, parent, resetContImg);
      changeContImg();
    } else {
      alert("Formato no aceptado, se debe introducir una imagen");
    }
  } catch (e) {
    console.log("Se ha producido un error en el cambio del input\n" + e);
  }
});

/**
 * receive file and load image
 * @param {*} data  Image to load
 */
function loadImg(data) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const image = reader.result;
      resolve(image);
    };
    reader.onerror = function () {
      reject("Error al cargar la imagen, compruebe que no está corrupta");
    };
    if (data) {
      reader.readAsDataURL(data);
    }
  });
}

/**
 * Create image and button tags
 * @param {*} image is file image
 * @param {*} parent is parent tag
 * @param {*} callback is a function reset tag
 */
function createImage(image, parent, onRemoveCompleted) {
  // function createImage(image, parent, callback) {
  //make a new image tag
  const newImg = document.createElement("img");
  newImg.src = image;
  newImg.id = "newImg";

  //make a new button tag
  const newBut = document.createElement("button");
  newBut.id = "butClose";
  newBut.innerHTML = "X";
  //add event to close it
  newBut.addEventListener("click", () => {
    removeImg(parent, newImg, newBut);
    onRemoveCompleted();
  });
  //push image and button
  parent.appendChild(newImg);
  parent.appendChild(newBut);
}

/**
 * Remove html tags and change html values
 */
function removeImg(parent, image, butClose) {
  parent.removeChild(image);
  parent.removeChild(butClose);
}

/**
 * Change parameters contImg
 */
function changeContImg() {
  document.getElementById("divInput").classList.remove("active");
  document.getElementById("contImg").classList.add("active");
}

/**
 * Reset parameters contImg
 */
function resetContImg() {
  document.getElementById("divInput").classList.add("active");
  document.getElementById("contImg").classList.remove("active");
}
/**
 * Add style drogArea values
 */
document.getElementById("contImg").addEventListener("dragover", (e) => {
  e.preventDefault();
  document.getElementById("contImg").classList.add("active");
});

/**
 * Remove style dragArea values
 */
document.getElementById("contImg").addEventListener("dragleave", (e) => {
  e.preventDefault();
  document.getElementById("contImg").classList.remove("active");
});

/**
 * call loadImg with drop image
 */
document.getElementById("contImg").addEventListener("drop", async (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files;
  if (file[0].type.substring(0, 5) == "image") {
    const image = await loadImg(file[0]);
    const parent = document.getElementById("contImg");

    if (!document.getElementById("newImg")) {
      // if (parent.childElementCount == 1) {

      createImage(image, parent, () => resetContImg());
      changeContImg();
    } else {
      alert(
        "Ya existe una imagen, no se puede cargar otra hasta que no se elimine la existente."
      );
    }
  } else {
    alert("Formato no aceptado, se debe introducir una imagen");
  }
});
