const MINUTE_LENGTH = 60 * 1000;
let lastUpdatedTime;
let loadedTime;
let updated;

async function initialize() {
	const data = await (
		await fetch(
			"https://api.mistertfy64.com/content-subdomain-project-entries"
		)
	).json();
	const projects = data.projects;
	lastUpdatedTime = data.metadata.lastUpdatedTime;
	for (const project of projects) {
		// create entry
		const projectEntryElement = document.createElement("tr");
		projectEntryElement.classList = ["project-entry"];
		// create link
		const projectLinkElement = document.createElement("a");
		projectLinkElement.text = project.text;
		projectLinkElement.classList = ["link--project"];
		projectLinkElement.href = project.projectURL;
		// create link cell
		const projectLinkElementCell = document.createElement("td");
		projectLinkElementCell.appendChild(projectLinkElement);
		// create commit hash link
		const lastCommitHashText = `${project.repositoryText}`;
		const projectCommitElement = document.createElement("a");
		projectCommitElement.text = lastCommitHashText;
		projectCommitElement.classList = ["link--commit"];
		projectCommitElement.href = project.repositoryURL;
		// create link cell
		const projectCommitElementCell = document.createElement("td");
		projectCommitElementCell.appendChild(projectCommitElement);
		// create date link
		const lastCommitDataText = `${project.modifiedDateText}`;
		const projectCommitDataElement = document.createElement("a");
		projectCommitDataElement.text = lastCommitDataText;
		projectCommitDataElement.classList = ["link--date"];
		// create link cell
		const projectCommitDataElementCell = document.createElement("td");
		projectCommitDataElementCell.appendChild(projectCommitDataElement);
		// add smaller elements
		projectEntryElement.appendChild(projectLinkElementCell);
		projectEntryElement.appendChild(projectCommitElementCell);
		projectEntryElement.appendChild(projectCommitDataElementCell);
		projectEntryElement.appendChild(document.createElement("br"));
		document.getElementById("projects").appendChild(projectEntryElement);
	}
	loadedTime = Date.now();
}

function getFormattedTime(milliseconds) {
	if (milliseconds > MINUTE_LENGTH) {
		const minutes = Math.floor(milliseconds / 60000);
		return `${minutes} minute${minutes != 1 ? "s" : ""}`;
	} else {
		const seconds = Math.floor(milliseconds / 1000);
		return `${seconds} second${seconds != 1 ? "s" : ""}`;
	}
}

function getNextUpdateTime() {
	const now = new Date();
	if (now.getMinutes() < 30) {
		return (
			Date.now() +
			1800000 -
			now.getMinutes() * MINUTE_LENGTH +
			1000 * now.getSeconds() +
			now.getMilliseconds()
		);
	} else {
		return (
			Date.now() +
			3600000 -
			now.getMinutes() * MINUTE_LENGTH +
			1000 * now.getSeconds() +
			now.getMilliseconds()
		);
	}
}

function updateTimes() {
	document.getElementById("time--last-update").innerText = getFormattedTime(
		Date.now() - lastUpdatedTime
	);

	if (getNextUpdateTime() - Date.now <= 0) {
		document.getElementById(
			"time--next-update"
		).innerText = `${getFormattedTime(
			getNextUpdateTime() - Date.now()
		)} (refresh page)`;
	} else {
		document.getElementById("time--next-update").innerText =
			getFormattedTime(getNextUpdateTime() - Date.now());
	}
}

const loop = setInterval(() => {
	updateTimes();
}, 1000);

document.addEventListener("DOMContentLoaded", function (event) {
	initialize();
});
