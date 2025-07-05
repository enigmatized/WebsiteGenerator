import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import BookReader from './BookReader';

import config from './config';



//TODO Add how it works to Commonly asked questions
const tabs = ['Home', 'About', 'Commonly Asked Questions','Meeting Schedule', 'Contact'];
if (config.support) {
  tabs.push('Support Project');
}
if (config.bookFile) {
  tabs.push('Book');
}


const Calendar = ({ calendarUrl }) => {
  return calendarUrl ? (
    <div> <iframe
      title="Meeting Schedule"
      src={calendarUrl}
      style={{ border: 0, width: '100%', height: 600 }}
      frameBorder="0"
      scrolling="no"
      loading="lazy"
    /> <p><a href="https://us06web.zoom.us/j/5620489534"> Zoom Link For All the Meetings: https://us06web.zoom.us/j/5620489534  </a> </p> </div>
  ) : (
    <p>No calendar available for this community.</p>
  );
};






function App() {
 const [activeTab, setActiveTab] = useState('Home');

const getTabContent = (tab) => {
    switch (tab) {
      //case 'Home': return config.home;
      case 'Home': return <div dangerouslySetInnerHTML={{ __html: config.home  || 'Not found.' }} />;

      case 'About': return <div dangerouslySetInnerHTML={{ __html: config.about  || 'Not found.' }} />;
      case 'How It Works' : return  config.howitworks;
      case 'Contact': return <div dangerouslySetInnerHTML={{ __html: config.contact  || 'Not found.' }} />;
      case 'Commonly Asked Questions': return <div dangerouslySetInnerHTML={{ __html:  config.commonQuestions || 'Not found.' }} />; 
      case 'Meeting Schedule': return <Calendar calendarUrl={ config.googleIframe } />; 
      case 'Book': return <BookReader file={`/${config.bookFile}`} />;
      case 'Support Project': return <div dangerouslySetInnerHTML={{ __html: config.support  || 'Not found.' }} />;

      default: return 'Page not found.';
    }
  };


  return (
      <div>
<nav style={{ display: 'flex', gap: 20, padding: 10, borderBottom: '1px solid #ccc' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </nav>


<div style={{ padding: 20 }}>
      <div>{getTabContent(activeTab)}</div>
	  </div>
      </div>
  )
}

export default App
