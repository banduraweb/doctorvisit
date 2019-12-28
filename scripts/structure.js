class DOCTOR_VISIT {
    constructor({
                    purposeVisit = ``,
                    patientFullName = ``,
                    dataForVisit = null
                }) {
        this.purposeVisit = purposeVisit;
        this.patientFullName = patientFullName;
        this.dataForVisit = dataForVisit;
    }

    static get CARDIOLOGIST() {
        return "card";
    }

    static get DENTIST() {
        return "dent";
    }

    static get THERAPIST() {
        return "terr";
    }

    static createVisit(type, params) {
        switch (type) {
            case DOCTOR_VISIT.CARDIOLOGIST:
                return new CARDIO_VISIT(params);

            case DOCTOR_VISIT.DENTIST:
                return new DANTIST_VISIT(params);

            case DOCTOR_VISIT.THERAPIST:
                return new TERAPIST_VISIT(params);
        }

        return new DOCTOR_VISIT(params);
    }

    static Doctors() {
        return [
            {
                id: "default",
                title: "Choose a doctor",
                fields: []
            },
            {
                id: "card",
                title: "Кардиолог",
                fields: [
                    //   {title: "Прием кардиолога", id: 'doctor-type'},
                    { title: "цель визита", id: "purposeVisit" },
                    { title: "обычное давление", id: "patientPressure" },
                    { title: "индекс массы тела", id: "patientBodyIndex" },
                    {
                        title: "перенесенные заболевания сердечно-сосудистой системы",
                        id: "patientPastIllnesses"
                    },
                    { title: "ФИО", id: "patientFullName" },
                    { title: "Возраст", id: "patientAge" },
                    { title: "дата", id: "dataForVisit", type: "date" }
                ]
            },
            {
                id: "dent",
                title: "Стоматолог",
                fields: [
                    //   {title: "Прием стоматолог", id: 'doctor-type'},
                    { title: "цель визита", id: "purposeVisit" },
                    { title: "Последний визит", id: "lastVisitDate", type: "date" },
                    { title: "ФИО", id: "patientFullName" },
                    { title: "дата", id: "dataForVisit", type: "date" }
                ]
            },
            {
                id: "terr",
                title: "Терапевт",
                fields: [
                    //  {title: "Прием терапевт", id: 'doctor-type'},
                    { title: "цель визита", id: "purposeVisit" },
                    { title: "Возраст", id: "patientAge" },
                    { title: "ФИО", id: "patientFullName" },
                    { title: "дата", id: "dataForVisit", type: "date" }
                ]
            }
        ];
    }

    renderAllContent() {
        const dash = document.getElementsByTagName("main")[0];
        const card = document.createElement("div");
        dash.appendChild(card);
        const { title, fields } = DOCTOR_VISIT.Doctors().find(
            item => item.id === doctor_type
        );
        card.innerHTML =
            `<strong>${title}</strong><button id = "close" class="card-button">x</button>` +
            fields
                .filter(item => item.title.includes("ФИО"))
                .map(item => `<p>${item.title}:${this[item.id]}</p>`)
                .join("") +
            `<button class="showMore">Show more...</button> ` +
            fields
                .filter(item => !item.title.includes("ФИО"))
                .map(item => `<p class="hidden-card-content">${item.title}:${this[item.id]}</p>`).join("") +
            `<button class="showLess hidden-card-content">Show less...</button>`;
    }
}

class DANTIST_VISIT extends DOCTOR_VISIT {
    constructor({
                    purposeVisit = ``,
                    patientFullName = ``,
                    dataForVisit = null,
                    lastVisitDate = null
                }) {
        super({ purposeVisit, patientFullName, dataForVisit });
        this.lastVisitDate = lastVisitDate;
    }
}

class TERAPIST_VISIT extends DOCTOR_VISIT {
    constructor({
                    purposeVisit = ``,
                    patientFullName = ``,
                    dataForVisit = null,
                    patientAge = ``
                }) {
        super({ purposeVisit, patientFullName, dataForVisit });
        this.patientAge = patientAge;
    }
}

class CARDIO_VISIT extends DOCTOR_VISIT {
    constructor({
                    purposeVisit = ``,
                    patientFullName = ``,
                    dataForVisit = null,
                    patientAge = ``,
                    patientPressure = null,
                    patientBodyIndex,
                    patientPastIllnesses
                }) {
        super({ purposeVisit, patientFullName, dataForVisit });
        this.patientPressure = patientPressure;
        this.patientBodyIndex = patientBodyIndex;
        this.patientPastIllnesses = patientPastIllnesses;
        this.patientAge = patientAge;
    }
}
