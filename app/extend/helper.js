module.exports = {
    toIntArr(arr) {
        let intArr = [];
        arr.forEach(item => {
            intArr.push(+item);
        });
        return intArr;
    },

    unique(arr) {
        return Array.from(new Set(arr))
    }
};