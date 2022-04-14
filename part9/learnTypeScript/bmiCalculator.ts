  interface MultiplyValues {
      weight: number
      height: number
  }


const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
         weight: Number(args[2]),
         height: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

const calculator = (k: number, h: number) => {
   const bmi: number = k/(h*h);
   if(  bmi < 25) {
        return "Normal";
   } else if(25 < bmi  && bmi < 29) {
        return 'Overweight';
   } else if(bmi >= 30) {
        return "Obese";
   } else {
       throw new Error('wrong credential');
   }
};

if(require.main === module) {
  try {
    const { weight, height } = parseArguments(process.argv);
    const result = calculator(weight, height);
    console.log(result);
  } catch (e: any) {
    console.log(e.message);
  }
}

export default calculator;
