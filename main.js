#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import Table from "cli-table3";
let tasks = [];
let loop = true;
var Commands;
(function (Commands) {
    Commands["create"] = "Create a New Task";
    Commands["delete"] = "Delete a Task from the List";
    Commands["display"] = "Display Your Task List";
    Commands["exit"] = "Exit";
})(Commands || (Commands = {}));
/* ============ Create Task Function ============ */
async function createTask() {
    const taskInput = await inquirer.prompt({
        name: "task",
        type: "input",
        message: chalk.yellow("Please input your new task"),
    });
    tasks.push(taskInput.task);
    console.log(chalk.green("Task Added successfully!"));
}
/* ============ Delete Task Function ============ */
async function deleteTask() {
    if (tasks.length === 0) {
        console.log(chalk.red("No Task to delete"));
        return;
    }
    const taskToDelete = await inquirer.prompt({
        name: "task",
        type: "list",
        message: chalk.yellow("Select task to delete"),
        choices: tasks,
    });
    const index = tasks.indexOf(taskToDelete.task);
    tasks.splice(index, 1);
    console.log(chalk.green("Task deleted successfully!"));
}
/* ============ Display Task Function ============ */
async function displayTaskList() {
    console.log(chalk.magenta("Your Task List: "));
    const table = new Table({
        head: ["#", "Task"]
    });
    tasks.forEach((task, index) => {
        table.push([index + 1, task]);
    });
    console.log(table.toString());
}
/* ============ Exit Program Function ============ */
async function exitProgram() {
    loop = false;
    console.log(chalk.blueBright("Thank you! Have a good day ahead."));
}
/* ============ Main Function ============ */
async function main() {
    while (loop) {
        const OptionSelect = await inquirer.prompt({
            name: "Commands",
            type: "list",
            message: chalk.yellow("Select an option"),
            choices: Object.values(Commands)
        });
        switch (OptionSelect.Commands) {
            case Commands.create:
                await createTask();
                break;
            case Commands.delete:
                await deleteTask();
                break;
            case Commands.display:
                await displayTaskList();
                break;
            case Commands.exit:
                await exitProgram();
            default:
                break;
        }
    }
}
main();
