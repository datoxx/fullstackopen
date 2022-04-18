 interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
  interface baseCourseWithDescription extends CoursePartBase {
    description: string;
  }
  
  interface CourseNormalPart extends baseCourseWithDescription {
    name: "Fundamentals";
  }
  interface CourseProjectPart extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends baseCourseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }
  
  interface CoursePartFour extends baseCourseWithDescription {
    name: 'Fullstackopen';
    studentEnrolled: number;
  }

  export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CoursePartFour;