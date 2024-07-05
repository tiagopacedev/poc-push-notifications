async function run() {
  // A service worker must be registered in order to send notifications on iOS
  const registration = await navigator.serviceWorker.register('serviceworker.js', {
    scope: './',
  })

  const button = document.getElementById('subscribe')

  const areNotificationsGranted = window.Notification.permission === 'granted'
  if (areNotificationsGranted) {
    button.innerText = 'Send Notification'

    button.addEventListener('click', async () => {
      await fetch('/send-notification')
    })
  } else {
    button.addEventListener('click', async () => {
      // Triggers popup to request access to send notifications
      const result = await window.Notification.requestPermission()

      // If the user rejects the permission result will be "denied"
      if (result === 'granted') {
        const subscription = await registration.pushManager.subscribe({
          // TODO: Replace with your public vapid key
          applicationServerKey:
            'BC2QIe7mlYZJ_KpEhMH0P2baDdM7otMXNUGfHdu53KAni7OERc65VhLesgTTUsR5ME2caJJs5CQxZ4E_c6wYFaA',
          userVisibleOnly: true,
        })

        await fetch('/save-subscription', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        })

        window.location.reload()
      }
    })
  }
}

run()
