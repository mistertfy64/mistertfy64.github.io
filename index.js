// <a class="link--project">/ThaiPrimeMinisterCounter</a>&nbsp;<a class="link--commit"></a>

async function initialize() {
	const data = await (
		await fetch(
			"http://api.mistertfy64.com/content-subdomain-project-entries"
		)
	).json();
	for (const project of data) {
		// create entry
		const projectEntryElement = document.createElement("div");
		projectEntryElement.classList = ["project-entry"];
		// create link
		const projectLinkElement = document.createElement("a");
		projectLinkElement.text = project.text;
		projectLinkElement.classList = ["link--project"];
		projectLinkElement.href = project.projectURL;
		projectEntryElement.appendChild(projectLinkElement);
		// create commit hash link
		const lastCommitHashText = `${project.repositoryText}`;
		const projectCommitElement = document.createElement("a");
		projectCommitElement.text = lastCommitHashText;
		projectCommitElement.classList = ["link--commit"];
		projectCommitElement.href = project.repositoryURL;
		// create date link
		const lastCommitDataText = `${project.modifiedDateText}`;
		const projectCommitDataElement = document.createElement("a");
		projectCommitDataElement.text = lastCommitDataText;
		projectCommitDataElement.classList = ["link--date"];
		// projectCommitDataElement.href = project.repositoryURL;
		// add smaller elements
		projectEntryElement.appendChild(projectLinkElement);
		projectEntryElement.appendChild(projectCommitElement);
		projectEntryElement.appendChild(projectCommitDataElement);
		projectEntryElement.appendChild(document.createElement("br"));
		document.getElementById("projects").appendChild(projectEntryElement);
	}
}

document.addEventListener("DOMContentLoaded", function (event) {
	initialize();
});
