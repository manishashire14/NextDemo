import React, { useState } from 'react';
// import styles from '../styles/Contact.module.css'



const Contact = () => {
  // const [name, setname] = useState('')
  // const [email, setemail] = useState('')
  // const [phone, setphone] = useState('')
  // const [desc, setdesc] = useState('')

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const data = {phone, name, email, desc};

  //   fetch('http://localhost:3000/api/postcontact', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => response.text())
  //     .then(data => {
  //       alert("Thanks for contacting us");
  //       setphone('')
  //       setname('')
  //       setdesc('')
  //       setemail('')
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });

  // }
  // const handleChange = (e) => {
  //   if (e.target.name == 'phone') {
  //     setphone(e.target.value)
  //   }
  //   else if (e.target.name == 'email') {
  //     setemail(e.target.value)
  //   }
  //   else if (e.target.name == 'desc') {
  //     setdesc(e.target.value)
  //   }
  //   else if (e.target.name == 'name') {
  //     setname(e.target.value)
  //   }
  // }

  return (
    <h1 className='d-flex justify-content-center p-5 mt-5'>manisha.shire@successive.tech</h1>
  )
};

export default Contact;
