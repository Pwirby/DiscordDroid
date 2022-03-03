export const working = [
    "Give me a second, I'm on it 🥵",
    "Awesome, I'm almost there 👨‍🎨",
];

export const failed = [
    "Sorry, there was an issue loading the picture, are you sure that <URL> is valid ? 😰",
    "Something went wrong, I could not get that picture, are you sure that <URL> is valid ? 😖",
    "Oopsie, I did not manage to grab that picture, are you sure that <URL> is valid ? 🤥",
];

export const success = [
    "Hot from the CPU ! 🥧",
    "The icing on the JPEG ! 🍰",
];

export function replie(replies: string[]) {
    return replies[Math.floor(Math.random() * replies.length)];
}