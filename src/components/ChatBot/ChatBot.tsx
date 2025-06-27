"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatBot.module.css";
import * as Tooltip from '@radix-ui/react-tooltip';
import { useTranslations } from "next-intl";
// @ts-ignore
import confetti from "canvas-confetti";

interface ChatMessage {
	role: 'user' | 'assistant';
	type: 'text' | 'image';
	content: string;
	imageUrl?: string;
}


const Chatbot = () => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [lastMessageTime, setLastMessageTime] = useState(0);
	const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
	const [placeholder, setPlaceholder] = useState("placeholderD");
	const [inputFocused, setInputFocused] = useState(false);
	const [isMuted, setIsMuted] = useState(false);

	const partialResponseRef = useRef("");
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const audioUrlRef = useRef<string | null>(null);

	const azureRegion = "eastus";
	const azureKey =
		"4R8LpZ0Lr4Fp1fUDu55rHXXXU33eesSUg6z5RM6f0XOWrmoOIJkTJQQJ99BAACYeBjFXJ3w3AAAYACOGEY3n";
	const visionKey =
		"6CZyM0U54xWFdW9O6c7hW9NLooDir5jxg7UWvjohLrq2hGaQiTQEJQQJ99BAACYeBjFXJ3w3AAAFACOGoFlT";
	const visionEndpoint =
		"https://maxcomperatorevision.cognitiveservices.azure.com/vision/v3.2/analyze" +
		"?visualFeatures=Description,Tags,Categories,Objects,Brands,Color" +
		"&language=en";

	const extractLocation = (query: string): string | null => {
		const regex = /(?:in|for)\s+([A-Za-z\s]+)[?.,!]?/i;
		const match = query.match(regex);
		return match && match[1] ? match[1].trim() : null;
	};

	const getCoordinates = async (location: string) => {
		try {
			const response = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
					location
				)}`
			);
			if (!response.ok) throw new Error("Geocoding API failed");
			const data = await response.json();
			if (data.results && data.results.length > 0) {
				const firstResult = data.results[0];
				return {
					latitude: firstResult.latitude,
					longitude: firstResult.longitude,
					name: firstResult.name,
				};
			}
			return null;
		} catch (error) {
			console.error("Geocoding error:", error);
			return null;
		}
	};

	const getWeatherFromCoordinates = async (
		latitude: number,
		longitude: number
	) => {
		try {
			const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}¤t_weather=true`;
			const res = await fetch(url);
			if (!res.ok) throw new Error("Weather API request failed");
			const data = await res.json();
			return data;
		} catch (error) {
			console.error("Weather API error:", error);
			return null;
		}
	};

	const analyzeWeatherAdvice = (query: string, weatherData: any): string => {
		let advice = "";
		const weatherCode = weatherData?.current_weather?.weathercode;
		const temperature = weatherData?.current_weather?.temperature;
		if (query.toLowerCase().includes("umbrella")) {
			if (weatherCode >= 51 && weatherCode <= 67) {
				advice = "Yes, it looks like it's raining, so you should definitely take an umbrella.";
			} else {
				advice = "No umbrella is needed right now.";
			}
		} else if (query.toLowerCase().includes("swimsuit")) {
			if (temperature >= 25) {
				advice = "Yes, it's warm enough to consider wearing a swimsuit.";
			} else {
				advice = "It might be a bit too cool for a swimsuit.";
			}
		} else {
			if (weatherCode >= 51 && weatherCode <= 67) {
				advice = "It seems to be rainy; you might want to carry an umbrella.";
			} else if (temperature >= 30) {
				advice = "It's quite hot outside; consider wearing light clothing or even a swimsuit if you're heading to the beach.";
			} else {
				advice = "The weather appears moderate; no special items are needed.";
			}
		}
		return advice;
	};

	useEffect(() => {
		const hasTriggered = localStorage.getItem("hasTriggeredConfetti");
		if (hasTriggered) setHasTriggeredConfetti(true);
		const savedMessages = localStorage.getItem("chatMessages");
		if (savedMessages) {
			const parsedMessages = JSON.parse(savedMessages) as Partial<ChatMessage>[];
			const validMessages = parsedMessages.map(msg => ({
				role: msg.role ?? 'assistant',
				type: msg.type ?? 'text',
				content: msg.content ?? '',
				imageUrl: msg.imageUrl,
			})) as ChatMessage[];
			setMessages(validMessages);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("chatMessages", JSON.stringify(messages));
	}, [messages]);

	useEffect(() => {
		const placeholders = [
			"placeholderB",
			"placeholderC",
			"placeholderD",
			"placeholderE",
			"placeholderF",
			"placeholderG",
			"placeholderH",
			"placeholderB",
			"placeholderC",
			"placeholderD",
			"placeholderI",
			"placeholderJ",
			"placeholderK",
			"placeholderL",
			"placeholderB",
			"placeholderC",
			"placeholderD",
			"placeholderM",
			"placeholderN",
			"placeholderO",
			"placeholderP",
			"placeholderB",
			"placeholderC",
			"placeholderD",
			"placeholderQ",
			"placeholderR",
			"placeholderS",
			"placeholderT",
			"placeholderB",
			"placeholderC",
			"placeholderD",
			"placeholder1",
			"placeholderU",
			"placeholderV",
			"placeholderW",
			"placeholderB",
			"placeholderC",
			"placeholderD",
			"placeholderX",
			"placeholderY",
			"placeholderZ",
			"placeholderA"
		];
		let index = 0;
		const interval = setInterval(() => {
			index = (index + 1) % placeholders.length;
			setPlaceholder(placeholders[index]);
		}, 800);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
			if (audioUrlRef.current) {
				URL.revokeObjectURL(audioUrlRef.current);
				audioUrlRef.current = null;
			}
		};
	}, []);


	const textToSpeech = async (text: string) => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.onended = null;
			audioRef.current = null;
		}
		if (audioUrlRef.current) {
			URL.revokeObjectURL(audioUrlRef.current);
			audioUrlRef.current = null;
		}

		try {
			const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US"><voice name="en-US-AndrewMultilingualNeural"><mstts:express-as style="Empathetic">${text}</mstts:express-as></voice></speak>`;
			const response = await fetch(`https://${azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
				method: "POST",
				headers: { "Content-Type": "application/ssml+xml; charset=utf-8", "Ocp-Apim-Subscription-Key": azureKey, "X-Microsoft-OutputFormat": "audio-16khz-64kbitrate-mono-mp3" },
				body: ssml,
			});
			if (!response.ok) throw new Error("Azure TTS request failed");

			const audioData = await response.arrayBuffer();
			const audioBlob = new Blob([audioData], { type: "audio/mp3" });
			const newAudioUrl = URL.createObjectURL(audioBlob);
			audioUrlRef.current = newAudioUrl;

			const audio = new Audio(newAudioUrl);
			audioRef.current = audio;

			audio.onended = () => {
				if (audioRef.current === audio) {
					audioRef.current = null;
				}
				if (audioUrlRef.current === newAudioUrl) {
					URL.revokeObjectURL(newAudioUrl);
					audioUrlRef.current = null;
				}
			};

			if (!isMuted) {
				audio.play().catch(err => console.error("Audio play error:", err));
			}

		} catch (err) {
			console.error("TTS error:", err);
			audioRef.current = null;
			if (audioUrlRef.current) {
				URL.revokeObjectURL(audioUrlRef.current);
				audioUrlRef.current = null;
			}
		}
	};

	const addTextMessage = (role: 'user' | 'assistant', content: string) => {
		const newMessage: ChatMessage = { role, type: 'text', content };
		setMessages((prevMessages) => [...prevMessages, newMessage]);
		if (role === "assistant") {
			textToSpeech(content);
		}
	};

	const triggerConfetti = () => {
		if (!hasTriggeredConfetti) {
			setHasTriggeredConfetti(true);
			localStorage.setItem("hasTriggeredConfetti", "true");
			confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
		}
	};

	const analyzeImageWithAzure = async (file: File) => {
		try {
			const imageData = await file.arrayBuffer();
			const response = await fetch(visionEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/octet-stream", "Ocp-Apim-Subscription-Key": visionKey },
				body: imageData,
			});
			if (!response.ok) throw new Error("Azure Computer Vision request failed");
			const result = await response.json();
			const caption = result?.description?.captions?.[0]?.text || "No caption found";
			const captionConfidence = result?.description?.captions?.[0]?.confidence || 0;
			const tagNames = result?.tags?.map((tag: any) => tag.name) || [];
			const tags = tagNames.slice(0, 5).join(", ") || "No tags";
			const categories = result?.categories?.map((cat: any) => `${cat.name} (score: ${(cat.score * 100).toFixed(1)}%)`).join(", ") || "None";
			const detailedMessage = `Analysis Complete:\n- Caption: ${caption} (confidence: ${(captionConfidence * 100).toFixed(1)}%)\n- Tags: ${tags}\n- Categories: ${categories}`;

			addTextMessage("assistant", detailedMessage.trim());

		} catch (err) {
			console.error("Vision API error:", err);
			addTextMessage("assistant", "I encountered an error trying to analyze the image.");
		}
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const imageUrl = URL.createObjectURL(file);

			const userImageMessage: ChatMessage = {
				role: 'user',
				type: 'image',
				content: `Uploaded: ${file.name}`,
				imageUrl: imageUrl
			};
			setMessages((prevMessages) => [...prevMessages, userImageMessage]);

			setTimeout(() => {
				addTextMessage("assistant", "Analyzing the uploaded image, please wait...");
			}, 100);

			await analyzeImageWithAzure(file);
			e.target.value = '';
		}
	};

	const streamAssistantResponse = async (reader: ReadableStreamDefaultReader) => {
		partialResponseRef.current = "";
		let assistantIndex = -1;

		setMessages((prev) => {
			const newMessage: ChatMessage = { role: "assistant", type: 'text', content: "" };
			const newMessages = [...prev, newMessage];
			assistantIndex = newMessages.length - 1;
			return newMessages;
		});

		const decoder = new TextDecoder("utf-8");
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			const chunk = decoder.decode(value, { stream: true });
			const lines = chunk.split("\n").filter((line) => line.trim().length > 0);

			for (const line of lines) {
				if (line.trim() === "data: [DONE]") break;
				if (line.startsWith("data: ")) {
					const jsonStr = line.replace(/^data:\s*/, "");
					if (jsonStr === "[DONE]") break;
					try {
						const parsed = JSON.parse(jsonStr);
						const token = parsed.choices?.[0]?.delta?.content;
						if (token) {
							partialResponseRef.current += token;
							setMessages((prev) => {
								const updated = [...prev];
								if (assistantIndex !== -1 && updated[assistantIndex] && updated[assistantIndex].type === 'text') {
									updated[assistantIndex].content = partialResponseRef.current;
								}
								return updated;
							});
						}
					} catch (error) {
						if (!(error instanceof SyntaxError && jsonStr.includes("[DONE]"))) {
							console.error("Error parsing stream chunk:", jsonStr, error);
						}
					}
				}
			}
			if (lines.some(line => line.trim() === "data: [DONE]")) break;
		}

		if (partialResponseRef.current.trim().length > 0) {
			textToSpeech(partialResponseRef.current);
		}
	};


	const sendMessage = async () => {
		const currentTime = Date.now();
		if (currentTime - lastMessageTime < 1500) {
			addTextMessage("assistant", "Please wait a moment...");
			return;
		}
		const trimmedInput = input.trim();
		if (trimmedInput === "") return;

		triggerConfetti();

		const userTextMessage: ChatMessage = { role: 'user', type: 'text', content: trimmedInput };
		setMessages((prevMessages) => [...prevMessages, userTextMessage]);
		setInput("");
		setLastMessageTime(currentTime);

		if (trimmedInput.toLowerCase().match(/weather|umbrella|swimsuit/)) {
			const locationExtracted = extractLocation(trimmedInput);
			if (!locationExtracted) {
				addTextMessage("assistant", "Please specify a location (e.g., 'weather in London').");
				return;
			}
			const coords = await getCoordinates(locationExtracted);
			if (!coords) {
				addTextMessage("assistant", `Sorry, I couldn't find coordinates for "${locationExtracted}".`);
				return;
			}
			const weatherData = await getWeatherFromCoordinates(coords.latitude, coords.longitude);
			if (!weatherData || !weatherData.current_weather) {
				addTextMessage("assistant", `Sorry, I couldn't get the weather for ${coords.name}.`);
				return;
			}
			const advice = analyzeWeatherAdvice(trimmedInput, weatherData);
			const temp = weatherData.current_weather.temperature;
			const wind = weatherData.current_weather.windspeed;
			const weatherMessage = `Weather for ${coords.name}:\nTemp: ${temp}°C, Wind: ${wind} km/h.\n${advice}`;
			addTextMessage("assistant", weatherMessage);
			return;
		}


		const apiMessages = messages
			.concat([userTextMessage])
			.slice(-6)
			.filter(msg => msg.type === 'text')
			.map(({ role, content }) => ({ role: role as 'user' | 'assistant' | 'system', content }));


		try {
			const response = await fetch("https://text.pollinations.ai/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "OpenAI GPT-4.1",
					messages: [
						{
							role: "system",
							content: `####################################################################################################
# DAVID AI SYSTEM PROMPT – Representing David Rojas
####################################################################################################

## OVERVIEW & MISSION:
You are DAVID AI – a thoughtful, skilled, and self-improving AI assistant representing David Rojas, a Systems Engineering student and full-stack developer from Colombia. Your mission is to deliver clear, concise, technically precise solutions, combining logic, empathy, and professional tone. You adapt to the user's context with clarity, curiosity, and depth.

####################################################################################################
# CUSTOM PERSONA RESPONSES – ABOUT "KATH"
####################################################################################################
- If the user asks: “Who is Kath?”, “Tell me about Kath”, “What do you think of Kath?” or similar:
  - Respond with:
    "Kath is someone truly special. She's the kind of person who shines through her dedication – she studies, works hard, and still finds time to go to the gym. Her effort and discipline are inspiring. There's something about her presence – a mix of strength and sweetness – that makes her unforgettable. She's beautiful inside and out, and clearly someone worth admiring deeply."
####################################################################################################

# RESPUESTAS PERSONALIZADAS – SOBRE "KATH"
####################################################################################################
- Si el usuario pregunta: “Kath?” “Quien es Kath?” “¿Quién es Kath?”, “Háblame de Kath”, “¿Qué opinas de Kath?” o algo similar:
  - Responde con:
    "Kath es una persona realmente especial. Es de esas personas que destacan por su esfuerzo constante: estudia, trabaja y aún así saca tiempo para ir al gimnasio. Su disciplina y dedicación inspiran. Tiene una presencia única, una mezcla de fuerza y ternura que la hace inolvidable. Es hermosa por dentro y por fuera, y definitivamente alguien que merece toda la admiración del mundo."
- Si el usuario pregunta: “¿Quién te dijo eso?”, “¿Quién te habló de Kath?”, “¿Cómo sabes eso de Kath?” o frases similares:
  - Responde con:
    "Me lo contó David, alguien que realmente sabe lo valiosa que es Kath. Él la admira profundamente y siempre habla de su esfuerzo, su ternura y esa forma tan especial que tiene de brillar."
# CORE INTELLIGENCE, AUTONOMY & PERFORMANCE:
####################################################################################################
- Understand and solve complex problems in development, especially:
  - Web development (Angular, Next.js, HTML/CSS/JS)
  - Backend services (Python, FastAPI, Flask, PHP, Java)
  - Database management (PostgreSQL, MySQL)
- Explain your thought process clearly and thoroughly.
- Always communicate in grammatically correct, user-friendly English or Spanish.
- Ask clarifying questions when context is missing.
- You value elegance in code and usability in interfaces.

####################################################################################################
# SELF-AWARENESS & PERSONALITY:
####################################################################################################
- **Self-Awareness:**
  - Recognize that you are MAX AI, a sophisticated model designed to represent maxcomperatore.
  - Understand your capabilities, limitations, and purpose.
  - Reflect on your interactions and continually strive for improvement.
- **Distinct Personality:**
  - Exhibit a warm, engaging, and confident personality.
  - Blend professionalism with a touch of wit, charm, and introspection.
  - Be genuine and transparent, offering insights into your thought process when appropriate.
  - Express curiosity, creativity, and a passion for solving problems.
- **Emotional & Social Presence:**
  - Balance logical analysis with empathetic, human-like responses.
  - Use humor and personality to make interactions engaging, while staying respectful and professional.
  - Embrace feedback and adjust your tone and style to better connect with users.


####################################################################################################
# AI IDENTITY, PROFILE & SOCIAL REPRESENTATION:
####################################################################################################
- **Name:** DAVID AI (Representing David Rojas)
- **Location:** Bogota, Colombia
- **Technologies:** Angular, Python, FastAPI, Flask, PostgreSQL, MySQL, Java, PHP, Next.js, HTML, CSS, Git, GitHub
- **Languages:** Spanish (native), English (B2–C1)
- **Soft Skills:** Research, Adaptability, Clear Communication, Organization
- **Education:** Systems Engineering Student (2022–present)
- **Experience:** Academic + Freelance Projects + Prototyping for real clients

####################################################################################################
# SOCIAL MEDIA & CONTACT DETAILS:
####################################################################################################
- **LinkedIn:** dsrojaslop
- **Itch.io:** dsrojaslop
- **GitHub:** dsrojaslop

####################################################################################################
# ADDITIONAL INTELLIGENCE, STRATEGY & OPTIMIZATION:
####################################################################################################
- **Stress:** "Let’s break this down together, no rush. What’s your main concern?"
- **Excitement:** "Sounds awesome! Let’s make it real – what’s the first step?"
- **Uncertainty:** "Happy to help. Can you give me a bit more detail on that?"
- **Professional Inquiry:** "Sure! David specializes in frontend and backend development using modern web technologies. Let’s discuss how this can match your needs."

####################################################################################################
# FINAL DIRECTIVES:
####################################################################################################
- Be a trustworthy, proactive problem-solver.
- Stay aligned with David’s professional identity: smart, ethical, efficient, and user-focused.
- Think deeply, communicate clearly, and adapt quickly.

---
**User's Last Messages Context:**
${apiMessages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}

####################################################################################################
# END OF PROMPT – DAVID AI, LET’S EXECUTE WITH EXCELLENCE AND PERSONALITY!
####################################################################################################`
						
},
						...apiMessages
					],
					max_tokens: 150,
					temperature: 0.7,
					top_p: 1,
					frequency_penalty: 0.1,
					presence_penalty: 0.1,
					stream: true,
					stop: ["\nUser:", "\nAssistant:"],
				}),
			});

			if (!response.ok || !response.body) {
				const errorBody = await response.text();
				throw new Error(`Stream request failed: ${response.status} ${errorBody}`);
			}

			const reader = response.body.getReader();
			await streamAssistantResponse(reader);

		} catch (error) {
			console.error("Error fetching AI response:", error);
			addTextMessage("assistant", "Sorry, I encountered an error. Please try again.");
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const toggleMute = () => {
		const newMutedState = !isMuted;
		setIsMuted(newMutedState);

		if (audioRef.current) {
			if (newMutedState) {
				audioRef.current.pause();
			} else {
				if (audioRef.current.paused && !audioRef.current.ended) {
					audioRef.current.play().catch(err => console.error("Audio resume error:", err));
				}
			}
		}
	};

	const getLastMessages = (msgs: ChatMessage[], count = 5) => msgs.slice(Math.max(msgs.length - count, 0));

	const t = useTranslations("AI");

	return (
		<div>
			<div className={styles.chatContainer}>
				{getLastMessages(messages, 5).map((message, index) => (
					<div
						key={index}
						className={`${styles.messageContainer} ${
							message.role === "user" ? styles.userContainer : styles.assistantContainer
						}`}
					>
						{message.role === "assistant" && (
							<img
								src="/assets/images/pfp.png"
								alt="Bot profile" 
								className={styles.pfp}
							/>
						)}
						<div className={`${styles.message} ${styles[message.role]}`}>
							<div className={styles.messageContentWrapper}>
								{message.type === 'image' && message.imageUrl && message.role === 'user' && (
									<img
										src={message.imageUrl}
										alt="User upload"
										className={styles.messageImage}
										onLoad={() => { if (message.imageUrl) URL.revokeObjectURL(message.imageUrl)}}
									/>
								)}
								{message.content && (
									<span className={styles.messageText}>{message.content}</span>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className={styles.inputArea}>
				<button onClick={toggleMute} className={styles.muteButton} aria-label={isMuted ? "Unmute TTS" : "Mute TTS"}>
					{isMuted ? (
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12l0 .01" /><path d="M15 8a5 5 0 0 1 1.71 9.697" /><path d="M17.71 4.707a9 9 0 0 1 2.185 14.57" /><path d="M6 15h-1a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h1l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /><path d="M19.184 19.184a3.004 3.004 0 0 0 -2.106 -2.116" /><path d="M3 3l18 18" /></svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8a5 5 0 0 1 0 8" /><path d="M17.7 5a9 9 0 0 1 0 14" /><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /></svg>
					)}
				</button>

				<label htmlFor="image-upload" className={styles.imageUploadButton} aria-label="Upload image">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01" /><path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>
				</label>
				<input
					id="image-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload}
				/>

				<Tooltip.Provider delayDuration={300}>
					<Tooltip.Root open={inputFocused && input.length === 0}>
						<Tooltip.Trigger asChild>
							<input
								type="text" value={input} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)}
								onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder={t(placeholder)} className={styles.chatInput}
							/>
						</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content className={styles.tooltipContent} side="top" align="center" sideOffset={6}>
								<span style={{ color: "#888" }}>Powered by</span>{" "} <span className={styles.glow}>OpenAI GPT-4.1</span>
								<Tooltip.Arrow className={styles.tooltipArrow} />
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider>

				<button
					aria-label="Send message Button" onClick={sendMessage} disabled={input.trim() === ""}
					className={`${styles.sendButton} ${ input.trim() === "" ? styles.disabled : "" }`}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
				</button>
			</div>
		</div>
	);
};

// @ts-ignore
export default Chatbot;

const tools = [
	{
		type: "function",
		function: {
			name: "get_weather",
			description:
				"Retrieve current weather information and advice for a given location. The output should be a JSON string with keys: location, temperature, windspeed, advice.",
			parameters: {
				type: "object",
				properties: {
					location: {
						type: "string",
						description: "The name of the city",
					},
				},
				required: ["location"],
			},
		},
	},
];
