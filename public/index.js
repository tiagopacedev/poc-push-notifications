async function run() {
  const registration = await navigator.serviceWorker.register('serviceworker.js', { scope: './' })

  const button = document.getElementById('subscribe')
  button.addEventListener('click', async () => {
    const result = await window.Notification.requestPermission()
    if (result === 'granted') {
      await registration.showNotification('Hello World', { body: 'This is a Push Notification' })
    }
  })
}

run()
