// flat function
const customFlatFn = (arr, level) => {
    if(level <= 0) return arr;

    return arr.map(val => {
        if(typeof val === "object")
            return [...customFlatFn(val, level-1)];
        return val;
    })
};

const arr = [1,2,3,4,[4,[44,66],77]];
console.log(customFlatFn(arr));

// currying
const infiniteCurrying = (a) => {
    return function (b) {
        if(b) return infiniteCurrying(a+b);
        return a;
    }
};

console.log(infiniteCurrying(5)());
console.log(infiniteCurrying(5)(5)(2)());

// chaining
// implement this : calc.add(10).multiply(5).subtract(20).add(10)s
const calc = {
    total : 0,
    add(a){
        this.total += a;
        return this;
    },
    subtract(a){
        this.total -= a;
        return this;
    },
    multiply(a){
        this.total *= a;
        return this;
    }
};

const result = calc.add(10).multiply(5).subtract(20).add(10);
console.log(result);

