interface MultiplyValues {
     weight: number;
     height: number;
 }


const parseArguments = (args: Array<string>): MultiplyValues => {
     if (args.length < 4) throw new Error('Not enough arguments');
     if (args.length > 4) throw new Error('Too many arguments');
   
     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
       return {
          weight: Number(args[2]),
          height: Number(args[3])
       }
     } else {
       throw new Error('Provided values were not numbers!');
     }
   }

const calculator = (k: number, h: number) => {
    const bmi: number = k/(h*h)
    if(  bmi < 25) {
         console.log("Normal")
    } else if(25 < bmi  && bmi < 29) {
         console.log('Overweight')
    } else if(bmi >= 30) {
         console.log("Obese")
    } else {
        throw new Error('wrong credential');
    }
}

const { weight, height } = parseArguments(process.argv);

calculator(weight, height)