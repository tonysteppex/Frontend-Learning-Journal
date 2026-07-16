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