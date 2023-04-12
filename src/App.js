import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    srno: "",
    receiverName: "",
    companyName: "",
    emailId: "",
    mobileNo:"",
    place:""
  });

  const [editFormData, setEditFormData] = useState({
    srno: "",
    receiverName: "",
    companyName: "",
    emailId: "",
    mobileNo:"",
    place:"",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      srno: addFormData.srno,
      receiverName: addFormData.receiverName,
      companyName: addFormData.companyName,
      emailId: addFormData.emailId,
      mobileNo: addFormData.mobileNo,
      place:addFormData.place,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      srno: editContactId,
      receiverName: editFormData.receiverName,
      companyName: editFormData.companyName,
      emailId: editFormData.emailId,
      mobileNo: editFormData.mobileNo,
      place: editFormData.place
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      srno: contact.srno,
      receiverName: contact.receiverName,
      companyName: contact.companyName,
      emailId: contact.emailId,
      mobileNo: contact.mobileNo,
      place: contact.place
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Receiver name</th>
              <th>Company Name</th>
              <th>Email ID</th>
              <th>Mobile No</th>
              <th>Place</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="srno"
          required="required"
          placeholder="Enter serial number"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="receiverName"
          required="required"
          placeholder="Enter Receiver's name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="companyName"
          required="required"
          placeholder="Enter Company Name."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="emailId"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
         <input
          type="text"
          name="mobileNo"
          required="required"
          placeholder="Enter Mobile No"
          onChange={handleAddFormChange}
        />
         <input
          type="text"
          name="place"
          required="required"
          placeholder="Enter place"
          onChange={handleAddFormChange}
        />
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
