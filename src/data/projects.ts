import type { CoverProject } from "~/types"
import { Tag } from "./tags"

export const projectMetadata = {
	mercadolibrepricechart: {
		slug: "mercadolibrepricechart",
		name: "Cinemax",
	},
	BlinkLink: {
		slug: "blinklink",
		name: "BlinkLink",
	},
	TheDungeon: {
		slug: "the-dungeon",
		name: "S.P.U",
	},
}

export const coverProjects: CoverProject[] = [
	{
		...projectMetadata.mercadolibrepricechart,
		imageUrl: `/assets/images/projects/cinemax/cinemax.avif`,
		i18nDescriptionKey: "mercadolibrepricechart.description",
	},
	{
		...projectMetadata.BlinkLink,
		imageUrl: `/assets/images/projects/cover/blinklink.avif`,
		i18nDescriptionKey: "monedasAPI.description",
	},
	{
		...projectMetadata.TheDungeon,
		imageUrl: `/assets/images/projects/cover/thedungeon.avif`,
		i18nDescriptionKey: "TheDungeon.description",
	},
]

export const projects = [
	{
		...projectMetadata.mercadolibrepricechart,
		index: 0,
		description: "mercadolibrepricechart.about",
		mobileImages:
			[
				`/assets/images/projects/cinemax/phone.avif`,
			],
		desktopImages:
			[
				`/assets/images/projects/cinemax/index.avif`,
				`/assets/images/projects/cinemax/seats.avif`,
				`/assets/images/projects/cinemax/pycharm.avif`,
				`/assets/images/projects/cinemax/receipt.avif`,
			],
		links: [
			{
				label: "mercadolibrepricechart.linkVisitSite",
				url: "https://cinemaximo.netlify.app/",
			},
			{
				label: "mercadolibrepricechart.linkViewVideo",
				url: "https://youtu.be/0zoD_jpB_t4",
			},
			{
				label: "mercadolibrepricechart.linkViewCode",
				url: "https://github.com/pyoneerC/Cinemax-B",
			},
		],
		tags:
			[
			Tag.python,
			Tag.fastAPI,
			Tag.postgreSQL,
			Tag.docker,
		],
	},
	{
		...projectMetadata.BlinkLink,
		index: 1,
		description: "monedasAPI.about",
		mobileImages:
			[
				`/assets/images/projects/monedasapi/postman.gif`,
			],
		desktopImages:
			[
				`/assets/images/projects/monedasapi/architecturediagram.avif`
			],
		links: [
			{
				label: "monedasAPI.linkViewSite",
				url: "",
			},
			{
				label: "monedasAPI.linkViewVideo",
				url: "https://hub.docker.com/r/maxcomperatore/bliklink",
			},
			{
				label: "monedasAPI.linkViewCode",
				url: "https://github.com/pyoneerC/BlinkLink",
			},
		],
		tags:
			[
			Tag.python,
			Tag.postgreSQL,
			Tag.redis,
			Tag.fastAPI,
			Tag.docker,
		],
	},
	{
		...projectMetadata.TheDungeon,
		index: 2,
		description: "TheDungeon.about",
		mobileImages:
			[
				`/assets/images/projects/thedungeon/streamer.avif`,
			],
		desktopImages: [
			`/assets/images/projects/thedungeon/library.avif`,
		],
		links: [
			{
				label: "TheDungeon.linkItchIo",
				url: "https://pyoneerc1.itch.io/spu",
			},
			{
				label: "TheDungeon.linkViewVideos",
				url: "https://www.youtube.com/watch?v=l8W4iZG-S3U&t=2s&ab_channel=pyoneerC",
			},
		],
		tags:
		[
			Tag.python,
			Tag.kivi,
			Tag.llama31
		],
	},
]
