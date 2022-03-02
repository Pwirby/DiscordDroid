const working = [
    "Give me a second, I'm on it 🥵",
    "Awesome, I'm almost there 👨‍🎨",
];
export function replieWorking() {
    return working[Math.floor(Math.random() * working.length)];
}

const failed = [
    "Sorry, there was an issue loading the picture, are you sure that <URL> is valid ? 😰",
    "Something went wrong, I could not get that picture, are you sure that <URL> is valid ? 😖",
    "Oopsie, I did not manage to grab that picture, are you sure that <URL> is valid ? 🤥",
];
export function replieFailed() {
    return failed[Math.floor(Math.random() * failed.length)];
}

const success = [
    "Hot from the CPU ! 🥧",
    "The icing on the JPEG ! 🍰",
];
export function replieSuccess() {
    return success[Math.floor(Math.random() * success.length)];
}