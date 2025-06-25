"use client";

import NextLink from "next/link";
import { Button } from "~/components/Ui/Button";
import { CopyEmailSmallButton } from "~/components/CopyEmailSmallButton";
import ScrollToTopButton from "~/components/ScrollToTopButton/ScrollToTopButton";
import { useTranslations } from 'next-intl';
import Chatbot from "~/components/ChatBot/ChatBot";
import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
	const t = useTranslations("HeroSection");

	const positions = [
		t("position"),
		t("position2"),
		t("position3"),
		t("position4"),
		t("position5"),
	];

	const minecraftSubtitles = [
		"100/100 Web Vitals!",
		"Now with more divs!",
		"Runs on 1 FPS on IE!",
		"Made with too much coffee!",
		"Best viewed on a fridge!",
		"Unironically Typescript!",
		"npm install braincells!",
		"Light mode users reported!",
		"Free cookies, zero tracking!",
		"Hot reloading since 2023!",
		"Now with 37 fonts!",
		"Shipped it at 3AM!",
		"Built while crying!",
		"No bugs, just features!",
		"Google said it slaps!",
		"Optimized with vibes!",
		"No frameworks were harmed!",
		"Deploy first, debug later!",
		"Pixel perfect-ish!",
		"Better than the clones!",
		"Dark mode supremacy!",
		"SEO gods are pleased!",
		"Certified dev candy!",
		"404 bugs found!",
		"Breaks on Fridays!",
	];

	const [minecraftSubtitle, setMinecraftSubtitle] = useState("");
	const [positionIndex, setPositionIndex] = useState(0);

	// Refs for GSAP animations
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const arrowRef = useRef(null);
	const languageRef = useRef(null);
	const introRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const actionsRef = useRef(null);
	const copyEmailButtonRef = useRef(null);
	const arrowwaveRef = useRef(null);
	const scrollToTopButtonRef = useRef(null);
	const minecraftSubtitleRef = useRef(null);

	useEffect(() => {
		setMinecraftSubtitle(
			minecraftSubtitles[Math.floor(Math.random() * minecraftSubtitles.length)]
		);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setPositionIndex((prev) => (prev + 1) % positions.length);
		}, 6000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!minecraftSubtitle) return;

		const tl = gsap.timeline();

		tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 })
			.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
			.fromTo(minecraftSubtitleRef.current, { y: -100, scale: 0.6, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5 }, "-=0.6")
			.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4");
	}, [minecraftSubtitle]);

	return (
		<section className={styles.section} ref={sectionRef}>
			<h1 className={`text-gradient ${styles.title}`} ref={titleRef}>David Rojas</h1>
			<p className={styles.minecraftsubtitle} ref={minecraftSubtitleRef}>
				{minecraftSubtitle}
			</p>
			<h2 className={styles.subtitle} ref={subtitleRef}>
				{positions[positionIndex]}
			</h2>

			{/* Resto del contenido sin cambios */}
			<p className={styles.language} ref={languageRef}>{t("language")}</p>

			<div className={styles.intro} ref={introRef}>
				<p className={styles.introSubtitle}>
					{t.rich("subtitle", { em: (children) => <strong>{children}</strong> })}
				</p>
				<p className={styles.introSubtitle}>
					<a href="https://www.google.com/maps/place/Bogota" target="_blank" rel="noopener noreferrer" className={styles.link}>
						{t("location")}
					</a>
				</p>
			</div>

			<div className={styles.buttonContainer} ref={buttonContainerRef}>
				<Button rounded="full" size="small" asChild className={styles.button}>
					<NextLink href="https://www.linkedin.com/in/dsrojaslop/" target="_blank" rel="noopener">
						<span className={styles.availableCircle}></span>
						{t("availability")}
					</NextLink>
				</Button>
			</div>

			<div className={styles.actions} ref={actionsRef}>
				<NextLink href="https://drive.google.com/file/d/1hhMxGBShz7eUqXt_GvEu8W75KByVa4e1/view?usp=sharing" target="_blank" prefetch={true} passHref>
					<Button className={styles.actionBtn} variant="outlined">
						Descargar
					</Button>
				</NextLink>
			</div>

			<CopyEmailSmallButton className={styles.copyEmailButton} />
			<Chatbot />
			<div className={styles.arrowwave} ref={arrowwaveRef}><span></span><span></span><span></span></div>
			<ScrollToTopButton />
		</section>
	);
};
