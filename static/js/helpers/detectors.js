
export const isSmartphone = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dif = width/height;

    return dif < 1;
}
