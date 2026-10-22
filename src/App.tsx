import Metrics from './assets/components/Metrics/metricas';
import Payment from './assets/components/Payment-Gateway/payment';
import Sponsors from './assets/components/Sponsors/sponsors';
import './App.css'
import Sponsor from './assets/components/Sponsor/sponsor';
import Agenda from './assets/components/Calendar/Calendar';

function App() {
  return (
    <>
    <Metrics />
    <Agenda/>
    <Payment />
    <Sponsor/>
    <Sponsors />
    </>
  );
}

export default App
