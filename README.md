# 🐾 Pet Adoption Management System

A full-stack web application designed to streamline the process of pet adoption. This system facilitates seamless interactions between potential adopters and pet shelters, ensuring that every pet finds a loving home.

---

## Features

- **User Registration & Authentication**: Secure sign-up and login functionalities for users.
- **Spring Boot Security Integration**: Robust authentication and authorization using Spring Security.
- **Token Expiry Handling**: Sessions/tokens automatically expire after a specified time for added security.
- **Pet Listings**: Browse through available pets with detailed information.
- **Adoption Requests**: Users can submit adoption applications for their chosen pets.
- **Admin Dashboard**: Manage pet listings, view adoption requests, and oversee user activities.
- **Doctor Management**: Admin can assign doctors to check pets for health issues.
- **User-Contributed Pets**: Users can submit pets for adoption or temporary protection via a form with image upload.
- **Pet Health Approval**: Doctors physically examine the pet and approve/reject based on health.
- **Pet Profile Management**: Admin can manage bills, edit details, or add new pets directly.
- **Employee Management**: Admin can manage the list of employees involved in pet care.
- **Pagination**: Applied in pet listings, employee lists, and doctor lists for optimal performance.
- **Postman**: Used for testing backend APIs and authentication during development.
- **Responsive & User-Friendly Interface**: Designed with usability and clarity in mind.

---

## Tech Stack

- **Frontend**:
  - HTML5
  - CSS3
  - ReactJS

- **Backend**:
  - Java (Spring Boot)
  - Spring Security (with session/token expiration)
  - JSP (JavaServer Pages)

- **Database**:
  - MySQL (Used GLOB type to store pet images)

- **Tools & Platforms**:
  - Apache Tomcat
  - JDBC
  - Spring Tool Suite / IntelliJ
  - Postman (for API testing)

---
## System Workflow

1. A user fills out a **Pet Submission Form**, optionally uploading a picture of the pet.
2. The pet’s data is stored in the database, and the request appears in the **Admin Panel - Requested Pet List**.
3. An **Admin** assigns a **Doctor** to examine the pet.
4. The **Doctor physically inspects** the pet and updates the health status (Approve or Reject).
5. Once approved, the pet moves into the **Adoptable Pets List** and becomes visible to the public.
6. Admins can manage the pet’s **profile, add medical bills**, or edit any details.
7. Additionally, pets can also be added directly by admins without user submission, for cases when pets are brought in manually.

---
### Role-Based Login Flow

- A single login form is used by both Users and Admins.
- After login:
  - **Users** are directed to a pet submission form where they can offer pets for adoption or protection.
  - **Admins** are directed to the Admin Panel to manage the system (pet approvals, doctor assignments, etc.).

---

##  User Interfaces

###  Login & Signup

Simple and secure login and signup interfaces with proper validation and error handling.

![login Page](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/Login.png)
![SignUp Page](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/Signup.png)

---

###  Add Pet (User Form)

Users can submit a pet for adoption or temporary protection. They can fill out the form with pet details and upload an image. The image is stored using SQL `GLOB` type.

![User Form](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/Form.png)

---

### Admin Panel - Requested Pet List

All pet requests submitted by users are listed here. Admin can approve or reject requests based on doctor evaluations.

![Requested Pet List](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/RequestedPets.png)

---

### Doctor Management

Admins can assign doctors, and doctors can view pet health requests. After a physical examination, doctors decide whether the pet is healthy and suitable for adoption.

#### Doctors' Profiles
![Doc Prof](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/DocMan.png)
#### Doctor's Decision
![Doc Decision](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/DocDeci.png)

---

### Pet Profile

Each pet has a detailed profile page. Admins can manage bills, update pet information, or add new pets who are brought physically to the shelter (not through the user form).

![Pet profile](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/PerProf.png)
![Pet profile](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/PetProf2.png)

---

###  Employee Management

Admins can manage shelter employees here, with pagination implemented for smoother navigation.

![Employee](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/EmpMan.png)

---

### Pagination Example

![Pet profile](https://github.com/samiho03/Pet-Adoption-Management/blob/main/ImagesPet1/PetProfPagination.png)

---


