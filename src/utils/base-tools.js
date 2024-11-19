export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function openLink(url, newBlank = true) {
    if (newBlank) {
        window.open(url, "_blank");
    } else {
        window.location.href = url;
    }

}


