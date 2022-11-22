import styles from './form.module.css';
import { useHistory } from 'react-router-dom';
import FunctionalButton from '../Buttons/FunctionalButton';

const Form = ({ onSubmitFunction, children, buttonMessage, formTitle, resetFunction }) => {
  let history = useHistory();
  const back = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className={styles.form__container}>
      <form onSubmit={onSubmitFunction} className={styles.form}>
        <h2>{formTitle}</h2>
        {children}
        <div className={styles.div__buttons}>
          <FunctionalButton
            action={back}
            buttonType="form__button"
            buttonColor="red"
            title="Cancel"
          />
          <FunctionalButton
            buttonType="form__button"
            buttonColor="green"
            type="submit"
            title={buttonMessage}
          />
          <FunctionalButton
            buttonType="form__button"
            buttonColor="green"
            type="button"
            title="Reset"
            action={resetFunction}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
