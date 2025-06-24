"use client";

import Link from "next/link"
import { Button } from "~/components/Ui/Button"
import { Footer404 } from "~/components/Footer404"
import styles from "./not-found.module.css"
import { useTranslations } from "next-intl"

export const metadata = {
	title: "Nothing here. - 404",
}

export default function NotFound() {
	const t = useTranslations("404")
	return (
		<>
			<main className={styles.wrapper}>
				<h1 className={styles.title}>404</h1>
				<p className={styles.description}>{t("title")}</p>
				<Button asChild>
					<Link href="/">{t("home")}
					</Link>
				</Button>
			</main>
			<Footer404 />
		</>
	)
}
