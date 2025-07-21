import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import BookReader from './BookReader';

import config from './config';


//To add Tabs Add here
//To Add Custom tabs that are webpage dependent then put in if statement
//You may need more custom logic if you want fancier ordering
const tabs = ['Home']; //, 'About', 'Commonly Asked Questions','Meeting Schedule', 'Contact'];
if (config.about)  tabs.push('About');
// Add fixed items in bulk
tabs.push(
  'Commonly Asked Questions',
  'Meeting Schedule',
  'Contact'
);
if (config.stepsAndTraditions) tabs.push('12 Traditions and Steps');
if (config.support) tabs.push('Support Project');
if (config.books && config.books.length) tabs.push('Literature'); 


const ZoomLinks = ({ links }) => {
  if (!links || links.length === 0) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Zoom Links</h3>
      <ul>
        {links.map((z, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            <strong>{z.label}:</strong>{' '}
            <a href={z.link} target="_blank" rel="noopener noreferrer">
              {z.link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Calendar2 = ({ calendarUrl, zoomLinks }) => {
  return calendarUrl ? (
    <div>
      <iframe
        title="Meeting Schedule"
        src={calendarUrl}
        style={{ border: 0, width: '100%', height: 600 }}
        frameBorder="0"
        scrolling="no"
        loading="lazy"
      />
      {zoomLinks}
    </div>
  ) : (
    <p>No calendar available for this community.</p>
  );
};

//Calendar Div
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


//Literature Div
function Literature({ books }) {
  // pick the book whose `default` === true, else first book
  const [current, setCurrent] = useState(
    books.find(b => b.default) || books[0]
  );

  return (
    <div>
      <p>Select a Literature:</p>

      {books.map((b, i) => (
        <label key={b.file} style={{display:"block",marginBottom:4}}>
          <input
            type="radio"
            name="book"
            checked={current.file === b.file}
            onChange={() => setCurrent(b)}
          />
          {b.label}
        </label>
      ))}

      <div style={{marginTop:20}}>
        <BookReader file={`/${current.file}`} />
      </div>
    </div>
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
      case '12 Traditions and Steps': return <div dangerouslySetInnerHTML={{ __html: config.stepsAndTraditions  || 'Not found.' }} />;
      case 'Commonly Asked Questions': return <div dangerouslySetInnerHTML={{ __html:  config.commonQuestions || 'Not found.' }} />; 
      case 'Meeting Schedule':
  return (
    <Calendar2
      calendarUrl={config.googleIframe}
      zoomLinks={<ZoomLinks links={config.zoom} />}
    />
  );
	    case 'Literature': return <Literature books={config.books} />; // return <BookReader file={`/${config.bookFile}`} />;
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
