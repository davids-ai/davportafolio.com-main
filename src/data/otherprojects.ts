import { CoverProjectOther } from "~/types"
import { Tag } from "./tags"

export const projectMetadata = {
	unrealengineprojectcleaner: {
		slug: "mercadolibrepricechart",
		name: "Unreal Engine Project Cleaner",
	},
	arrayutils: {
		slug: "arrayutils",
		name: "Array Utils",
	},
	hangman: {
		slug: "hangman",
		name: "Hangman",
	},
	argentofx: {
		slug: "argentofx",
		name: "ArgentoFX",
	},
	pixelateddrift: {
		slug: "pixelateddrift",
		name: "Mercadix",
	},
	portfolio: {
		slug: "portfolio",
		name: "Portfolio",
	},
	HillClimbRacing: {
		slug: "hillclimbracingclone",
		name: "Hill Climb Racing",
	},
	thegreatchocolatecaper: {
		slug: "thegreatchocolatecaper",
		name: "0xwik1tr0n",
	},
	roadmapsh: {
		slug: "roadmapsh",
		name: "Roadmap.sh",
	},
}

export const coverProjects: CoverProjectOther[] = [
	{
		...projectMetadata.pixelateddrift,
		imageUrl: `/assets/images/projects/cover/mercadolibre.avif`,
		description: "mercadix",
		tags: [Tag.python, Tag.flask, Tag.html],
		link: ""
	},
	{
		...projectMetadata.thegreatchocolatecaper,
		imageUrl: `/assets/images/projects/otherprojectscover/thegreatchocolatecaper.avif`,
		description: "tgcp",
		tags: [Tag.python, Tag.pytorch, Tag.huggingface],
		link: ""
	}
]