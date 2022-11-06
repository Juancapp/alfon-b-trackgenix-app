import listItemStyles from './listItem.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };

  const projectsEmployee = listItem.employees
    .map((e) => (e.employee ? e.employee : ''))
    .map((e) => [e.name, ' ', e.last_name ? e.last_name : e.lastName]);

  return (
    <tr className="rows" key={listItem._id}>
      <td>{listItem.name}</td>
      <td>{listItem.description}</td>
      <td>{listItem.clientName}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.endDate}</td>
      <td>{projectsEmployee}</td>
      <td>{listItem.active ? 'true' : 'false'}</td>
      <td>
        <div className={listItemStyles.actions}>
          <a className={listItemStyles.crossLogo} onClick={() => handleDelete(listItem._id)}>
            <i className="fa-solid fa-x"></i>
          </a>
          <a className={listItemStyles.edit} href={`/projects/form?id=${listItem._id}`}>
            <i className="fa-solid fa-pen-to-square"></i>
          </a>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;