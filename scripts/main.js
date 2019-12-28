// renderFromLocal();
//     function renderFromLocal() {
//        // debugger;
//         console.log(document.querySelector("body").outerHTML);
//
//         document.querySelector("body").innerHTML = localStorage.getItem("htmlContent");
//         closeCard();
//         showFullCard();
//         showSmallCard();
//         $(function () {
//             $("main div").draggable();
//         });
//
//     }
//     window.onbeforeunload = function () {
//
//         let htmlContent = document.querySelector("body").innerHTML;
//         localStorage.setItem("htmlContent", htmlContent);
//        // renderFromLocal();
//     };


const doctors = document.getElementById("doctor-select");
console.log(doctors);
const date = document.getElementById("date");
const today = new Date();
const main = document.getElementsByTagName("main")[0];
const btn = document.getElementById("ok-btn");
let arr1 = [];
let obj = {};
let doctor_type = null;
buildDoctorsList();

doctors.addEventListener("change", changeModalWindow);
document.getElementById("applyBtn").addEventListener("click", modalWindowActive);
document.body.addEventListener("click", hideModalWindow);
document.getElementById('cancel-btn').addEventListener('click', cancelModalButton);
btn.addEventListener("click", visitCardCreate);

function buildDoctorsList() {
    doctors.innerHTML = DOCTOR_VISIT.Doctors().map(
        item => `<option value="${item.id}">${item.title}</option>`
    );
}

function cancelModalButton() {
    document.getElementById("modal-form").style.display = "none";
    document.getElementById("gray").style.display = "none";
}

function hideModalWindow(event) {
    if ((event.target.id === "gray") || ((event.target.id === "ok-btn") && (doctor_type !== null) && (doctor_type !== 'default'))) {
        document.getElementById("modal-form").style.display = "none";
        document.getElementById("gray").style.display = "none";
    }
}

function modalWindowActive() {
    date.innerHTML = today.dateFormat();
    document.getElementById("modal-form").style.display = "flex";
    document.getElementById("gray").style.display = "block";
}

function changeModalWindow(event) {
    doctor_type = event.target.value;
    if (DOCTOR_VISIT.Doctors().filter(item => item.id === event.target.value)) {
        document.getElementById(
            "field-for-doctors"
        ).innerHTML = DOCTOR_VISIT.Doctors()
            .find(item => item.id === event.target.value)
            .fields.map(
                item =>
                    `<label for="${item.id}">${item.title}</label><input name ="${item.title}" class="dynamic-inputs" type="${item.type}" id="${item.id}" value="">`
            )
            .join("");
    }
}

Date.prototype.dateFormat = function () {
    const month_names = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
    ];

    const day = this.getDate();
    const month_index = this.getMonth();
    const year = this.getFullYear();
    return `${day}.${month_names[month_index]}.${year}`;
};

function visitCardCreate(event) {
    try {
        if (((doctor_type === null) || (doctor_type === 'default')) && (event.target.id === "ok-btn")) {
            throw new ModalException('Виберети врача');
        }

        let inp = document.querySelectorAll(".dynamic-inputs");
        inp.forEach(item => (obj[item.id] = item.value));
        arr1.push(obj);

        let newCard = DOCTOR_VISIT.createVisit(doctor_type, obj);
        newCard.renderAllContent();

        $(function () {
            $("main div").draggable();
        });
        hideBackgroundTextOfCardContainer();
        closeCard();
        showFullCard();
        showSmallCard();
        //  console.log(arr1);
    } catch (err) {
        alert(err.message);
    }
}

function closeCard() {

    let btnClose = document.getElementsByClassName("card-button");
    if (btnClose) {

        for (let i = 0; i < btnClose.length; i++) {
            btnClose[i].onclick = removeVisitCard;
        }

        function removeVisitCard() {
            document.querySelectorAll('main div').length === 1 ? document.getElementsByClassName('dashboard')[0].style.display = 'block' : 0;
            this.parentNode.remove();
        }
    }
}

function showFullCard() {
    let btnShowMore = document.getElementsByClassName("showMore");
    if (btnShowMore) {
        for (let i = 0; i < btnShowMore.length; i++) {
            btnShowMore[i].onclick = showMoreCardProperties;
        }

        function showMoreCardProperties() {
            this.style.display = "none";
            this.parentNode.querySelector(".showLess").style.display = "block";
            this.parentNode
                .querySelectorAll(".hidden-card-content")
                .forEach(item => item.classList.toggle("hidden-card-content"));
        }
    }
}

function showSmallCard() {
    let btnShowLess = document.getElementsByClassName("showLess");
    if (btnShowLess) {
        for (let i = 0; i < btnShowLess.length; i++) {
            btnShowLess[i].onclick = showLessCardProperties;
        }

        function showLessCardProperties() {
            this.parentNode.querySelector(".showMore").style.display = "block";
            this.parentNode.querySelector(".showLess").style.display = "none";
            this.parentNode
                .querySelectorAll("p:not(:nth-child(3))")
                .forEach(item => item.classList.toggle("hidden-card-content"));
        }
    }
}

function hideBackgroundTextOfCardContainer() {
    document.getElementsByClassName('dashboard')[0].style.display = 'none';
}

$(function () {
    $("#tabs").tabs();
});

function ModalException(error) {
    this.name = 'ModalException';
    this.property = error;
    this.message = `ERROR: ${error}`;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ModalException);
    } else {
        this.stack = (new Error()).stack;
    }
}

// window.onbeforeunload = function () {
//     let htmlContent = document.querySelector("body").innerHTML;
//     localStorage.setItem("htmlContent", htmlContent);
//     renderFromLocal();
// };