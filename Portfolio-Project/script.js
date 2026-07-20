const projectMarquee = document.getElementById('project-marquee');
const skillsMarquee = document.getElementById('skills-marquee');

if (projectMarquee) {
    const projectContent = projectMarquee.innerHTML;
    projectMarquee.innerHTML = projectContent + projectContent + projectContent;
}

if (skillsMarquee) {
    const skillContent = skillsMarquee.innerHTML;
    skillsMarquee.innerHTML = skillContent + skillContent + skillContent;
}

function loadComponent(elementId, filePath) {
    fetch(filePath)
    .then(Response=> Response.text())
    .then(data =>{
        document.getElementById(elementId).innerHTML = data;

        if (elementId === 'footer-placholder') {
            const yearContainer = document.getElementById('current-year');
            if (yearContainer) {
                yearContainer.textContent = new Date().getFullYear();
            }
        }
    });
}

loadComponent('nav-placeholder', 'nav.html');
loadComponent('footer-placeholder', 'footer.html');