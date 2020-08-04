interface Result {
    periodLength : number;
    success : boolean;
    rating : number;
    ratingDescription : string;
    target : number;
    average : number;
}

export const calculateExercice = (args: Array<number>, target: number): Result => {

    if(!target || args.length<1) throw new Error('Parameters missing');
    if(!target || isNaN(target)) throw new Error('Invalid target value');
    args.map(arg => {
        if(isNaN(arg)) throw new Error('Exercise value is not a number');
        if(24<arg||arg<0) throw new Error('Exercise value is not in the range 0-24');
    });

    const calculateInfo = (() =>{
        args.map(item => {
            count+=item; 
            item!== 0 ? trainingDays++ : null;
        });
    });

    const getRating = ((ratio: number): number=>{
        if(0.8>ratio){
            message = 'You need to increase exercising.';
            return 1;
        }
        else if(0.8<ratio&&ratio<1){
            message = 'Not too bad, could be better';
            return 2;
        }
        else if(1<ratio&&ratio<1.2){
            message = 'Your exercising is decent.';
            return 2;
        }
        else if(ratio>1.2){
            message = 'Your exercising is great. Keep on the good work.';
            return 3;
        }
        else{
            throw new Error('Problem in calculating the rating');
        }
    });

    let count = 0;
    let trainingDays = 0;
    const periodDays = args.length;
    calculateInfo();
    const average = count/periodDays;
    const wasTargetReached = target<=average ? true : false; 
    const ratio = average/target;
    let message = '';

    const exerciceObject = {
        periodLength: args.length,
        trainingDays: trainingDays,
        success: wasTargetReached,
        rating: getRating(ratio),
        ratingDescription: message,
        target: target,
        average: average,
    };
    return exerciceObject;
};

interface ExerciceData {
    target: number;
    exerciceArray: Array<number>;
}

const parseData = (args: Array<string>): ExerciceData => {
    if(args.length < 4) throw new Error('Not enough arguments');
    let target = 0;
    const exerciceArr: Array<number> = [];

    args.map((arg, i=2) => {
        const item = Number(arg);
        if(i>1){
            if (!isNaN(item)){
                if(item<24&&item>-1){
                    if(i==2) target=item;
                    else if (i>2) {
                        exerciceArr.push(item);
                    }
                    else throw new Error ('Something went wrong');
                } 
                else throw new Error ('Invalid number (0-24h)');
            }
            else throw new Error ('Provided values were not numbers');
        }
    });

    return {
        target: target,
        exerciceArray: exerciceArr
    };
};

try{
    const{target, exerciceArray} = parseData(process.argv);
    console.log(calculateExercice(exerciceArray, target));
} catch (error) {
    console.log(`Error caught: ${error as string}`);
}

