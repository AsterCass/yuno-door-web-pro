export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function openLink(url, newBlank = true) {
    if (newBlank) {
        window.open(url, "_blank");
    } else {
        window.location.href = url;
    }

}

export function isMiniScreenMethod() {
    return document.documentElement.clientWidth < 1440
}

export function togoElement(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }
}

export function togoElementCenter(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
        });
    }
}



