import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig'; // Import your Axios configuration
import './Form.css';


const UserForm = ({ onLogout }) => {

  const [formData, setFormData] = useState({
    petName: '',
    specie: '',
    breed: '',
    location: '',
    age: '',
    gender: '',
    reason:'',
    ifTemp:'',
    justify: '',
    ownerName:'',
    nic:'',
    contactEmail: '',
    contactPhoneNumber: '',
    photo: null,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Validate form inputs
  const requiredFields = [
    'petName',
    'specie',
    'breed',
    'location',
    'age',
    'gender',
    'reason',
    'ifTemp',
    'justify',
    'ownerName',
    'nic',
    'contactEmail',
    'contactPhoneNumber',
  ];
  
  // Check if any required field is empty
  for (const field of requiredFields) {
    if (!formData[field]) {
      window.alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
      return; // Stop submission if validation fails
    }
  }
    console.log(formData);
    
    try {
      const response = await axiosInstance.post('/pets/add', formData);
      console.log("New pet is added", response.data);
      window.alert('Your pet has been submitted successfully! We will notify you of the decision via email.');
      // Handle success response (e.g., show a success message or reset form)
    } catch (error) {
      console.error("There was an error adding the pet!", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Form className="user-form" onSubmit={handleSubmit}>
      <h4 className="mb-4 form-title">Adoption Form</h4>
      {/* Pet name and photo upload */}
      <Row className="mb-3">
        <Col md={8}>
          <Form.Group controlId="petName">
            <Form.Label>Name of your pet</Form.Label>
            <Form.Control
              className="textCombo"
              type="text"
              name="petName"
              placeholder="Enter the name"
              value={formData.petName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="text-center">
          <div className="photo-upload">
            <div className="photo-icon-wrapper">
              <div className="photo-icon">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Uploaded"
                    className="uploaded-photo"
                  />
                ) : (
                  <i className="bi bi-camera"></i>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="photo-input"
              />
            </div>
            <Form.Label>Add Photo</Form.Label>
          </div>
        </Col>
      </Row>

      {/* Category and breed */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="specie">
            <Form.Label>Specie</Form.Label>
            <Form.Select
              className="textCombo"
              name="specie"
              value={formData.specie}
              onChange={handleInputChange}
            >
              <option>Select specie</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="fish">Fish</option>
              <option value="rabbit">Rabbit</option>
              <option value="bird">Bird</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="breed">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              className="textCombo"
              type="text"
              name="breed"
              placeholder="Enter the breed"
              value={formData.breed}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

     
      {/* Age and gender */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              className="textCombo"
              type="text"
              name="age"
              placeholder="Enter pet's age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <div className="custom-radio d-flex">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label className="ms-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>
          </Form.Group>
        </Col>
      </Row>

 {/* Location */}
 <Form.Group controlId="location" className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          className="textCombo"
          type="text"
          name="location"
          placeholder="Enter the location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </Form.Group>

       {/* temp or adopt */}
<Row className="mb-3">
  <Col md={6}>
    <Form.Group controlId="reason">
      <Form.Label>Residency Type</Form.Label>
      <div className="custom-radio d-flex">
        <label>
          <input
            type="radio"
            name="reason"
            value="Temporary"
            checked={formData.reason === 'Temporary'}
            onChange={handleInputChange}
          />
          Temporary
        </label>
        <label className="ms-4">
          <input
            type="radio"
            name="reason"
            value="Adopt"
            checked={formData.reason === 'Adopt'}
            onChange={handleInputChange}
          />
          Adopt
        </label>
      </div>
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group controlId="ifTemp">
      <Form.Label>Duration</Form.Label>
      <Form.Select
        className="textCombo"
        name="ifTemp"
        value={formData.ifTemp}
        onChange={handleInputChange}
      >
        <option>Select duration</option>
        <option value="0">None</option>
        <option value="1">1 month</option>
        <option value="2">3 months</option>
        <option value="3">6 months</option>
        <option value="4">1 year</option>
        <option value="5">2 years</option>
      </Form.Select>
    </Form.Group>
  </Col>
</Row>


      {/* Justification */}
      <Form.Group controlId="justify" className="mb-4">
        <Form.Label>Justification for giving the pet</Form.Label>
        <Form.Control
          className="textCombo"
          as="textarea"
          name="justify"
          placeholder="Type here..."
          value={formData.justify}
          onChange={handleInputChange}
          rows={3}
        />
      </Form.Group>

      {/* Contact information */}
      <h4 className="mb-3">Contact Information</h4>
      <div className="contact-section mb-3">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="ownerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="controlCont"
              type="text"
              name="ownerName"
              placeholder="Enter your name"
              value={formData.ownerName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="nic">
            <Form.Label>NIC</Form.Label>
            <Form.Control
              className="controlCont"
              type="text"
              name="nic"
              placeholder="Enter your NIC"
              value={formData.nic}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="contactEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="controlCont"
              type="email"
              name="contactEmail"
              placeholder="Enter your email"
              value={formData.contactEmail}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="contactPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              className="controlCont"
              type="text"
              name="contactPhoneNumber"
              placeholder="Enter your phone number"
              value={formData.contactPhoneNumber}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      </div>
      <Button type="submit" className="w-100 save-continue-btn">
        Submit Your Pet
      </Button>
      <div className="sidebar-logout" onClick={onLogout}> {/* Call onLogout on click */}
        <FaArrowLeft className="sidebar-icon" />
        
      </div>
    </Form>
  );
};

export default UserForm;   
