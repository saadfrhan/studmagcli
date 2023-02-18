import inquirer from "inquirer";

class Student {
  id: number;
  name: string;
  courses?: string[];
  fees?: number

  constructor(
    name: string,
    id: number,
  ) {
    this.id = id;
    this.name = name;
    this.courses = [];
    this.fees = 0
  }

  enroll(course: string) {
    this.courses?.push(course)
  }

  viewFees() {
    console.log(`Pending fees: ${this.fees}`);
  }

  payFee(fee: number) {
    if (this.fees) {
      this.fees -= fee;
    } else console.log('The Student has no corresponding fees to pay.')
  }

  showStatus() {
    console.log(`
      Name: ${this.name}
      ID: ${this.id}
      Courses: ${this.courses}
      Balance: ${this.fees}
    `);
  }

}


// Student management system class
export class StudentManagementSystem {
  students: Student[];
  currentID: number;

  constructor() {
    this.students = [];
    this.currentID = 10000;
  }

  // Add student method
  addStudent(name: string) {
    const student = new Student(name, this.currentID);
    this.currentID++;
    this.students.push(student);
    console.log(`Student ${name} added. ID: ${student.id}`);
  }

  // Enroll student method
  enrollStudent() {
    inquirer.prompt([
      { type: 'input', name: 'id', message: 'Enter student ID:' },
      { type: 'input', name: 'course', message: 'Enter course name:' },
    ]).then(answers => {
      const student = this.students.find(s => s.id === parseInt(answers.id));
      if (student) {
        student.enroll(answers.course);
        console.log(`Student ${student.name} enrolled in course ${answers.course}.`);
      } else {
        console.log(`Student with ID ${answers.id} not found.`);
      }
    });
  }

  listStudents() {
    return this.students;
  }

  // View balance method
  viewBalance() {
    inquirer.prompt([
      { type: 'input', name: 'id', message: 'Enter student ID:' },
    ]).then(answers => {
      const student = this.students.find(s => s.id === parseInt(answers.id));
      if (student) {
        student.viewFees();
      } else {
        console.log(`Student with ID ${answers.id} not found.`);
      }
    });
  }

  // Pay tuition method
  payTuition() {
    inquirer.prompt([
      { type: 'input', name: 'id', message: 'Enter student ID:' },
      { type: 'input', name: 'amount', message: 'Enter payment amount:' },
    ]).then(answers => {
      const student = this.students.find(s => s.id === parseInt(answers.id));
      if (student) {
        student.payFee(parseInt(answers.amount));
      } else {
        console.log(`Student with ID ${answers.id} not found.`);
      }
    });
  }

  // Show status method
  showStatus() {
    inquirer.prompt([
      { type: 'input', name: 'id', message: 'Enter student ID:' },
    ]).then(answers => {
      const student = this.students.find(s => s.id === parseInt(answers.id));
      if (student) {
        student.showStatus();
      } else {
        console.log(`Student with ID ${answers.id} not found.`);
      }
    });
  }
}