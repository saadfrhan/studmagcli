#!/usr/bin/env node

import inquirer, { QuestionCollection } from "inquirer";
import { Student, StudentManagementSystem } from "./sms.js";
import { Actions } from "./types/index.js";
import { welcome } from "./utils/welcome.js";

async function main(students?: Student[]) {
  const sms = new StudentManagementSystem(students);
  const again = () => main(sms.listStudents());
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add student',
        'Enroll student',
        'Show balance',
        'List students',
        'Remove student',
        'Pay fees',
        'Show status',
        'Exit'
      ],
      filter: (val) => val.toUpperCase().replace(' ', '_')
    },
  ] as QuestionCollection<{ action: Actions }>)
  switch (action) {
    case 'ADD_STUDENT':
      const answers = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter student name:',
        validate: (val) => Boolean(val) || 'Please enter student name...'
      }])
      sms.addStudent(answers.name);
      again();
      break;
    case 'LIST_STUDENTS':
      console.table(sms.listStudents());
      again();
      break;
    case 'ENROLL_STUDENT':
      await sms.enrollStudent();
      again();
      break;
    case 'SHOW_BALANCE':
      await sms.showBalance();
      again();
      break;
    case 'PAY_FEES':
      await sms.payFees();
      again();
      break;
    case 'SHOW_STATUS':
      await sms.showStatus();
      again();
      break;
    case 'REMOVE_STUDENT':
      await sms.removeStudent();
      again();
      break;
    default:
      console.log('Exiting...');
      break;
  }
}

await welcome();
await main();