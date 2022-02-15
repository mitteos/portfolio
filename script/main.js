//якоря на главной
const screenWidthMobile = screen.width;
if(document.querySelector('.title_row .title_item button')) {
    switch(true) {
        case screenWidthMobile > 1200 && screenWidthMobile < 1400:
            scrollPM(3932);
            break;
        case screenWidthMobile > 992 && screenWidthMobile < 1200:
            scrollPM(3565);
            break;
        case screenWidthMobile > 768 && screenWidthMobile < 992:
            scrollPM(2562);
            break;
        case screenWidthMobile > 576 && screenWidthMobile < 768:
            scrollPM(2570);
            break;
        case screenWidthMobile > 540 && screenWidthMobile < 576:
            scrollPM(2615);
            break;
        case screenWidthMobile > 430 && screenWidthMobile < 540:
            scrollPM(2575);
            break;
        case screenWidthMobile > 320 && screenWidthMobile < 430:
            scrollPM(2850);
            break;
        case screenWidthMobile < 320:
            scrollPM(3130);
            break;
    }
    function scrollPM(scroll) {
        document.querySelector('.title_row .title_item button').addEventListener('click', () => {
            scrollTo({top: scroll, behavior:'smooth'});
        });
    }
}



let count = document.querySelector('.project_count');
if(count) {
    let count2 = document.querySelector('.title_exp');
    let counter2 = +count2.innerText;
    let counter = +count.innerText;
    count.innerText = '0';
    count2.innerText = '0';
    let counterStart = 0;
    let counterStart2 = 0;
        setInterval(() => {
            if(counterStart<=counter) {
                count.innerText = counterStart;
                counterStart++;
                
            }
            if(counterStart2<=counter2) {
                count2.innerText = counterStart2;
                counterStart2++;
            }
            if (counterStart>counter && counterStart2>counter2){
                clearInterval();
            }
        },150)
    setTimeout(() => {
        document.querySelector('.content_opacity').style.opacity = '1';
    }, 1000);
}
let underline = document.querySelector('.underline');
if(underline) {
    setInterval(() => {
        if(window.scrollY > 100) {
            underline.style.width = '30%';
        }
        if(window.scrollY > 300) {

            let items = document.querySelectorAll('.technologies_item');
            let timer = 100;
            for(let i = 0; i<items.length; i++) {
                setTimeout(() => {
                    items[i].classList.remove('hidden_tehnologies');
                },timer)
                timer+=200;
            }
        }
        if(window.scrollY > 890) {
            let items = document.querySelectorAll('.visable');
            let timer = 100;
            for(let i = 0; i<items.length; i++) {
                setTimeout(() => {
                    items[i].classList.remove('visable');
                }, timer);
                timer+=200;
            }
        }
    }, 500)
}

let sliderBtnL = document.querySelector('.switch_left');
let sliderBtnR = document.querySelector('.switch_right');
let sliderTrack = document.querySelector('.window_row');
let startSliderCount = 1;
let sliderPosition = 0;
if(sliderBtnL) {
    let sliderCount = document.querySelectorAll('.window_item').length;
    let slideWidth = document.querySelector('.window_item').clientWidth;
    sliderBtnR.addEventListener('click', () => {
        if(startSliderCount < sliderCount) {
            startSliderCount++;
            sliderPosition-=slideWidth;
            sliderTrack.style.transform = 'translateX('+ sliderPosition +'px)';
            sliderBtnL.classList.remove('blocked');
            if(startSliderCount == sliderCount) {
                sliderBtnR.classList.add('blocked')
            }
        }

    })

    sliderBtnL.classList.add('blocked')
    sliderBtnL.addEventListener('click', () => {
        if(startSliderCount > 1) {
            startSliderCount--;
            sliderPosition+=slideWidth;
            sliderTrack.style.transform = 'translateX('+ sliderPosition +'px)';
            sliderBtnR.classList.remove('blocked');
            if(startSliderCount == 1) {
                sliderBtnL.classList.add('blocked');
            }
        }
    })
    //touch slider
    sliderTrack.addEventListener('touchstart', handleTouchStart, false);
    sliderTrack.addEventListener('touchmove', handleTouchMove, false);
    let x1 = null;

    function handleTouchStart(e) {
        const firstTouch = e.touches[0];
        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
    }
    function handleTouchMove(e) {
        if(!x1 && !y1) {
            return false;
        }
        let x2 = e.touches[0].clientX;
        let y2 = e.touches[0].clientY;
        let xDiff = x2-x1;
        let yDiff = y2-y1;
        if (xDiff < 0 && Math.abs(xDiff) > Math.abs(yDiff)) {
            if(startSliderCount < sliderCount) {
                startSliderCount++;
                sliderPosition-=slideWidth;
                sliderTrack.style.transform = 'translateX('+ sliderPosition +'px)';
                sliderBtnL.classList.remove('blocked');
                if(startSliderCount == sliderCount) {
                    sliderBtnR.classList.add('blocked')
                }
            }  
        }
        if (xDiff > 0 && Math.abs(xDiff) > Math.abs(yDiff)) {
            if(startSliderCount > 1) {
                startSliderCount--;
                sliderPosition+=slideWidth;
                sliderTrack.style.transform = 'translateX('+ sliderPosition +'px)';
                sliderBtnR.classList.remove('blocked');
                if(startSliderCount == 1) {
                    sliderBtnL.classList.add('blocked');
                }
            }  
        }
        x1 = null;
        
    }
}


FeedbackForm();

const popupLinks = document.querySelectorAll('.popup_link');
const popupLinks2 = document.querySelectorAll('.link_conf')
const popupCloseX = document.querySelectorAll('.popup_close');
const popup = document.querySelector('#popup');
const popup2 = document.querySelector('#popup2');
const body = document.querySelector('body');
let unlock = true;
const timeout = 500;

if(popupLinks.length>0 && popup) {
    for(let i = 0; i<popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click', (e) => {
            e.preventDefault();
            popupOpen(popup);
        })
    }
}
for(let j = 0; j<popupCloseX.length; j++) {
    const popupCloses = popupCloseX[j];
    popupCloses.addEventListener('click', (e) => {
        e.preventDefault();
        if(popup) {
            popupClose(popup);
        }
        popupClose(popup2);
    });
};
if(popupLinks2.length>0) {
    for(let i = 0; i<popupLinks2.length; i++) {
        const popupLink = popupLinks2[i];
        popupLink.addEventListener('click', (e) => {
            e.preventDefault();
            popupOpen(popup2);
        })
    }
}
if(popup) {
    popup.addEventListener('click', (e) => {
    if(!e.target.closest('.popup_content')) {
        popupClose(popup);  
    }
})
}

popup2.addEventListener('click', (e) => {
    if(!e.target.closest('.popup_content')) {
        popupClose(popup2);  
    }
})

function popupOpen(item) {
    item.style.visibility = 'visible';
    item.style.opacity = '1';
    body.style.overflow = 'hidden';
    document.querySelector('.popup_content .conf').style.height = `${screen.height/100*60}px`;
}
function popupClose(item) {
    item.style.opacity = '0';
    item.style.visibility = 'hidden';
    body.style.overflow = 'visible';
    form.reset();
}

//слайдер для детальной страницы портфолио
if(document.querySelector('.job_img_window')) {
    let sliderRow = document.querySelector('.job_img_row');
    let sliderItem = document.querySelector('.job_img');
    let widthS = sliderItem.clientWidth;
    let slideR = widthS + 20;
    let itemCount = document.querySelectorAll('.job_img');
    let counter = 1;
    let btnL = document.querySelector('.left_sliderPort_btn');
    let btnR = document.querySelector('.right_sliderPort_btn');

    block(btnL);
    
    btnR.addEventListener('click', () => {
        unblock(btnL);
        if(counter< itemCount.length) {
            counter++;
            sliderRow.style.transform = 'translateX(-'+ (slideR * (counter-1)) +'px)';
            if(counter == itemCount.length) {
                block(btnR);
            }
        }
    });
    btnL.addEventListener('click', () => {
        unblock(btnR);
        if(counter > 1) {
            counter--;
            sliderRow.style.transform = 'translateX(-'+ (slideR * (counter-1)) +'px)';
            if(counter == 1) {
                block(btnL);
            }
        }
    });

    //touch slider
    sliderRow.addEventListener('touchstart', handleTouchStart, false);
    sliderRow.addEventListener('touchmove', handleTouchMove, false);
    let sliderCount = document.querySelectorAll('.window_item').length;
    let x1 = null;
    let y1 = null;

    function handleTouchStart(e) {
        const firstTouch = e.touches[0];
        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
    }
    function handleTouchMove(e) {
        if(!x1 && !y1) {
            return false;
        }
        let x2 = e.touches[0].clientX;
        let y2 = e.touches[0].clientY;
        let xDiff = x2-x1;
        let yDiff = y2-y1;
        if (xDiff < 0  && Math.abs(xDiff) > Math.abs(yDiff)) {
            if(counter< itemCount.length) {
                unblock(btnL);
                counter++;
                sliderRow.style.transform = 'translateX(-'+ (slideR * (counter-1)) +'px)';
                if(counter == itemCount.length) {
                    block(btnR);
                }
            }  
        }
        if (xDiff > 0 && Math.abs(xDiff) > Math.abs(yDiff)) {
            if(counter > 1) {
                counter--;
                sliderRow.style.transform = 'translateX(-'+ (slideR * (counter-1)) +'px)';
                if(counter == 1) {
                    block(btnL);
            }
            }  
        }
        x1 = null;
        y1 = null;
        
    }

    function block(a) {
        a.classList.add('blocked');
    }
    function unblock(a) {
        a.classList.remove('blocked');
    }
}

//меню бургер
let mobileMenuBtn = document.querySelector('.mobile_menu_btn');
let mobileMenu = document.querySelector('.mobile_open');
if(mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.mobile_open .menu').style.marginTop = `${screen.height/100*50}px`;
        mobileMenuBtn.classList.toggle('mobile_menu_active');
        body.classList.toggle('body_block');
        mobileMenu.classList.toggle('mobile_menu_open_active');
    });
}
