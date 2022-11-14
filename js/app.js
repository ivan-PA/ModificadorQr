const imagen = document.getElementById("img");
const input = document.getElementById("inputFile");
const divInput = document.getElementById("divInput");
const butCargar = document.getElementById("butCargar");
const butCerrar = document.getElementById("butCerrar");
const dropArea = document.getElementById("contImg");

/**
 * call to input
 */
function selectFile() {
  input.click();
}

/**
 * receive file and putit in image
 * @param {*} data
 */
function loadImg(data) {
  let file;
  data ? (file = data) : (file = input.files[0]);

  if (file == null) {
    alert("Debe seleccionar una imagen");
  } else {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        imagen.src = reader.result;
        divInput.style.visibility = "hidden";
        imagen.style.visibility = "visible";
        butCerrar.style.visibility = "visible";
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

/**
 * Clean input and change html values
 */
function closeImg() {
  input.value = "";
  divInput.style.visibility = "visible";
  imagen.style.visibility = "hidden";
  butCerrar.style.visibility = "hidden";
}

/**
 * change drogArea values
 */
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
});

/**
 * Return drogArea values
 */
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
});

/**
 * call loadImg only with image extension
 */
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files;
  const tipo = file[0].type.substring(0, 7);
  if (tipo.includes("image/")) {
    loadImg(file[0]);
  } else {
    alert("Sólo se pueden cargar imágenes.");
  }
});
