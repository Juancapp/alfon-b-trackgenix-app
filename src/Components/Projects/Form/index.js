import { useState, useEffect } from 'react';
import formStyles from './form.module.css';

const fullUrl = window.location.href;
const id = fullUrl.substring(fullUrl.lastIndexOf('=') + 1);
const initialValue = {
  name: '',
  description: '',
  clientName: '',
  startDate: '',
  endDate: '',
  employees: '',
  active: true
};
const AddItem = () => {
  const [project, setProject] = useState(initialValue);
  const [employees, setEmployees] = useState([]);

  useEffect(async () => {
    if (window.location.href.includes('id')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setProject({
          name: data.data.name,
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          active: true
        });
        setEmployees(data.data.employees);
      } catch (error) {
        alert('Could not GET Project.', error);
      }
    } else {
      return null;
    }
  }, []);

  const editItem = async ({ name, description, clientName, startDate, endDate, active }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        clientName,
        startDate,
        endDate,
        employees: employees,
        active
      })
    });
  };

  const createProject = async ({ name, description, clientName, startDate, endDate, active }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        clientName,
        startDate,
        endDate,
        employees: employees,
        active
      })
    });
  };

  const cleanInputs = () => {
    setProject(initialValue);
    setEmployees([]);
  };
  const onSubmit = (e) => {
    if (!window.location.href.includes('id')) {
      e.preventDefault();
      createProject(project);
      cleanInputs();
    } else {
      e.preventDefault();
      editItem(project);
      cleanInputs();
    }
  };

  return (
    <div className={formStyles.container}>
      <h2>Form</h2>
      <div>
        <form className={formStyles.form} onSubmit={onSubmit}>
          <div className={formStyles.formRaws}>
            <label>Project Name</label>
            <input
              className={formStyles.inputs}
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>Description</label>
            <input
              className={formStyles.inputs}
              type="text"
              name="description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>Client Name</label>
            <input
              className={formStyles.inputs}
              type="text"
              name="clientName"
              value={project.clientName}
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>Start Date</label>
            <input
              className={formStyles.inputs}
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={(e) => setProject({ ...project, startDate: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>End date</label>
            <input
              className={formStyles.inputs}
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={(e) => setProject({ ...project, endDate: e.target.value })}
            />
          </div>
          <div>
            <label> Add Employees</label>
            {employees.map((employee, index) => (
              <div key={index} id="employee-form">
                <label>Employee</label>
                <input
                  type="text"
                  name="employee"
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        employee: e.target.value.slice(-24)
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                ></input>
                <label>rate</label>
                <input
                  type="text"
                  name="rate"
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        rate: e.target.value
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                />
                <input
                  type="text"
                  name="role"
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        role: e.target.value
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                ></input>
                <button
                  type="button"
                  onClick={(e) => {
                    e.target.closest('div').remove();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <div>
              <button
                onClick={() =>
                  setEmployees([
                    ...employees,
                    {
                      employee: '',
                      rate: 0,
                      role: ''
                    }
                  ])
                }
                type="button"
              >
                Add Employee
              </button>
            </div>
          </div>
          <div>
            <input className={formStyles.submit} type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
