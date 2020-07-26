
const form = document.querySelector('form')

const resBox = document.querySelector('#result')

const formEventHandler = async (event) => {
  event.preventDefault()

  const ip = document.querySelector('#ip').value
  console.log(ip)

  const res = await fetch('/cmd', {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ ip })
  })

  const resText = await res.json()

  const brdText = resText.text.split('\n')
  console.log(brdText)

  for (let i = 0; i < brdText.length; i++) {
    const resNode = document.createTextNode(brdText[i])
    resBox.append(resNode)
    resBox.append(document.createElement('br'))
  }

  console.log(resText.text)
}

form.addEventListener('submit', formEventHandler)
