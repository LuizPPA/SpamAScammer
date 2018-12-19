var interval
var counter = 1

let request_spam = () => {
  counter++
  if(counter <= 999) document.getElementById('counter').innerText = counter
  else document.getElementById('counter').innerText = '999+'
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(counter+' sent')
    }
  }
  xhttp.open("GET", "https://us-central1-spam-a-scammer.cloudfunctions.net/spam_scammer", true)
  xhttp.send()
}

window.onload = () => {
  interval = setInterval(request_spam, 1000)
}

window.onunload = () => {
  clearInterval(interval)
}
