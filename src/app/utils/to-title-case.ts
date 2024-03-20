export function toTitleCase (str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toSentenceTitleCase (str: string): string {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}