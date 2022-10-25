import { Component } from 'react';
import { AppStyled } from './App.module';
import { ContactForm } from './ContactForm/ContactForm ';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { PropTypes } from 'prop-types';

const shortid = require('shortid');
const contactId = shortid.generate();

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };


//   componentDidMount() {
//     const savedContacts = JSON.parse(localStorage.getItem(`myContacts`))
//     this.setState({contacts: savedContacts});
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem(`myContacts`, JSON.stringify(this.state.contacts));
//     }
//   }

  onSubmitHendler = data => {
    const contact = {
      id: contactId,
      name: data.name,
      number: data.number,
    };

    const contactName = [];

    for (const contact of this.state.contacts) {
      contactName.push(contact.name);
    }

    if (contactName.includes(contact.name)) {
      alert(`${contact.name} is already in contacts list`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  filterName = event => {
    console.log(event.currentTarget.value);
    this.setState({ filter: event.currentTarget.value });
  };

  delete = contactId => {
    console.log(contactId);

    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactId !== contact.id),
    }));
  };

  render() {
    const filterNormilized = this.state.filter.toLowerCase().trim();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormilized)
    );

    return (
      <AppStyled>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.onSubmitHendler} />
        <Filter value={this.state.filter} onChengeFilter={this.filterName} />
        <ContactsList contacts={visibleContacts} deleteContact={this.delete} />
        {/* <AlertInfo />
        <AlertInfo onClose={() => {}}>This is a success alert — check it out!</AlertInfo> */}
      </AppStyled>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  onSubmitHendler: PropTypes.func,
  delete: PropTypes.func,
  filterName: PropTypes.func,
};
