
// var coloursArray = [
//     ["blue", "green"],
//     ["green", "black"],
//     ["green", "red"]
// ]


// const combineArrays = (arr) =>{
//     return arr.reduce((total, subArray)=>{
//         return total.concat(subArray);
//     })
// } 


    
// let rawArray = combineArrays(coloursArray);
// console.log(rawArray)

// uniqueArray = rawArray.filter((current, index, array)=>{
//     console.log("Tämä on indexOf:", array.indexOf(current), "Tämä on index:", index)
//     return array.indexOf(current) === index;
// })

// console.log(uniqueArray)
/* 
var data = [
    {
        mood: 'happy',
        fish: 'robin',
        colours: ['blue', 'green']
    },
    {
        mood: 'tired',
        fish: 'panther',
        colours: ['green', 'black', 'orange', 'blue']
    },
    {
        mood: 'sad',
        fish: 'goldfish',
        colours: ['green', 'red']
    },
    {
        mood: 'tired',
        fish: 'panther',
        cullors: ['green', 'black', 'orange', 'blue']
    },
    {
        mood: 'tired',
        fish: 'panther',
        colours: [undefined, 'black', 'orange', 'blue', 'kettu', 20]
    }
];

const getArr = (arr) => arr.map(obj => {
    return obj.colours;

});

const flattenArr = (arr) =>arr.reduce((total, sub)=>{
    return total.concat(sub);
});

const uniqueArr = (arr) => arr.filter((current,index,arr)=>{
    if(isNaN(current) && current !== undefined|null) 
        return arr.indexOf(current) === index;
});

let pipeline = [getArr, flattenArr, uniqueArr];

let result = pipeline.reduce((total, func)=>{
    return func(total);
}, data);

console.log(result); */