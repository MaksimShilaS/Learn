export function rectArray(xCap, yCap, defaultValue) {
    return Array.from({ length: xCap }, () => {
        return Array.from({ length: yCap }, () => defaultValue);
    });
}