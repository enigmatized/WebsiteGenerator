import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import BookReader from './BookReader';

import config from './config';



//TODO Add how it works to Commonly asked questions
const tabs = ['Home', 'About', 'Contact','Commonly Asked Questions','Meeting Schedule'];
if (config.support) {
  tabs.push('Support Project');
}
if (config.bookFile) {
  tabs.push('Book');
}




const Calendar = () => (
  <iframe
    title="Meeting Schedule"
    src="https://calendar.google.com/calendar/embed?src=drop.all.addictions.fellowship%40gmail.com&ctz=America%2FLos_Angeles"
    style={{ border: 0, width: '100%', height: 600 }}
    frameBorder="0"
    scrolling="no"
    loading="lazy"
  />
);



function App() {
 const [activeTab, setActiveTab] = useState('Home');

const getTabContent = (tab) => {
    switch (tab) {
      //case 'Home': return config.home;
      case 'Home': return <div dangerouslySetInnerHTML={{ __html: config.home  || 'Not found.' }} />;

      case 'About': return config.about;
      case 'How It Works' : return  config.howitworks;
      case 'Contact': return <div dangerouslySetInnerHTML={{ __html: config.contact  || 'Not found.' }} />;
      case 'Commonly Asked Questions': return <div dangerouslySetInnerHTML={{ __html:  config.commonQuestions || 'Not found.' }} />; 
      case 'Meeting Schedule':return <Calendar />; 
		    //case 'Meeting Schedule': return config.meetingSchedule;
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
