import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { SvgMasks } from "~/components/Svg/SvgMasks";
import { Header } from "~/components/Header";
import "~/styles/reset.css";
import "~/styles/globals.css";
import "~/styles/utils.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
	metadataBase: new URL("https://dsrojaslop.com"),
	title: "David Rojas / Fullstack Developer (Backend-leaning) – AI, Python, React, FastAPI, Node.js, PostgreSQL / Remote LATAM (Colombia)",
	description:
		"David Rojas is a fullstack developer specialized in artificial intelligence, machine learning, and scalable backend systems. Delivering cutting-edge solutions for startups and enterprises worldwide.",
	authors: [{ name: "David Rojas" }],
	creator: "David Rojas",
	openGraph: {
		type: "website",
		url: "",
		title: "David Rojas / Fullstack Developer (Backend-leaning) – AI, Python, React, FastAPI, Node.js, PostgreSQL / Remote LATAM (Colombia)",
		description:
			"David Rojas is a fullstack developer specialized in artificial intelligence, machine learning, and scalable backend systems. Delivering cutting-edge solutions for startups and enterprises worldwide.",
		images: [
			{
				url: "",
				width: 1200,
				height: 630,
				alt: "David Rojas - AI & Backend Developer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "",
		creator: "",
		title: "David Rojas / Fullstack Developer (Backend-leaning) – AI, Python, React, FastAPI, Node.js, PostgreSQL / Remote LATAM (Colombia)",
		description:
			"David Rojas is a fullstack developer specialized in artificial intelligence, machine learning, and scalable backend systems. Delivering cutting-edge solutions for startups and enterprises worldwide.",
		images: [""],
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const messages = await getMessages();
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "David Rojas",
		jobTitle: "AI & Backend Developer",
		url: "",
		image: "",
		sameAs: [
			"https://www.linkedin.com/in/dsrojaslop/",
			"https://github.com/",
			"https://www.youtube.com/channel/davidsrojaslop",
		],
		worksFor: {
			"@type": "Organization",
			name: "David Rojas",
			url: "",
		},
		address: {
			"@type": "PostalAddress",
			addressLocality: "Bogotá",
			addressRegion: "Bogotá D.C.",
			addressCountry: "CO",
		},
		alumniOf: {
			"@type": "CollegeOrUniversity",
			name: "",
			sameAs: "",
		},
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "Work",
			email: "",
			url: "",
			availableLanguage: ["Spanish", "English"],
			areaServed: "Global",
			hoursAvailable: {
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "09:00",
				closes: "18:00",
				timeZone: "America/Bogota",
			},
		},
		knowsLanguage: [
			{
				"@type": "Language",
				name: "Spanish",
				alternateName: "es",
			},
			{
				"@type": "Language",
				name: "English",
				alternateName: "en",
			},
		],
		hasOccupation: {
			"@type": "Occupation",
			name: "AI & Backend Developer",
			description:
				"Specialized in artificial intelligence, machine learning, and backend development. Building scalable and innovative solutions for complex problems.",
			occupationalCategory: "15-1132.00",
		},
		knowsAbout: [
			"Artificial Intelligence",
			"Machine Learning",
			"Backend Development",
			"Python",
			"C#",
			"C++",
			"Cloud Computing",
			"Data Engineering",
			"APIs",
			"Microservices",
			"DevOps",
			"Scalable Systems",
		],
	};

	return (
		<html lang="es" suppressHydrationWarning>
		<head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>{metadata.title}</title>
			<meta
				name="description"
				content="David Rojas  is a leading AI and backend developer specialized in artificial intelligence, machine learning, and scalable backend systems. Offering cutting-edge solutions for startups and enterprises worldwide."
			/>
			<meta name="author" content="David Rojas " />
			<meta name="creator" content="David Rojas " />
			<meta
				property="og:image"
				content="https://davidev.com/assets/images/socialpreview.webp"
			/>

			<link rel="icon" href="/favicon.ico" />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://davidev.com/" />
			<meta
				property="og:title"
				content="David Rojas  / Mid-Level Fullstack Web Developer (Backend-leaning) – Python, React, FastAPI, Node.js, PostgreSQL / Remote LATAM (Argentina)"
			/>
			<meta
				property="og:description"
				content="David Rojas  is a leading AI and backend developer specialized in artificial intelligence, machine learning, and scalable backend systems. Offering cutting-edge solutions for startups and enterprises worldwide."
			/>
			<meta
				property="og:image"
				content="https://davidev.com/assets/images/socialpreview.webp"
				style={{ width: 1200, height: 630 }}
			/>

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta
				property="twitter:title"
				content="David Rojas  / Mid-Level Fullstack Web Developer (Backend-leaning) – Python, React, FastAPI, Node.js, PostgreSQL / Remote LATAM (Argentina)"
			/>
			<meta
				property="twitter:description"
				content="David Rojas  is a leading AI and backend developer specialized in artificial intelligence, machine learning, and scalable backend systems. Offering cutting-edge solutions for startups and enterprises worldwide."
			/>
			<meta
				property="twitter:image"
				content="https://davidev.com/assets/images/socialpreview.webp"
				style={{ width: 1200, height: 630 }}
			/>
			<meta property="twitter:creator" content="@pyoneerC" />
			<meta property="twitter:site" content="@pyoneerC" />

			<link rel="canonical" href="https://davidev.com" />
			<meta name="robots" content="index, follow" />
			<link rel="alternate" hrefLang="en" href="https://davidev.com/" />
			<meta
				name="keywords"
				content="AI developer, artificial intelligence, machine learning, backend development, David Rojas , software developer, Python developer, C# developer, scalable systems, cloud computing, data engineering, APIs, microservices, DevOps, AI frameworks, innovative software solutions"
			/>

		</head>
		<body className={`${GeistSans.className} ${GeistSans.variable}`}>
		<NextIntlClientProvider messages={messages}>
			<ThemeProvider>
				<SvgMasks />
				<div className="__next">
					<Header />
					{children}
				</div>
			</ThemeProvider>
		</NextIntlClientProvider>
		</body>
		</html>
	);
}