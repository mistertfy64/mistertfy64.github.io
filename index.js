const PROJECTS = [
	{
		text: "/",
		projectURL: "https://content.mistertfy64.com",
		repositoryURL: "https://github.com/mistertfy64/mistertfy64.github.io",
		repositoryDataURL:
			"https://api.github.com/repos/mistertfy64/mistertfy64.github.io/commits/master",
	},
	{
		text: "/ThaiPrimeMinisterCounter",
		projectURL: "https://content.mistertfy64.com/ThaiPrimeMinisterCounter",
		repositoryURL:
			"https://github.com/mistertfy64/ThaiPrimeMinisterCounter",
		repositoryDataURL:
			"https://api.github.com/repos/mistertfy64/ThaiPrimeMinisterCounter/commits/main",
	},
];

// <a class="link--project">/ThaiPrimeMinisterCounter</a>&nbsp;<a class="link--commit"></a>

async function initialize() {
	for (const project of PROJECTS) {
		// get data
		const data = await (await fetch(project.repositoryDataURL)).json();
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
		const lastCommitHashText = data.sha.toString().substring(0, 7);
		const projectCommitElement = document.createElement("a");
		projectCommitElement.text = lastCommitHashText;
		projectCommitElement.classList = ["link--commit"];
		projectCommitElement.href = project.repositoryURL;
		// create date link
		const lastCommitDataHashText = `${data.commit.author.date.toString()} ${data.author.login.toString()}`;
		const projectCommitDataElement = document.createElement("a");
		projectCommitDataElement.text = lastCommitDataHashText;
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
