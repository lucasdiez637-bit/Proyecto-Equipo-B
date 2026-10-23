import './App.css'
import Calendar from './components/Calendar/Calendar';
import Chatbot from './components/Chatbot/Chatbot';
import Contact from './components/Contact/Contact';
import Hero from './components/Hero/Hero';
import Metrics from './components/Metrics/metricas';
import Navbar from './components/Navbar/Navbar';
import Payment from './components/Payment-Gateway/payment';
import Sponsor from './components/Sponsor/sponsor';
import Sponsors from './components/Sponsors/sponsors';
import Timer from './components/timer/Timer';

function App() {
  return (
    <>
    <Navbar />
    <Hero />
    <Metrics />
    <Calendar />
    <Timer />
    <Payment />
    <Sponsor/>
    <Sponsors />
    <Contact/>
    <Chatbot/>
    </>
  );
}

export default App
