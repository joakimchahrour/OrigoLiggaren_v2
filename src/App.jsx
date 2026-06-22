import { useState, useRef } from 'react';
import './App.css';

function ObsBox() {
  return (
    <div className='obs-box'>
      <h2>OBS</h2>
      <p>This is a test of a new system. If something happens we still need your information. So please, for legal reasons, fill in the physical book as well. Thank you!</p>
    </div>
  );
}

function WorkerForm() {
  const [name, setName] = useState("");
  const [umuId, setUMUId] = useState("");
  const [barlag, setBarlag] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('sv-SE');
  });
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("02:00");
  const calculateDuration = () => {
    const [startHours, startMin] = startTime.split(':').map(Number);
    const [endHours, endMin] = endTime.split(':').map(Number);

    const startTotalMin = startHours * 60 + startMin;
    const endTotalMin = endHours * 60 + endMin;

    let durationMin = endTotalMin - startTotalMin;

    if (durationMin < 0) {
      durationMin += 24 * 60; 
    }

    const hours = Math.floor(durationMin / 60);
    const min = durationMin % 60;

    return `${hours} h ${min} min`;
  };

  return (
    <div className='form-box'>
      <div className="form-group">
        <label>Name: </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Namn Namnsson'
        />
      </div>

      <div className='form-group'>
        <label>UMU-ID: </label>
        <input
          type='text'
          value={umuId}
          onChange={(e) => setUMUId(e.target.value)}
          placeholder='abcd0001'
        />
      </div>

      <div className='form-group'>
        <label>Barlag: </label>
        <select value={barlag} onChange={(e) => setBarlag(e.target.value)}>
          <option value="initialValue">Select your barlag</option>
          <option value="MHetAB">MHetAB</option>
          <option value="F">Barlag F</option>
          <option value="Kelix">Kelix</option>
          <option value="MegaBH">MegaBH</option>
          <option value="#Fest">#Fest</option>
          <option value="KC">KC</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Start Date: </label>
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>      

      <div className='form-group'>
        <label>Start Time: </label>
        <input
          type='time'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />        
      </div>

      <div className='form-group'>
        <label>End Time: </label>
        <input
          type='time'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <div className='after-form'>
        <h3>You have worked for: {calculateDuration()}</h3>

        <b className='submit-reminder'>Don't forget to submit</b>

        <button type='button'>Submit</button>
      </div>
    </div>
  );
}

function App() {
  const [hasReadWarning, setHasReadWarning] = useState(false);
  const formSectionRef = useRef(null);
  const handleAcceptWarning = () => {
    setHasReadWarning(true);

    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 50)
  };

  return (
    <div className="main-page">

      <section className='welcome-page'>
        <h1>Welcome to Origo Liggaren</h1>
        <p>Hi! I am Origo Liggaren. I have left the physical world and transcended into digital land. Thank you for working at Origo, you keep this place running! Please enter your information for the BGC below.</p>
      </section>

      <section className='obs-section'>
        <ObsBox />
        {!hasReadWarning && (
          <button className='readWarning-button' onClick={handleAcceptWarning}>
            I have read and understood the information. Press to proseed.
          </button>
        )}
      </section>

      {hasReadWarning && (
        <section ref={formSectionRef} className='form-screen'>
          <WorkerForm />
        </section>  
      )}

    </div>
  );
}

export default App;