import inquirer, { QuestionCollection } from "inquirer";

const IdQuestion: QuestionCollection<{ id: string }> = {
  type: 'input',
  name: 'id',
  message: 'Enter student ID:',
  validate: (val) => val.toString().length === 5 || 'Enter 5 digit ID...'
}

export class Student {
  constructor(
    public name: string,
    public id: string,
    public courses: string[] = [],
    public fees: number = 0
  ) { }

  enroll(course: string) {
    this.courses.push(course);
  }

  viewFees() {
    console.log(`Pending fees: ${this.fees}`);
  }

  payFee(fee: number) {
    if (!this.fees) {
      console.log('The student has no corresponding fees to pay.');
      return;
    }
    this.fees -= fee;
    console.log(`Updated student's fee: ${this.fees}`);
  }

  showStatus() {
    console.log(`
      Name: ${this.name}
      ID: ${this.id}
      Courses: ${this.courses || 'None'}
      Pending fees: ${this.fees}
    `);
  }
}

export class StudentManagementSystem {
  private students: Student[];

  constructor(students?: Student[]) {
    this.students = students ?? [];
  }

  // Add student method
  addStudent(name: string) {
    const student = new Student(
      name,
      (Math.floor(Math.random() * 99999)).toString()
    );
    this.students.push(student);
    console.log(`Student ${name} added. ID: ${student.id}`);
  }

  async enrollStudent() {
    const { id, course } = await inquirer.prompt([
      {
        type: 'input',
        name: 'course',
        message: 'Enter course name:',
        validate: (val) => Boolean(val) || 'Please enter course name...',
      },
      ...[IdQuestion]
    ] as QuestionCollection<{ id: string, course: string }>);
    const student = this.students.find(s => s.id === id);
    if (student) {
      student.enroll(course);
      student.fees += 500
      console.log(`Student ${student.name} enrolled in course ${course}.`);
    } else {
      console.log(`Student with ID ${id} not found.`);
    }
  }

  async removeStudent() {
    const { id } = await inquirer.prompt([IdQuestion]);
    const idx = this.students.findIndex(s => s.id === id);
    this.students.splice(idx, 1);
    console.log(`Updated student list:`)
    console.log(JSON.stringify(this.students, null, 2));
  }

  listStudents() {
    return this.students;
  }

  async showBalance() {
    const { id } = await inquirer.prompt([IdQuestion]);
    const student = this.students.find(s => s.id === id);
    if (student) {
      student.viewFees();
    } else {
      console.log(`Student with ID ${id} not found.`);
    }
  }

  async payFees() {
    const { id, amount } = await inquirer.prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Enter payment amount:',
        validate: (val) => !(isNaN(val)) || 'Enter amount in numbers...',
      },
      ...[IdQuestion]
    ] as QuestionCollection<{ id: string; amount: number }>)
    const student = this.students.find(s => s.id === id);
    if (student) {
      student.payFee(Number(amount));
      console.log(`Updated student's fee: ${student.fees}`)
    } else {
      console.log(`Student with ID ${id} not found.`);
    }
  }

  async showStatus() {
    const { id } = await inquirer.prompt([IdQuestion]);
    const student = this.students.find(s => s.id === id);
    if (student) {
      student.showStatus();
    } else {
      console.log(`Student with ID ${id} not found.`);
    }
  }
}