import './App.css'
import Calendar from './components/Calendar/Calendar';
import Chatbot from './components/Chatbot/Chatbot';
import Hero from './components/hero/Hero';
import Metrics from './components/Metrics/metricas';
import Navbar from './components/navbar/navbar';
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
    <Chatbot/>
    </>
  );
}

export default App
