const images = ['icon'];
//const imgElem = document.querySelector('img');

function randomValueFromArray(array) {
  let randomNo =  Math.floor(Math.random() * array.length);
  return array[randomNo];
}

/*setInterval(function() {
  let randomChoice = randomValueFromArray(images);
  imgElem.src = './img/'+'icon'+ '.jpg';
}, 2000)
*/

// Register service worker to control making site work offline

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our RU  button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the RU prompt');
        } else {
          console.log('User dismissed the RU prompt');
        }
        deferredPrompt = null;
      });
  });
});
