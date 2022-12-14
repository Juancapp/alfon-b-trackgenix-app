import React from 'react';
import TableRow from 'Components/Shared/Table/tableRow.js';
import styles from 'Components/Shared/Table/table.module.css';
import RedirectButton from 'Components/Shared/Buttons/RedirectButton.jsx';

const Table = ({
  title,
  columns,
  data,
  deleteItem,
  edit,
  error,
  employeeId,
  inProfile = false,
  setHours
}) => {
  if (!data) return null;
  return (
    <>
      <h2 className={styles.entity}>{title}</h2>
      {data.length !== 0 ? (
        <table className={styles.table}>
          <thead className={styles.tHead}>
            <tr>
              {columns.map((item, index) => {
                return <th key={index}>{item.heading}</th>;
              })}
            </tr>
          </thead>
          <tbody className={styles.tRow}>
            {data.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  item={item}
                  columns={columns}
                  deleteItem={deleteItem}
                  edit={edit}
                  employeeId={employeeId}
                  setHours={setHours}
                  inProfile={inProfile}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <h3>{error}</h3>
      )}
      <RedirectButton
        buttonType="create__button"
        buttonColor="green"
        title="Create"
        path={`${edit}`}
      />
    </>
  );
};

export default Table;
