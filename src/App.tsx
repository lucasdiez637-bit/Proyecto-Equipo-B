import './App.css'
import Calendar from './components/Calendar/Calendar';
import Chatbot from './components/Chatbot/Chatbot';
import Contact from './components/Contact/Contact';
import Footer from './components/footer/Footer';
import Hero from './components/Hero/Hero';
import Metrics from './components/Metrics/metricas';
import Navbar from './components/Navbar/Navbar';
import Payment from './components/Payment-Gateway/payment';
import Speakers from './components/Speakers/Speakers';
import Sponsor from './components/Sponsor/sponsor';
import Sponsors from './components/Sponsors/sponsors';
import Tickets from './components/tickets/Tickets';
import Timer from './components/timer/Timer';

function App() {
  return (
    <>
    <Navbar />
    <Hero />
    <Metrics />
    <Speakers />
    <Calendar />
    <Timer />
    <Tickets />
    <Payment />
    <Sponsor/>
    <Sponsors />
    <Contact/>
    <Footer />
    <Chatbot/>
    </>
  );
}

export default App
