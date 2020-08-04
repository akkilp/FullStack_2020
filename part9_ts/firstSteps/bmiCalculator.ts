interface BMI{
    height: number;
    weight: number;
}


const parseNumbers = (args: Array<string>): BMI => {
    
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else{
        throw new Error('Acquired values are not numbers');
    }
};

interface BMI_Object{
    values: {
        weight: number,
        height: number,
    },
    bmi: number,
    message: string
}

const bmiCalculate = (weight: number, height: number): number =>{
    const value = (weight/(height/100*height/100));
    const decimalized = Number(value.toFixed(2));
    return decimalized;
};

const getMsg = ((BMI: number): string =>{
    if(BMI<18.5&&BMI<24) return 'Underweight';
    else if (BMI>18.5 && BMI<24) return 'Normal (healthy weight)';
    else if(BMI>24 && BMI<29.9) return 'Overweight';
    else if (BMI>29.9) return 'Niin läski äijä';
    else {
        throw new Error('Something went wrong in fetching message!');
    }
});

export const calculateBMI = (height: number, weight: number): BMI_Object|string => {
    if(!weight) throw new Error ('Invalid weight');
    if(!height) throw new Error ('Invalid height');
    if(isNaN(height) || isNaN(weight)) throw new Error ('Invalid input values');

    const BMI = bmiCalculate(weight, height);
    const message = getMsg(BMI);

    const returningObject = {
        values: {
            weight: weight,
            height: height,
        },
        bmi: BMI,
        message: message
    };
    return returningObject;

};

try{
    const{height, weight} = parseNumbers(process.argv);
    console.log(calculateBMI(height, weight));
} catch (error) {
    console.log(`Error caught: ${error as string}`);
}




