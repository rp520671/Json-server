import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.srno}</td>
      <td>{contact.receiverName}</td>
      <td>{contact.companyName}</td>
      <td>{contact.emailId}</td>
      <td>{contact.mobileNo}</td>
      <td>{contact.place}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
