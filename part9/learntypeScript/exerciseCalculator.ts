interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Input {
    exercise: number[],
    target: number
}

const parseArgs = (args: Array<string>): Input => {
    if (args.length < 5) throw new Error('Not enough arguments');
    const arguments: Array<number> = args.slice(2).map((ar) => Number(ar))
    if (arguments) {
        return {
            exercise: arguments.slice(1),
            target: Number(arguments[0])
        };
    }
  }


const calc = (arg: Array<number>, t: number): Result => {
    const averageHour = arg.reduce((p, c) => p + c)/arg.length
    const trainingDays = arg.reduce((acc, day) => (day !== 0 ? acc + 1 : acc),0);

    if(averageHour < t) {
        return {
            periodLength: arg.length,
            trainingDays: trainingDays,
            success: false,
            rating: 1,
            ratingDescription: "not too bad but could be better",
            target: t,
            average: averageHour
        }
    } else if (averageHour >= t) {
        return {
            periodLength: arg.length,
            trainingDays: trainingDays,
            success: true,
            rating: t,
            ratingDescription: "good result",
            target: t,
            average: averageHour
        }
    } else {
        throw new Error('wrong credential');
    }
}

const { exercise, target } =  parseArgs(process.argv);

console.log(calc(exercise, target))