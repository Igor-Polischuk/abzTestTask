import { Link } from 'react-scroll'

import Header from '../header/Header';
import Users from '../users/Users';
import FormSection from '../form/Form';

import './App.scss';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <section className="hero">
          <div className="hero__text">
            <h1>Test assignment for front-end developer</h1>
            <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
            <Link to='form_section' smooth={true} className="button">Sign up</Link>
          </div>
        </section>
        <Users/>
        <FormSection/>
      </main>
    </div>
  );
}

export default App;
