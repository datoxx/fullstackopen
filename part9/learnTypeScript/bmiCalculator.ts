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

export default calculator;
