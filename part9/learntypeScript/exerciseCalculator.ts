interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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


const hours: Array<number> = [3, 1, 2, 4, 2, 1, 1];
const target: number = 2;

console.log(calc(hours, target))