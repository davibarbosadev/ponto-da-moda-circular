const form = document.querySelector(".form");
const notification = document.querySelector(".copied-notice");

const references = [];
let startRef;
let endRef;
let newString = "";

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const str = form.text.value + " ";

    stringToArray(str);
    formateNewString(references);
    copy();

    form.text.value = "";
    references.length = 0;
});

const stringToArray = (str) => {
    for (let index = 0; index < str.length; index++) {
        if (str[index] !== " ") {
            if (startRef === undefined) {
                startRef = index;
            }
        }

        if (
            startRef !== undefined &&
            (str[index] === " " || index === str.length - 1)
        ) {
            let endRef = index;
            const reference = str.slice(startRef, endRef);
            references.push(reference);
            startRef = undefined;
            endRef = undefined;
        }
    }
};

const formateNewString = (array) => {
    for (let index = 0; index < array.length; index++) {
        if (index !== array.length - 1) {
            newString += array[index] + ",";
        } else {
            newString += array[index];
        }
    }
};

const copy = () => {
    navigator.clipboard.writeText(newString);
    newString = ""
    notification.classList.add("active");
    setTimeout(() => {
        notification.classList.remove("active");
    }, 3000);
};
