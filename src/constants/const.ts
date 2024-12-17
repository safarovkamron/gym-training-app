import { CgAdidas } from "react-icons/cg"
import { FaMeta } from "react-icons/fa6"
import { RiAppleFill } from "react-icons/ri"
import { SiCocacola, SiNike, SiSamsung, SiSony } from "react-icons/si"

export const featuredItems = [
	SiNike,
	SiSamsung,
	RiAppleFill,
	SiSony,
	FaMeta,
	SiCocacola,
	CgAdidas,
]

export const programs = [
	{
		title: 'Workout Videos',
		description: 'Access to hunders of free, full-length workout videos.'
	},
	{
		title: 'Workout Programs',
		description: 'Affordable and effective workout programs.'
	},
	{
		title: 'Meal Plans',
		description: 'Plans built registered dietitians and nutritionists.'
	},
]

export const navLinks = [
	{label: 'Home', path: '/'},
	{label: 'Programs', path: '/programs'},
]