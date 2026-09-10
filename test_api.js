import fetch from 'node-fetch';

async function test() {
  console.log("Testing API endpoint...");
  const res = await fetch('http://localhost:5173/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      characterContext: "Name: Batman. He is a vigilante.",
      question: "Are you Bruce Wayne?"
    })
  });
  
  if (!res.ok) {
    console.log("API returned error status:", res.status);
    const text = await res.text();
    console.log(text);
    return;
  }
  
  const data = await res.json();
  console.log("API returned data:", data);
}

test();
