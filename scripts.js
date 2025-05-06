async function fetchGitHubData() {
    const username = document.getElementById('github-username').value.trim();
    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const reposData = await reposResponse.json();

        displayGitHubData(userData, reposData);
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}

function displayGitHubData(userData, reposData) {
    const resumeContent = document.getElementById('resume-content');
    resumeContent.innerHTML = `
        <div class="profile">
            <img src="${userData.avatar_url}" alt="${userData.name}" class="avatar">
            <h2>${userData.name}</h2>
            <p>${userData.bio || 'No bio available'}</p>
            <ul>
                <li><strong>Followers:</strong> ${userData.followers}</li>
                <li><strong>Following:</strong> ${userData.following}</li>
                <li><strong>Public Repos:</strong> ${userData.public_repos}</li>
            </ul>
        </div>
        <div class="repos">
            <h3>Repositories</h3>
            <ul>
                ${reposData.map(repo => `
                    <li>
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        <p>${repo.description || 'No description'}</p>
                        <ul>
                            <li><strong>Stars:</strong> ${repo.stargazers_count}</li>
                            <li><strong>Forks:</strong> ${repo.forks_count}</li>
                        </ul>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}
