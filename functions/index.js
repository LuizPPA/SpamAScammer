const functions = require('firebase-functions')
const firebase = require('firebase')
const nodemailer = require('nodemailer')

exports.spam_scammer = functions.https.onRequest((request, response) => {
	// Setting response headers
	response.set('Access-Control-Allow-Origin', '*')
	response.set('Access-Control-Allow-Methods', 'GET')
	response.set('Access-Control-Allow-Headers', 'content-type')

	// Allowing preflight requests
	if (request.method === 'OPTIONS') {
		response.status(200).send('OK')
		return
	}

	// Initialize firebase SDK
	let firebase_config = {
		apiKey: 'your_api_key',
		authDomain: 'your_auth_domain',
		databaseURL: 'your_database_url'
	}
	try{
		firebase.initializeApp(firebase_config)
	}
	catch(error){
		firebase.app()
	}
	const database = firebase.database()

	let data = database.ref('data')
	data.on('value', snapshot => {
		let values = snapshot.val()
		let scammers = values.scammers.map(scammer => {
			return scammer.email
		})
		let sender = values.senders[Math.floor(Math.random()*values.senders.length)]
		let message = values.messages[Math.floor(Math.random()*values.messages.length)]
		let email = {
			replyTo: 'scammersupport@fuck.u.com', // Address displayed at the "Reply To" field
			to: scammers, // Destination addresses
			subject: message.subject, // Message subject
			text: message.text, // Message body as plain text
			html: '<p>'+message.text+'</p>' // Message body as html
		}
		let smtpConfig = sender
		let transporter = nodemailer.createTransport(smtpConfig)
		transporter.sendMail(email)
		return response.status(200).send('Ok')
	})
})
