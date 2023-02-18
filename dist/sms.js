import inquirer from "inquirer";
class Student {
    id;
    name;
    courses;
    fees;
    constructor(name, id) {
        this.id = id;
        this.name = name;
        this.courses = [];
        this.fees = 0;
    }
    enroll(course) {
        this.courses?.push(course);
    }
    viewFees() {
        console.log(`Pending fees: ${this.fees}`);
    }
    payFee(fee) {
        if (this.fees) {
            this.fees -= fee;
        }
        else
            console.log('The Student has no corresponding fees to pay.');
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
export class StudentManagementSystem {
    students;
    currentID;
    constructor() {
        this.students = [];
        this.currentID = 10000;
    }
    addStudent(name) {
        const student = new Student(name, this.currentID);
        this.currentID++;
        this.students.push(student);
        console.log(`Student ${name} added. ID: ${student.id}`);
    }
    enrollStudent() {
        inquirer.prompt([
            { type: 'input', name: 'id', message: 'Enter student ID:' },
            { type: 'input', name: 'course', message: 'Enter course name:' },
        ]).then(answers => {
            const student = this.students.find(s => s.id === parseInt(answers.id));
            if (student) {
                student.enroll(answers.course);
                console.log(`Student ${student.name} enrolled in course ${answers.course}.`);
            }
            else {
                console.log(`Student with ID ${answers.id} not found.`);
            }
        });
    }
    viewBalance() {
        inquirer.prompt([
            { type: 'input', name: 'id', message: 'Enter student ID:' },
        ]).then(answers => {
            const student = this.students.find(s => s.id === parseInt(answers.id));
            if (student) {
                student.viewFees();
            }
            else {
                console.log(`Student with ID ${answers.id} not found.`);
            }
        });
    }
    payTuition() {
        inquirer.prompt([
            { type: 'input', name: 'id', message: 'Enter student ID:' },
            { type: 'input', name: 'amount', message: 'Enter payment amount:' },
        ]).then(answers => {
            const student = this.students.find(s => s.id === parseInt(answers.id));
            if (student) {
                student.payFee(parseInt(answers.amount));
            }
            else {
                console.log(`Student with ID ${answers.id} not found.`);
            }
        });
    }
    showStatus() {
        inquirer.prompt([
            { type: 'input', name: 'id', message: 'Enter student ID:' },
        ]).then(answers => {
            const student = this.students.find(s => s.id === parseInt(answers.id));
            if (student) {
                student.showStatus();
            }
            else {
                console.log(`Student with ID ${answers.id} not found.`);
            }
        });
    }
}
//# sourceMappingURL=sms.js.map