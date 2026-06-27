import { useState, useRef, useEffect } from 'react';
import './App_v2.css';

function ObsBox() {
  return (
    <div className='obs-box'>
      <h1>OBS</h1>
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

function LiveWallpaper() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4
      });
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className='live-wallpaper' />;
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
      <LiveWallpaper />

      <section className='welcome-section'>
        <h1>Welcome to Origo Liggaren</h1>
        <p>Hi! I am Origo Liggaren. I have left the physical world and transcended into digital land. Thank you for working at Origo, you keep this place running! Please enter your information for the BGC below.</p>

        <div className='scroll-arrow'>⬇</div>   
      </section>

      <section className='obs-section'>
        <ObsBox />
        {!hasReadWarning && (
          <button className='readWarning-button' onClick={handleAcceptWarning}>
            I have read and understood the information. Press to proseed.
          </button>
        )}

        {hasReadWarning && <div className='scroll-arrow'>⬇</div>}
      </section>

      {hasReadWarning && (
        <section ref={formSectionRef} className='form-section'>
          <WorkerForm />
        </section>  
      )}

    </div>
  );
}

export default App;