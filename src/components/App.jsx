import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/contactsOps';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import css from './App.module.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css['app-container']}>
      <h1>Contact Book</h1>
      <ContactsForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;
