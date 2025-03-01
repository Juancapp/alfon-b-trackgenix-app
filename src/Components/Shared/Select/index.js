import styles from 'Components/Shared/Select/select.module.css';

const Select = ({
  list,
  name,
  kind,
  secondKind,
  id = null,
  title,
  register,
  error,
  objectN = null
}) => {
  const registerFn = objectN ? { ...register(name, objectN) } : { ...register(name) };

  return (
    <label className={styles.label}>
      {title}
      <select className={styles.select} {...registerFn}>
        {!id && <option hidden>- Select {title.toLowerCase()} -</option>}
        <option hidden>- Please select an existing {title.toLowerCase()} -</option>
        {list.map((item) => (
          <option value={item._id} key={item._id} className={styles.select}>
            {`${item[kind]} ${secondKind && item[secondKind]}`}
          </option>
        ))}
        {!list.length && <option disabled>- The {title.toLowerCase()}s list is empty -</option>}
      </select>
      {error && <p className={styles.label}>{error}</p>}
    </label>
  );
};

export default Select;
