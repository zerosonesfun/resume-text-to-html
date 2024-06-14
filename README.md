# resume-text-to-html
Convert resume text to html as long as it is in between &lt;resume>&lt;/resume> and follows a few rules.

## Rules
Ensure you follow the below format. **Bold**, *italic*, and [link](https://google.com) markdown is allowed. Any dash with a letter immediately following it will turn into a bulleted line.
```
<resume>
Billy Wilcosky
Operations and Training Specialist
Phone - Email - [Website](https://google.com)

Summary
This is a summary of my professional career.

Skills
Skill1, Skill2, Skill3, Skill4

Experience
Company A - Job Title - Dates
-Description of job at Company A
-More description

Company B - Job Title - Dates
-Description of job at Company B

Education
Degree, School, Dates

Certifications
*JavaScript*, [School/Company](https://google.com), 2000
**HTML**, School/Company, 1999
</resume>
```
### Sections/Order
Name

Tagline

Contact Information

Summary

Skills

Experience

Education

Certifications

### Usage
Paste all of the following into a webpage (the script at the end does all of the magic).
```
Billy Wilcosky
Operations and Training Specialist
Phone - Email - [Website](https://google.com)

Summary
This is a summary of my professional career.

Skills
Skill1, Skill2, Skill3, Skill4

Experience
Company A - Job Title - Dates
-Description of job at Company A
-More description

Company B - Job Title - Dates
-Description of job at Company B

Education
Degree, School, Dates

Certifications
*JavaScript*, [School/Company](https://google.com), 2000
HTML, School/Company, 1999

<script src="https://cdn.statically.io/gh/zerosonesfun/resume-text-to-html/main/resume.min.js"></script>
```

[DEMO](https://codepen.io/zerosonesfun/pen/gOJXyJY)
