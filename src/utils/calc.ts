export type TaskObject = {
    taskId: string;
    value: number;
  };
  
  interface MarksObject {
    marks: number;
    projectId: string;
  }
  
  // function to calculate total points per project
  export async function calculateTotal(array: TaskObject[]) {
    let total = 0;
    for (const item of array) {
      total += item.value;
    }
    return total;
  }
  
  export function calculateTotalMarks(data: MarksObject[]): number {
    let totalMarks: number = 0;
    for (const item of data) {
      totalMarks += item.marks;
    }
    return totalMarks;
  }