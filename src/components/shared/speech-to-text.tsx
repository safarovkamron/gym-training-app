import { Mic, MicOff } from 'lucide-react'
import React, { useState } from 'react'

const SpeechToText = ({
	refInput,
}: {
	refInput: React.RefObject<HTMLInputElement>
}) => {
	const [isListening, setIsListening] = useState<boolean>(false)

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition
	let recognition: SpeechRecognition | undefined

	if (SpeechRecognition) {
		recognition = new SpeechRecognition()
		recognition.lang = 'en-US'
		recognition.continuous = false
		recognition.interimResults = false
	} else {
		console.warn('Ваш браузер не поддерживает Speech Recognition API.')
	}

	const startListening = () => {
		if (!recognition) return

		setIsListening(true)
		recognition.start()
	}

	const stopListening = () => {
		if (!recognition) return

		setIsListening(false)
		recognition.stop()
	}

	if (recognition) {
		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const speechText = event.results[0][0].transcript
			if (refInput.current) {
				refInput.current.value = speechText
			}
			setIsListening(false)
		}

		recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
			console.error('Speech recognition error', event.error)
			setIsListening(false)
		}
	}

	return (
		<div>
			<div onClick={isListening ? stopListening : startListening}>
				{isListening ? (
					<Mic className='text-green-600 animate-pulse' />
				) : (
					<MicOff className='text-red-600 animate-pulse' />
				)}
			</div>
		</div>
	)
}

export default SpeechToText
