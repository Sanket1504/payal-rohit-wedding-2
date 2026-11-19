import React, { useEffect, useMemo, useRef, useState } from "react";

const WEDDING_DATE = new Date("2026-12-10T12:30:00+05:30");
const VENUE = "Agatya Agrotourism | Water Park | Agro Resort, Shirdi";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(VENUE);

function getCountdown() {
  const now = Date.now();
  const diff = Math.max(0, WEDDING_DATE.getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

function FloralDivider() {
  return <div className="divider" aria-hidden="true"><span>✧ ❀ ✧</span></div>;
}

function App() {
  const audioRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateLabel = useMemo(() => new Intl.DateTimeFormat("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  }).format(WEDDING_DATE), []);

  async function openInvitation() {
    setOpened(true);
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch (error) {
      // Some browsers or missing audio files can prevent playback.
      setPlaying(false);
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        alert("Add your MP3 file at public/audio/wedding-song.mp3, then reload the website.");
      }
    }
  }


  return (
    <main>
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop preload="none" />

      {!opened && (
        <section className="opening-screen">
          <div className="opening-arch">
            <div className="top-flower">❀</div>
            <p className="eyebrow">A SMALL CEREMONY, A BIG MOMENT.</p>
            <p className="eyebrow">JOIN US.</p>
            <h1>Payal <span>&</span> Rohit</h1>
            <p className="opening-date">10 · 12 · 2026</p>
            <button className="open-button" onClick={openInvitation}>Tap to open invitation <span>✧</span></button>
            <p className="tiny-note">Please turn on your sound</p>
          </div>
          <div className="corner-peacock left">❧</div>
          <div className="corner-peacock right">❧</div>
        </section>
      )}

      <div className={opened ? "invitation visible" : "invitation"}>
        <header className="hero section-shell">
          <div className="hero-ornament">✧</div>
          <p className="eyebrow">A SMALL CEREMONY, A BIG MOMENT. JOIN US.</p>
          <div className="hero-frame">
            <p className="script-name">PAYAL <span>&</span> ROHIT</p>
          </div>
          <p className="hero-date">THURSDAY · 10 DECEMBER 2026</p>
          <p className="peacock-mark">🦚</p>
          <p className="scroll-hint">SCROLL TO EXPLORE <span>↓</span></p>
        </header>

        <section className="section-shell family-section">
          <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
          <h2>Wedding Rituals</h2>
          <div className="family-grid">
            <div className="family-card">
              <p>Mr. & Mrs.</p>
              <strong>Jagannath Sahane<br />Savita Sahane</strong>
              <small>Shirdi, Maharashtra, India</small>
            </div>
            <div className="family-card">
              <p>Mr. & Mrs.</p>
              <strong>Late Krishan Garhwal<br />Rajwanti Garhwal</strong>
              <small>Bhiwani, Haryana, India</small>
            </div>
          </div>
          <p className="invite-copy">Together with our families, we invite you to share in the joy as we begin our forever.</p>
          <div className="couple-names">
            <div><span>BRIDE</span><h3>Payal Sahane</h3></div>
            <b>&</b>
            <div><span>GROOM</span><h3>Rohit Garhwal</h3></div>
          </div>
          <FloralDivider />
        </section>

        <section className="section-shell date-section">
          <p className="eyebrow">FOREVER BEGINS WITH</p>
          <h2>Varmala</h2>
          <p className="date-intro">The celebration will take place on</p>
          <div className="date-display">
            <strong>10</strong>
            <div><span>THURSDAY</span><b>DECEMBER</b><span>2026 · 12:30 PM</span></div>
          </div>
          <div className="countdown">
            <p className="eyebrow">COUNTDOWN TO FOREVER</p>
            <div className="countdown-grid">
              {Object.entries(countdown).map(([unit, value]) => <div key={unit}><strong>{String(value).padStart(2, "0")}</strong><span>{unit}</span></div>)}
            </div>
          </div>
          <div className="calendar">
            <h3>December 2026</h3>
            <div className="calendar-grid">
              {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => <span className="weekday" key={d}>{d}</span>)}
              {Array.from({ length: 31 }, (_, i) => <span className={i + 1 === 10 ? "selected-day" : ""} key={i}>{i + 1}</span>)}
            </div>
          </div>
          <a className="text-link" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Payal%20%26%20Rohit%20Wedding&dates=20261210T070000Z/20261210T110000Z&details=Wedding%20celebration%20of%20Payal%20Sahane%20and%20Rohit%20Garhwal&location=Agatya%20Agrotourism%2C%20Shirdi" target="_blank" rel="noreferrer">＋ Add to Calendar</a>
          <FloralDivider />
        </section>

        <section className="section-shell venue-section">
          <p className="eyebrow">JOIN US TO CELEBRATE</p>
          <h2>Wedding Venue</h2>
          <p className="venue-name">{VENUE}</p>
          <a className="map-card" href={MAP_URL} target="_blank" rel="noreferrer">
            <span className="map-pin">⌖</span>
            <strong>Open venue in Google Maps</strong>
            <small>Tap for directions to Shirdi</small>
          </a>
          <a className="directions-link" href={MAP_URL} target="_blank" rel="noreferrer">↗ Get directions</a>
          <FloralDivider />
        </section>

        <section className="section-shell timeline-section">
          <p className="eyebrow">A DAY TO REMEMBER</p>
          <h2>A Timeless Celebration</h2>
          <div className="timeline">
            {[
              ["11:30", "Welcome", "✿"],
              ["23:45", "Welcome Drink", "❀"],
              ["12:30", "Varmala", "❧"],
              ["13:00", "Main Course", "✧"],
              ["15:00", "Farewell", "❀"]
            ].map(([time, event, icon]) => <div className="timeline-row" key={event}><span className="timeline-icon">{icon}</span><time>{time}</time><i></i><strong>{event}</strong></div>)}
          </div>
          <p className="timeline-note">We look forward to celebrating with you.</p>
          <FloralDivider />
        </section>
      </div>

      {opened && <button className="music-toggle" onClick={toggleMusic} aria-label={playing ? "Pause background music" : "Play background music"}>{playing ? "Ⅱ" : "♫"}<span>{playing ? "Music on" : "Play music"}</span></button>}
    </main>
  );
}

export default App;