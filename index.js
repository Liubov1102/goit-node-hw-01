//console.log("Welcome to GoIT, friends!")
const contacts = require('./contacts');
const {program} = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts)
            break;

        case "get":
            const contact = await contacts.getContactById(id);
            console.log(contact);
            break;

        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            break;
        case "update":
            const update = await contacts.updateContact(id, name, email, phone);
            console.log(update);
            break;
        case "remove":
            const remove = await contacts.removeContact(id);
            console.log(remove);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!!!");
    }
};
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
//console.log(options);
invokeAction(options);



