import React, { useState, useEffect } from "react";
import $ from "jquery";
import { CForm, CFormInput, CFormLabel, CButton } from "@coreui/react";

const BASE_URL = "http://localhost:3000";

const UserForm = ({ selectedUser, onFormSubmit, onReset, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    bod: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        age: selectedUser.age,
        bod: selectedUser.bod,
      });
    } else {
      resetForm();
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ini form data", formData);
    if (selectedUser) {
      updateData();
    } else {
      insertData();
    }
    // please submit from url backend
  };

  const insertData = () => {
    $.ajax({
      url: `${BASE_URL}/api/users/`,
      type: "POST",
      data: formData,
      success: () => {
        console.log("this is success");
        onSuccess();
        onFormSubmit();
        handleReset();
      },
      error: (xhr, status, error) => {
        alert("Terjadi Kesalahan");
        console.error("Error:", error);
      },
    });
  };

  const updateData = () => {
    console.log("selected user", selectedUser);
    $.ajax({
      url: `${BASE_URL}/api/users/${selectedUser.id}`,
      type: "PUT",
      data: formData,
      success: () => {
        console.log("this is success");
        onSuccess();
        onFormSubmit();
        handleReset();
      },
      error: (xhr, status, error) => {
        alert("Terjadi Kesalahan");
        console.error("Error:", error);
      },
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
    });
  };

  const handleReset = () => {
    resetForm();
    onReset();
  };

  return (
    <div className="container mt-5">
      <h2>{selectedUser ? "Edit User" : "Create User"}</h2>
      <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="age">Age</CFormLabel>
          <CFormInput
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="bod">Date of Birth</CFormLabel>
          <CFormInput
            type="date"
            id="bod"
            name="bod"
            value={formData.bod}
            onChange={handleChange}
            required
          />
        </div>
        <CButton type="submit" color="primary">
          {selectedUser ? "Update" : "Submit"}
        </CButton>
        <CButton type="button" color="secondary" onClick={handleReset}>
          Reset
        </CButton>
      </CForm>
    </div>
  );
};

export default UserForm;
