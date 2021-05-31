
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
        var formdata = new FormData(form);
        const url = '/qr-code-generate';
        const urlVal = document.getElementById('url').value;
        const errorWrap = document.getElementById('error');
        const settings = {
          "method": "POST",
            body: JSON.stringify({
                'url': urlVal,
            }),
        };

        event.preventDefault();
        event.stopPropagation();

      if (!form.checkValidity()) {
          form.classList.add('was-validated');
          errorWrap.innerHTML = '';
        return false;
      }else {
        async function createQR() {

            errorWrap.innerHTML = '';

          // get JSON
          let req = await fetch(url, settings);
          let res = await req.json();

          // console.log(req);
          if(req.status !== 200) {
              document.querySelector('.qrcode').innerHTML = '';
              let error = res.detail[0].msg;
              errorWrap.append(error);
              return false;
          }

          document.querySelector('.qrcode').innerHTML = '';
          // show qr code
          let qrImg = document.createElement('img');
          qrImg.src = res.qr_code;
          qrImg.className = "promise-avatar-example";
          document.querySelector('.qrcode').append(qrImg);

          return qrImg;
        }
        createQR();
      }
    }, false);
  });
})();