const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'db/contacts.json');
const updateById = async (contacts) =>
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id);
    return result || null;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
       id: nanoid(), name, email, phone, 
    };
    contacts.push(newContact);
    await updateById(contacts);
    return newContact;
};

const updateContact = async (id, name, email, phone) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, name, email, phone };
    await updateById(contacts);
    return contacts[index];
};

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateById(contacts);
    return result;
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact
};