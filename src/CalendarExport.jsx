import { useState, useMemo } from "react";

/**
 * GoogleCalendar
 * Renders an iframe whose `ctz` parameter is swapped every time
 * the user picks a new time-zone from the dropdown.
 */
export default function GoogleCalendar({
  srcBase =
    "https://calendar.google.com/calendar/embed?height=600&wkst=1&showPrint=0" +
    "&src=M2UxNDA1M2FhODA5MzlmMzAxZWZjMzE3ODk1MzUxZjhlNGFiY2Q3NDdhYmViOTIxZjU2NTM2MmZiNWUwYTU5OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t" +
    "&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23f6bf26&color=%230b8043",
  defaultTz = "America/Chicago",
}) {
  // ① A short list of friendly labels ➜ TZ database IDs
  const zones = {
    "Pacific (US)": "America/Los_Angeles",
    "Mountain (US)": "America/Denver",
    "Central (US)": "America/Chicago",
    "Eastern (US)": "America/New_York",
    "UTC": "UTC",
    "London": "Europe/London",
    "Tokyo": "Asia/Tokyo",
    "Sydney": "Australia/Sydney",
  };

  const [tz, setTz] = useState(defaultTz);

  // ② Build the full iframe URL whenever tz changes
  const iframeSrc = useMemo(() => {
    // If srcBase already contains a ctz= param, strip it first
    const sanitized = srcBase.replace(/([&?])ctz=[^&]*/, "");
    return `${sanitized}&ctz=${encodeURIComponent(tz)}`;
  }, [tz, srcBase]);
  console.log("iframeSrc", iframeSrc);
	return (
    <>
      <label>
        Time zone:&nbsp;
        <select value={tz} onChange={(e) => setTz(e.target.value)}>
          {Object.entries(zones).map(([label, val]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <iframe
        key={tz}          // forces reload when tz changes
        src={iframeSrc}
        style={{ border: "solid 1px #777", width: 800, height: 600 }}
        frameBorder="0"
        scrolling="no"
      />
    </>
  );
}

