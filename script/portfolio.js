function FeedbackForm() {
    let inputs = document.querySelectorAll('.inputs');
    let formAplication = document.querySelector('.form_application');
    inputs[0].style.opacity = '1';
    inputs[1].style.display = 'none';
    inputs[2].style.display = 'none';
    inputs[3].style.display = 'none';
    formAplication.style.display = 'none';

    let pointStep = document.querySelectorAll('.step');
    let progress = document.querySelectorAll('.progress');
    progress[0].style.color = '#4B506B';
    let stepNumber = document.querySelector('.step_number')
    let progressStrelka = document.querySelectorAll('.progress_strelka');
    let arrForm = [];
    let formItems = document.querySelectorAll('.inputs_item');

    for(let i = 0; i<formItems.length; i++) {
        if(i<4) {
            formItems[i].addEventListener('click', (e) => {
                e.preventDefault();
                arrForm.push(formItems[i].innerText);

                inputs[0].style.opacity = '0';
                setTimeout(() => {
                    inputs[0].style.display = 'none';
                    inputs[1].style.display = 'grid';
                },600)
                setTimeout(() => {
                    inputs[1].style.opacity = '1';
                }, 1)
                
                pointStep[0].classList.remove('step-activ');
                pointStep[1].classList.add('step-activ');

                progress[0].style.color = '#00C74F';
                progress[1].style.color = '#4B506B';

                stepNumber.innerText = '2';

                progressStrelka[0].classList.remove('blocked');
            });
            
        }
        if(i>3 && i<6) {
            formItems[i].addEventListener('click', (e) => {
                e.preventDefault();
                arrForm.push(formItems[i].innerText);

                inputs[1].style.opacity = '0';
                setTimeout(() => {
                    inputs[1].style.display = 'none';
                    inputs[2].style.display = 'grid';
                },600)
                setTimeout(() => {
                    inputs[2].style.opacity = '1';
                }, 1)

                pointStep[1].classList.remove('step-activ');
                pointStep[2].classList.add('step-activ');

                progress[1].style.color = '#00C74F';
                progress[2].style.color = '#4B506B';

                stepNumber.innerText = '3';

                progressStrelka[1].classList.remove('blocked');
            });
        }
        if(i>5 && i<8) {
            formItems[i].addEventListener('click', (e) => {
                e.preventDefault();
                arrForm.push(formItems[i].innerText);
                inputs[2].style.opacity = '0';
                setTimeout(() => {
                    inputs[2].style.display = 'none';
                    inputs[3].style.display = 'grid';
                },600)
                setTimeout(() => {
                    inputs[3].style.opacity = '1';
                }, 1)

                pointStep[2].classList.remove('step-activ');
                pointStep[3].classList.add('step-activ');

                progress[2].style.color = '#00C74F';
                progress[3].style.color = '#4B506B';

                stepNumber.innerText = '4';
                progressStrelka[3].classList.remove('blocked');
            })
        }
        if(i>7 && i<11) {
            formItems[i].addEventListener('click', (e) => {
                e.preventDefault();
                arrForm.push(formItems[i].innerText);
                inputs[3].style.opacity = '0';
                setTimeout(() => {
                    inputs[3].style.display = 'none';
                    formAplication.style.display = 'block';
                },600)
                setTimeout(() => {
                    formAplication.style.opacity = '1';
                }, 1)
                
                pointStep[3].classList.remove('step-activ');
                pointStep[4].classList.add('step-activ');

                progress[3].style.color = '#00C74F';
                progress[4].style.color = '#4B506B';

                stepNumber.innerText = '5';

            })
        }
    }


    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend (ev) {
        ev.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if(error === 0) {
            form.classList.add('_sending');
            let response = await fetch('phpmailer.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            }
            else {
                alert(result.message);
                form.classList.remove('_sending');
            }
        } 
        // else {
        //     alert('Заполните обязательные поля');
        // }

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let i = 0; i<formReq.length; i++) {
            const input = formReq[i]
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                if(emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            }
            else {
                if(input.value == '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.classList.add('_error');
        if(input.getAttribute("type") === "checkbox") {
            input.parentElement.classList.add('_error')
        }
    }

    function formRemoveError(input) {
        input.classList.remove('_error');
        if(input.getAttribute("type") === "checkbox") {
            input.parentElement.classList.remove('_error')
        }
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
}
