document.addEventListener('DOMContentLoaded', () => {
    const resumeElements = document.getElementsByTagName('resume');

    if (resumeElements.length > 0) {
        const resumeElement = resumeElements[0];
        const resumeContent = resumeElement.textContent;

        // Function to convert markdown to HTML
        const convertMarkdownToHtml = (text) => {
            // Bold
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Italic
            text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
            // Link
            text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
            return text;
        };

        const lines = resumeContent.split('\n').map(line => line.trim()).filter(line => line);

        let html = '';

        if (lines.length >= 3) {
            // Split line 3 to separate out phone, email, and other links
            const line3 = lines[2];
            const parts = line3.split(' - ').map(part => part.trim());

            // Convert parts to HTML with markdown support
            const convertedParts = parts.map(part => convertMarkdownToHtml(part)).join(' - ');

            html += `<h1>${lines[0]}</h1>`;
            html += `<h2>${lines[1]}</h2>`;
            html += `<h3>${convertedParts}</h3>`;
            html += '<hr>';
        }

        let inList = false; // Flag to track if we are currently in a list
        let section = ''; // Track current section

        for (let i = 3; i < lines.length; i++) {
            if (lines[i] === '') {
                continue;
            }

            // Convert markdown to HTML
            let convertedLine = convertMarkdownToHtml(lines[i]);

            if (convertedLine.trim().startsWith('-')) {
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }
                html += `<li style="margin-left: 20px;">${convertedLine.substr(convertedLine.indexOf('-') + 1).trim()}</li>`;
            } else {
                if (inList) {
                    html += '</ul>'; // Close the list if we are still in a list before switching to a new section
                    inList = false;
                }
                if (convertedLine.toLowerCase().includes('summary')) {
                    html += '<h3>Summary</h3>';
                    html += `<p>${convertMarkdownToHtml(lines[i + 1])}</p>`;
                    html += '<hr>';
                    i++; // Skip the next line since it's part of the summary
                    section = 'summary';
                } else if (convertedLine.toLowerCase().includes('skill')) {
                    html += '<h3>Skills</h3>';
                    const skills = lines[i + 1].split(',').map(skill => convertMarkdownToHtml(skill.trim())).join(' | ');
                    html += `<p>${skills}</p>`;
                    html += '<hr>';
                    i++; // Skip the next line since it's part of the skills
                    section = 'skills';
                } else if (convertedLine.toLowerCase().includes('experience')) {
                    html += '<h3>Experience</h3>';
                    section = 'experience';
                } else if (convertedLine.toLowerCase().includes('education')) {
                    html += '<h3>Education</h3>';
                    html += `<p>${convertMarkdownToHtml(lines[i + 1])}</p>`;
                    html += '<hr>';
                    i++; // Skip the next line since it's part of the education
                    section = 'education';
                } else if (convertedLine.toLowerCase().includes('certification')) {
                    html += '<h3>Certifications</h3>';
                    section = 'certification';
                } else {
                    if (section === 'certification') {
                        html += `<p>${convertedLine}</p>`; // Add each line as a separate paragraph under certifications
                    } else {
                        html += `<p>${convertedLine}</p>`; // Default paragraph
                    }
                }
            }
        }

        if (inList) {
            html += '</ul>'; // Close the list if we are still in a list at the end
        }

        resumeElement.innerHTML = html;
    } else {
        console.error('No <resume> element found.');
    }
});
