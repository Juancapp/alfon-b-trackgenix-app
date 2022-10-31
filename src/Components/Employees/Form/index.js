import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  var product = urlParams.get('id');
  console.log(urlValues);
  console.log(urlParams);
  console.log(product);
  console.log(typeof product);
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [dniValue, setDniValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  if (idRegEx.test(product)) {
    useEffect(async () => {
      try {
        const response = await fetch(`http://localhost:5000/employees/${product}`);
        const data = await response.json();
        setNameValue(data.data.name);
        setLastNameValue(data.data.lastName);
        setEmailValue(data.data.email);
        setPasswordValue(data.data.password);
        setDniValue(data.data.dni);
        setPhoneValue(data.data.phone);
      } catch (error) {
        console.error(error);
      }
    }, []);
  }

  const editEmployee = async (product) => {
    if (confirm('¿Edit employee?')) {
      await fetch(`http://localhost:5000/employees/${product}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          dni: dniValue,
          phone: phoneValue
        })
      });
    }
  };

  const createEmployee = async () => {
    if (confirm('Create employee?')) {
      await fetch(`http://localhost:5000/employees/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          dni: dniValue,
          phone: phoneValue
        })
      });
    }
  };

  const changeName = (e) => {
    setNameValue(e.target.value);
  };
  const changeLastName = (e) => {
    setLastNameValue(e.target.value);
  };
  const changeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const changePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const changePhone = (e) => {
    setPhoneValue(e.target.value);
  };
  const changeDni = (e) => {
    setDniValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form>
        <h2>Form</h2>
        <div>
          <label htmlFor="input-name">Name</label>
          <input id="input-name" name="name" required value={nameValue} onChange={changeName} />
        </div>
        <div>
          <label htmlFor="input-lastName">Last Name</label>
          <input
            id="input-lastName"
            name="lastName"
            required
            value={lastNameValue}
            onChange={changeLastName}
          />
        </div>
        <div>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" name="email" required value={emailValue} onChange={changeEmail} />
        </div>
        <div>
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            required
            value={passwordValue}
            onChange={changePassword}
          />
        </div>
        <div>
          <label htmlFor="input-dni">DNI</label>
          <input id="input-dni" name="dni" required value={dniValue} onChange={changeDni} />
        </div>
        <div>
          <label htmlFor="input-phone">Phone</label>
          <input id="input-phone" name="phone" required value={phoneValue} onChange={changePhone} />
        </div>
      </form>
      <button
        type="submit"
        onClick={idRegEx.test(product) ? () => editEmployee(product) : () => createEmployee()}
      >
        Save
      </button>
    </div>
  );
}

export default Form;
