import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

export const sleep = (ms: number = 2000) => new Promise(resolve => setTimeout(resolve, ms));

export async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to the Student Management System');
  await sleep();
  console.log(`
    ${chalk.bgBlue('Instructions ')}
    ${chalk.blue('1.')} Add your very first student.
    ${chalk.blue('2.')} Enroll it to a course.
    ${chalk.blue('3.')} See it's status.
    ${chalk.blue('4.')} Retrieve student balance.
    ${chalk.blue('5.')} List all students.
    ${chalk.blue('6.')} Pay fees.
    ${chalk.blue('7.')} Remove him.
  `)
  rainbowTitle.stop();
  await sleep(1000);
}