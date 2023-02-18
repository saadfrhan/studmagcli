#!/usr/bin/env node

import inquirer from "inquirer";
import { StudentManagementSystem } from "./sms.js";

async function main() {
  const sms = new StudentManagementSystem();

  await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add student', 'Enroll student', 'View balance', 'Pay tuition', 'Show status', 'Exit'],
    },
  ]).then(async answers => {
    switch (answers.action) {
      case 'Add student':
        await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Enter student name:' },
        ]).then(answers => {
          sms.addStudent(answers.name);
          main();
        });
        break;
      case 'Enroll student':
        sms.enrollStudent();
        main();
        break;
      case 'View balance':
        sms.viewBalance();
        main();
        break;
      case 'Pay tuition':
        sms.payTuition();
        main();
        break;
      case 'Show status':
        sms.showStatus();
        main();
        break;
      case 'Exit':
        console.log('Exiting...');
        break;
    }
  });
}

// Start the application
main();