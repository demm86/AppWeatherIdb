const infoTxt = document.querySelector(".info-txt");

const errorService = {
  pendingMsj(msj) {
    //infoTxt.innerText = "Getting weather details...";
    infoTxt.innerText = msj;
    infoTxt.classList.add("pending");
  },
  errorMsj(msj) {
    //infoTxt.innerText = "Something went wrong";
    infoTxt.innerText = msj;
    infoTxt.classList.replace("pending", "error");
  },
  removeMsj() {
     infoTxt.classList.remove("pending", "error");
     infoTxt.innerText = "";
  },
  errorAlert(msj) {
    alert(msj);
  },
};

export default errorService;
