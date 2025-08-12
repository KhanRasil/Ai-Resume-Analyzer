// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Thank you for your message! We will get back to you soon.', 'success');
      this.reset();
    });
  }

  // Initialize resume builder if the section exists
  if (document.getElementById('build-resume')) {
    initResumeBuilder();
    addLinkedInImport();
  }

  // Initialize template selection
  initTemplateSelection();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize theme switcher
  initThemeSwitcher();

  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.step, .feature, .benefit-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Theme switcher
function initThemeSwitcher() {
  const themeSwitcher = document.createElement('div');
  themeSwitcher.className = 'theme-switcher';
  themeSwitcher.innerHTML = `
    <button class="theme-btn light" data-theme="light"><i class="fas fa-sun"></i></button>
    <button class="theme-btn dark" data-theme="dark"><i class="fas fa-moon"></i></button>
  `;
  
  // Add to header
  const nav = document.querySelector('nav');
  nav.appendChild(themeSwitcher);
  
  // Event listeners
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.dataset.theme;
      setTheme(theme);
    });
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
}

function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
  
  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}


function initMobileMenu() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  
  // Create mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  
  // Insert before nav links
  nav.appendChild(mobileMenuBtn);
  
  // Create mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  
  // Clone nav links for mobile
  const navLinks = document.querySelector('.nav-links').cloneNode(true);
  navLinks.classList.add('mobile-nav-links');
  mobileMenu.appendChild(navLinks);
  
  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'mobile-menu-close';
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  mobileMenu.insertBefore(closeBtn, mobileMenu.firstChild);
  
  // Add to body
  document.body.appendChild(mobileMenu);
  
  // Event listeners
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  
  closeBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
  
  // Close when clicking on a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


function initTemplateSelection() {
  const templateSection = document.createElement('div');
  templateSection.className = 'template-selection';
  templateSection.innerHTML = `
    <h3>Choose a Resume Template</h3>
    <div class="template-options">
      <div class="template-option active" data-template="professional">
        <div class="template-preview professional-template"></div>
        <p>Professional</p>
      </div>
      <div class="template-option" data-template="modern">
        <div class="template-preview modern-template"></div>
        <p>Modern</p>
      </div>
      <div class="template-option" data-template="creative">
        <div class="template-preview creative-template"></div>
        <p>Creative</p>
      </div>
      <div class="template-option" data-template="minimal">
        <div class="template-preview minimal-template"></div>
        <p>Minimal</p>
      </div>
    </div>
  `;
  
  // Insert after the hero section
  const hero = document.querySelector('.hero');
  hero.parentNode.insertBefore(templateSection, hero.nextSibling);
  
  // Add event listeners for template selection
  document.querySelectorAll('.template-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      // Store selected template
      localStorage.setItem('selectedTemplate', this.dataset.template);
    });
  });
}

function addLinkedInImport() {
  const linkedInImport = document.createElement('div');
  linkedInImport.className = 'linkedin-import';
  linkedInImport.innerHTML = `
    <div class="import-container">
      <h3>Import from LinkedIn</h3>
      <p>Save time by importing your profile information from LinkedIn</p>
      <button class="cta-button" id="import-linkedin">
        <i class="fab fa-linkedin"></i> Import Profile
      </button>
      <div class="divider">
        <span>or</span>
      </div>
    </div>
  `;
  
  // Insert at the beginning of the resume form
  const resumeForm = document.getElementById('resume-builder-form');
  if (resumeForm) {
    resumeForm.insertBefore(linkedInImport, resumeForm.firstChild);
    
    // Add event listener
    document.getElementById('import-linkedin').addEventListener('click', importFromLinkedIn);
  }
}

async function importFromLinkedIn() {
  try {
    const importBtn = document.getElementById('import-linkedin');
    const originalText = importBtn.innerHTML;
    importBtn.disabled = true;
    importBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    
    // In a real implementation, you would use the LinkedIn API
    // For security reasons, this must be done through a backend service
    
    // For demo purposes, we'll simulate the OAuth flow
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
    
    // Show a popup explaining the LinkedIn integration
    const proceed = confirm('This will redirect you to LinkedIn to authorize access to your profile. Continue?');
    
    if (proceed) {
      // In a real app, you would redirect to the auth URL
      // window.location.href = linkedInAuthUrl;
      
      // For demo, we'll use mock data
      const mockLinkedInData = await fetchMockLinkedInData();
      fillFormWithData(mockLinkedInData);
      showToast('LinkedIn profile imported successfully!', 'success');
    }
  } catch (error) {
    console.error('Error importing from LinkedIn:', error);
    showToast('Failed to import LinkedIn profile.', 'error');
  } finally {
    const importBtn = document.getElementById('import-linkedin');
    if (importBtn) {
      importBtn.disabled = false;
      importBtn.innerHTML = '<i class="fab fa-linkedin"></i> Import Profile';
    }
  }
}

async function fetchMockLinkedInData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/johndoe',
    experiences: [
      {
        jobTitle: 'Senior Software Engineer',
        company: 'TechCorp',
        startDate: '2018-06',
        endDate: '',
        description: 'Led a team of 5 developers to build scalable web applications. Implemented CI/CD pipelines reducing deployment times by 40%.'
      },
      {
        jobTitle: 'Software Developer',
        company: 'Innovate Inc',
        startDate: '2015-01',
        endDate: '2018-05',
        description: 'Developed and maintained company website and internal tools. Collaborated with design team to implement UI improvements.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'State University',
        startYear: '2011',
        endYear: '2015'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Project Management'],
    certifications: [
      {
        name: 'AWS Certified Developer',
        organization: 'Amazon Web Services',
        year: '2020'
      }
    ]
  };
}
  // Fill education
  data.education.forEach((edu, index) => {
    if (index > 0) addEducationField();
    
    const container = document.getElementById('education-container');
    const entry = container.children[index];
    
    entry.querySelector(`#degree-${index+1}`).value = edu.degree || '';
    entry.querySelector(`#institution-${index+1}`).value = edu.institution || '';
    entry.querySelector(`#education-start-${index+1}`).value = edu.startYear || '';
    entry.querySelector(`#education-end-${index+1}`).value = edu.endYear || '';
  });
  
  // Fill skills
  document.getElementById('skills').value = data.skills.join(', ') || '';
  
  // Fill certifications
  data.certifications.forEach((cert, index) => {
    if (index > 0) addCertificationField();
    
    const container = document.getElementById('certifications-container');
    const entry = container.children[index];
    
    entry.querySelector(`#cert-name-${index+1}`).value = cert.name || '';
    entry.querySelector(`#cert-org-${index+1}`).value = cert.organization || '';
    entry.querySelector(`#cert-year-${index+1}`).value = cert.year || '';
  });
  
  // Show success message
  showToast('LinkedIn profile imported successfully!');



function initResumeBuilder() {
  const resumeForm = document.createElement('form');
  resumeForm.id = 'resume-builder-form';
  resumeForm.className = 'resume-form';
  resumeForm.innerHTML = `
    <div class="form-section">
      <h3>Personal Information</h3>
      <div class="form-group">
        <label for="full-name">Full Name</label>
        <input type="text" id="full-name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" id="phone">
      </div>
      <div class="form-group">
        <label for="linkedin">LinkedIn Profile</label>
        <input type="url" id="linkedin">
      </div>
    </div>
    
    <div class="form-section">
      <h3>Work Experience</h3>
      <div id="experience-container">
        <div class="experience-entry">
          <div class="form-group">
            <label for="job-title-1">Job Title</label>
            <input type="text" id="job-title-1" required>
          </div>
          <div class="form-group">
            <label for="company-1">Company</label>
            <input type="text" id="company-1" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="start-date-1">Start Date</label>
              <input type="month" id="start-date-1" required>
            </div>
            <div class="form-group">
              <label for="end-date-1">End Date</label>
              <input type="month" id="end-date-1">
            </div>
          </div>
          <div class="form-group">
            <label for="job-description-1">Description</label>
            <textarea id="job-description-1" rows="3"></textarea>
          </div>
        </div>
      </div>
      <button type="button" class="add-btn" id="add-experience">+ Add Another Position</button>
    </div>
    
    <div class="form-section">
      <h3>Education</h3>
      <div id="education-container">
        <div class="education-entry">
          <div class="form-group">
            <label for="degree-1">Degree</label>
            <input type="text" id="degree-1" required>
          </div>
          <div class="form-group">
            <label for="institution-1">Institution</label>
            <input type="text" id="institution-1" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="education-start-1">Start Year</label>
              <input type="number" id="education-start-1" min="1900" max="2099" step="1">
            </div>
            <div class="form-group">
              <label for="education-end-1">End Year</label>
              <input type="number" id="education-end-1" min="1900" max="2099" step="1">
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="add-btn" id="add-education">+ Add Another Education</button>
    </div>
    
    <div class="form-section">
      <h3>Skills</h3>
      <div class="form-group">
        <label for="skills">List your skills (comma separated)</label>
        <textarea id="skills" rows="3" placeholder="e.g., JavaScript, Project Management, Data Analysis"></textarea>
      </div>
    </div>
    
    <div class="form-section">
      <h3>Certifications</h3>
      <div id="certifications-container">
        <div class="certification-entry">
          <div class="form-group">
            <label for="cert-name-1">Certification Name</label>
            <input type="text" id="cert-name-1">
          </div>
          <div class="form-group">
            <label for="cert-org-1">Issuing Organization</label>
            <input type="text" id="cert-org-1">
          </div>
          <div class="form-group">
            <label for="cert-year-1">Year Obtained</label>
            <input type="number" id="cert-year-1" min="1900" max="2099" step="1">
          </div>
        </div>
      </div>
      <button type="button" class="add-btn" id="add-certification">+ Add Another Certification</button>
    </div>
    
    <div class="form-actions">
      <button type="submit" class="cta-button">Generate Resume</button>
    </div>
  `;
  

  const buildResumeSection = document.getElementById('build-resume');
  buildResumeSection.querySelector('.container').appendChild(resumeForm);

  // Add event listeners for dynamic form elements
  document.getElementById('add-experience').addEventListener('click', addExperienceField);
  document.getElementById('add-education').addEventListener('click', addEducationField);
  document.getElementById('add-certification').addEventListener('click', addCertificationField);
  
  // Form submission
  resumeForm.addEventListener('submit', handleResumeSubmission);
}


function addExperienceField() {
  const container = document.getElementById('experience-container');
  const count = container.children.length + 1;
  
  const newField = document.createElement('div');
  newField.className = 'experience-entry';
  newField.innerHTML = `
    <div class="form-group">
      <label for="job-title-${count}">Job Title</label>
      <input type="text" id="job-title-${count}" required>
    </div>
    <div class="form-group">
      <label for="company-${count}">Company</label>
      <input type="text" id="company-${count}" required>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="start-date-${count}">Start Date</label>
        <input type="month" id="start-date-${count}" required>
      </div>
      <div class="form-group">
        <label for="end-date-${count}">End Date</label>
        <input type="month" id="end-date-${count}">
      </div>
    </div>
    <div class="form-group">
      <label for="job-description-${count}">Description</label>
      <textarea id="job-description-${count}" rows="3"></textarea>
    </div>
    <button type="button" class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
  `;
  
  container.appendChild(newField);
}

function addEducationField() {
  const container = document.getElementById('education-container');
  const count = container.children.length + 1;
  
  const newField = document.createElement('div');
  newField.className = 'education-entry';
  newField.innerHTML = `
    <div class="form-group">
      <label for="degree-${count}">Degree</label>
      <input type="text" id="degree-${count}" required>
    </div>
    <div class="form-group">
      <label for="institution-${count}">Institution</label>
      <input type="text" id="institution-${count}" required>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="education-start-${count}">Start Year</label>
        <input type="number" id="education-start-${count}" min="1900" max="2099" step="1">
      </div>
      <div class="form-group">
        <label for="education-end-${count}">End Year</label>
        <input type="number" id="education-end-${count}" min="1900" max="2099" step="1">
      </div>
    </div>
    <button type="button" class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
  `;
  
  container.appendChild(newField);
}

function addCertificationField() {
  const container = document.getElementById('certifications-container');
  const count = container.children.length + 1;
  
  const newField = document.createElement('div');
  newField.className = 'certification-entry';
  newField.innerHTML = `
    <div class="form-group">
      <label for="cert-name-${count}">Certification Name</label>
      <input type="text" id="cert-name-${count}">
    </div>
    <div class="form-group">
      <label for="cert-org-${count}">Issuing Organization</label>
      <input type="text" id="cert-org-${count}">
    </div>
    <div class="form-group">
      <label for="cert-year-${count}">Year Obtained</label>
      <input type="number" id="cert-year-${count}" min="1900" max="2099" step="1">
    </div>
    <button type="button" class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
  `;
  
  container.appendChild(newField);
}

async function handleResumeSubmission(e) {
  e.preventDefault();
  
  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
  
  // Collect form data
  const formData = collectResumeData();
  
  try {
    // Simulate API call (in a real app, this would be a fetch to your backend)
    const resumeResult = await generateResume(formData);
    
    // Display the generated resume
    displayGeneratedResume(resumeResult);
  } catch (error) {
    console.error('Error generating resume:', error);
    alert('There was an error generating your resume. Please try again.');
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

function collectResumeData() {
  const personalInfo = {
    name: document.getElementById('full-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    linkedin: document.getElementById('linkedin').value
  };
  
  // Collect work experience
  const experiences = [];
  const experienceEntries = document.getElementById('experience-container').children;
  for (let i = 0; i < experienceEntries.length; i++) {
    const entry = experienceEntries[i];
    experiences.push({
      jobTitle: entry.querySelector(`#job-title-${i+1}`).value,
      company: entry.querySelector(`#company-${i+1}`).value,
      startDate: entry.querySelector(`#start-date-${i+1}`).value,
      endDate: entry.querySelector(`#end-date-${i+1}`).value,
      description: entry.querySelector(`#job-description-${i+1}`).value
    });
  }
  
  // Collect education
  const education = [];
  const educationEntries = document.getElementById('education-container').children;
  for (let i = 0; i < educationEntries.length; i++) {
    const entry = educationEntries[i];
    education.push({
      degree: entry.querySelector(`#degree-${i+1}`).value,
      institution: entry.querySelector(`#institution-${i+1}`).value,
      startYear: entry.querySelector(`#education-start-${i+1}`).value,
      endYear: entry.querySelector(`#education-end-${i+1}`).value
    });
  }
  
  // Collect skills
  const skills = document.getElementById('skills').value
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
  
  // Collect certifications
  const certifications = [];
  const certEntries = document.getElementById('certifications-container').children;
  for (let i = 0; i < certEntries.length; i++) {
    const entry = certEntries[i];
    certifications.push({
      name: entry.querySelector(`#cert-name-${i+1}`).value,
      organization: entry.querySelector(`#cert-org-${i+1}`).value,
      year: entry.querySelector(`#cert-year-${i+1}`).value
    });
  }
  
  return {
    personalInfo,
    experiences,
    education,
    skills,
    certifications
  };
}

// Mock function to simulate resume generation
async function generateResume(data) {
  // In a real application, this would call your backend API
  return new Promise(resolve => {
    setTimeout(() => {
      // Simulate AI processing and resume generation
      const resume = {
        html: generateResumeHTML(data),
        pdfUrl: '#', // In real app, this would be a URL to download the PDF
        score: calculateResumeScore(data),
        suggestions: generateSuggestions(data),
        jobMatches: generateJobMatches(data)
      };
      resolve(resume);
    }, 2000); // Simulate processing delay
  });
}

function generateResumeHTML(data) {
  // This would generate the actual HTML for the resume
  // For simplicity, we'll return a basic structure
  return `
    <div class="resume-template">
      <h1>${data.personalInfo.name}</h1>
      <p>${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.linkedin}</p>
      
      <h2>Professional Experience</h2>
      ${data.experiences.map(exp => `
        <div class="experience">
          <h3>${exp.jobTitle} at ${exp.company}</h3>
          <p>${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
          <p>${exp.description}</p>
        </div>
      `).join('')}
      
      <h2>Education</h2>
      ${data.education.map(edu => `
        <div class="education">
          <h3>${edu.degree}</h3>
          <p>${edu.institution}, ${edu.startYear} - ${edu.endYear || 'Present'}</p>
        </div>
      `).join('')}
      
      <h2>Skills</h2>
      <ul>
        ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
      
      ${data.certifications.length > 0 ? `
      <h2>Certifications</h2>
      <ul>
        ${data.certifications.map(cert => `
          <li>${cert.name} (${cert.organization}, ${cert.year})</li>
        `).join('')}
      </ul>
      ` : ''}
    </div>
  `;
}

// Enhanced downloadResumePDF function
async function downloadResumePDF() {
  try {
    const submitBtn = document.getElementById('download-pdf');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    
    // In a real app, this would call your backend API to generate a PDF
    // For demo purposes, we'll create a simple PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Get resume content
    const resumeContent = document.getElementById('resume-preview').innerText;
    
    // Add resume to PDF
    doc.text(resumeContent, 10, 10);
    
    // Get user's name for filename
    const userName = document.getElementById('full-name')?.value || 'resume';
    
    // Save the PDF
    doc.save(`${userName.replace(/\s+/g, '_')}_resume.pdf`);
    
    showToast('Resume downloaded successfully!', 'success');
  } catch (error) {
    console.error('Error generating PDF:', error);
    showToast('Failed to generate PDF. Please try again.', 'error');
  } finally {
    const submitBtn = document.getElementById('download-pdf');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Download PDF';
    }
  }
}

// Enhanced generateCoverLetter function
async function generateCoverLetter() {
  try {
    const submitBtn = document.getElementById('generate-cover-letter');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    
    // Collect resume data
    const resumeData = collectResumeData();
    
    // In a real app, this would call your backend API
    // For demo, we'll generate a simple cover letter
    const coverLetterHTML = `
      <div class="cover-letter">
        <p>${new Date().toLocaleDateString()}</p>
        <p>Dear Hiring Manager,</p>
        <p>I am excited to apply for the position at your company. With my background in ${resumeData.experiences[0]?.jobTitle || 'my field'}, I believe I would be a great fit for your team.</p>
        <p>In my most recent role at ${resumeData.experiences[0]?.company || 'my previous company'}, I ${resumeData.experiences[0]?.description || 'gained valuable experience'}.</p>
        <p>My skills in ${resumeData.skills.slice(0, 3).join(', ') || 'relevant skills'} would allow me to contribute immediately to your team.</p>
        <p>I would welcome the opportunity to discuss how my experience aligns with your needs. Thank you for your time and consideration.</p>
        <p>Sincerely,</p>
        <p>${resumeData.personalInfo.name}</p>
      </div>
    `;
    
    // Display cover letter in a modal
    showCoverLetterModal(coverLetterHTML);
    showToast('Cover letter generated!', 'success');
  } catch (error) {
    console.error('Error generating cover letter:', error);
    showToast('Failed to generate cover letter.', 'error');
  } finally {
    const submitBtn = document.getElementById('generate-cover-letter');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-envelope-open-text"></i> Generate Cover Letter';
    }
  }
}
function showCoverLetterModal(content) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'cover-letter-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      <h2>Your Cover Letter</h2>
      <div class="cover-letter-content">${content}</div>
      <button class="cta-button" id="download-cover-letter">
        <i class="fas fa-file-download"></i> Download Cover Letter
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listeners
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.remove();
  });
  
  document.getElementById('download-cover-letter').addEventListener('click', () => {
    downloadCoverLetterPDF(content);
  });
}

function downloadCoverLetterPDF(content) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const userName = document.getElementById('full-name')?.value || 'cover_letter';
  
  doc.text(content.replace(/<[^>]*>/g, ''), 10, 10);
  doc.save(`${userName.replace(/\s+/g, '_')}_cover_letter.pdf`);
  showToast('Cover letter downloaded!', 'success');
}
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function calculateResumeScore(data) {
  // Simple scoring algorithm - in a real app this would be more sophisticated
  let score = 50; // Base score
  
  // Add points for completeness
  if (data.personalInfo.name && data.personalInfo.email) score += 10;
  if (data.experiences.length > 0) score += 15;
  if (data.education.length > 0) score += 10;
  if (data.skills.length >= 5) score += 10;
  if (data.certifications.length > 0) score += 5;
  
  // Cap at 100
  return Math.min(score, 100);
}

function generateSuggestions(data) {
  const suggestions = [];
  
  // Experience suggestions
  if (data.experiences.length === 0) {
    suggestions.push('Consider adding your work experience to make your resume stronger.');
  } else {
    data.experiences.forEach(exp => {
      if (!exp.description || exp.description.length < 50) {
        suggestions.push(`Add more details to your "${exp.jobTitle}" position description. Focus on achievements and quantifiable results.`);
      }
    });
  }
  
  // Skill suggestions
  if (data.skills.length < 5) {
    suggestions.push('Consider adding more skills to your resume. Most job descriptions look for 5-10 key skills.');
  }
  
  // Certification suggestions based on skills
  if (data.skills.includes('Project Management') && !data.certifications.some(c => c.name.includes('PMP'))) {
    suggestions.push('Consider obtaining a PMP certification to validate your Project Management skills.');
  }
  
  if (data.skills.includes('JavaScript') && !data.certifications.some(c => c.name.includes('JavaScript'))) {
    suggestions.push('Consider getting a JavaScript certification to strengthen your profile for developer roles.');
  }
  
  return suggestions;
}

function generateJobMatches(data) {
  // This would normally come from an API that matches jobs based on skills and experience
  // For demo purposes, we'll return some mock matches
  const mockJobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA (Remote)',
      platform: 'LinkedIn',
      matchScore: 85,
      url: '#'
    },
    {
      title: 'Project Manager',
      company: 'Innovate Inc',
      location: 'New York, NY',
      platform: 'Indeed',
      matchScore: 78,
      url: '#'
    },
    {
      title: 'Frontend Developer',
      company: 'WebSolutions',
      location: 'Remote',
      platform: 'Glassdoor',
      matchScore: 92,
      url: '#'
    }
  ];
  
  // Sort by match score
  return mockJobs.sort((a, b) => b.matchScore - a.matchScore);
}

function displayGeneratedResume(resume) {
  const buildResumeSection = document.getElementById('build-resume');
  
  // Create results container
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'resume-results';
  resultsContainer.innerHTML = `
    <div class="resume-preview-container">
      <div class="resume-preview" id="resume-preview">
        ${resume.html}
      </div>
      <div class="resume-actions">
        <button class="cta-button" id="download-pdf">
          <i class="fas fa-file-pdf"></i> Download PDF
        </button>
        <button class="cta-button secondary" id="generate-cover-letter">
          <i class="fas fa-envelope-open-text"></i> Generate Cover Letter
        </button>
      </div>
    </div>
    
    <div class="resume-feedback">
      <div class="resume-score">
        <h3>Your Resume Score: <span>${resume.score}/100</span></h3>
        <div class="score-bar">
          <div class="score-progress" style="width: ${resume.score}%"></div>
        </div>
        <p>${getScoreFeedback(resume.score)}</p>
      </div>
      
      <div class="suggestions">
        <h3>Improvement Suggestions</h3>
        <ul>
          ${resume.suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      
      <div class="job-matches">
        <h3>Recommended Job Matches</h3>
        <div class="job-cards">
          ${resume.jobMatches.map(job => `
            <div class="job-card">
              <h4>${job.title}</h4>
              <p class="company">${job.company}</p>
              <p class="location">${job.location}</p>
              <p class="platform">Found on ${job.platform}</p>
              <div class="match-score">
                <span>${job.matchScore}% Match</span>
                <div class="match-bar">
                  <div style="width: ${job.matchScore}%"></div>
                </div>
              </div>
              <a href="${job.url}" target="_blank" class="view-job">View Job</a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  // Replace the form with results
  const form = document.getElementById('resume-builder-form');
  buildResumeSection.querySelector('.container').replaceChild(resultsContainer, form);
  
  // Add event listeners for new buttons
  document.getElementById('download-pdf').addEventListener('click', downloadResumePDF);
  document.getElementById('generate-cover-letter').addEventListener('click', generateCoverLetter);
}
function showResumeAnalytics() {
  // This would normally be called after resume generation
  const analyticsData = {
    atsScore: 87,
    readabilityScore: 92,
    keywordMatches: {
      required: 12,
      found: 10,
      missing: ['Agile', 'SCRUM', 'REST API']
    },
    actionVerbs: 15,
    metricsUsed: 7
  };
  
  const analyticsHTML = `
    <div class="analytics-dashboard">
      <h3>Resume Analytics</h3>
      <div class="analytics-grid">
        <div class="analytics-card">
          <div class="analytics-value">${analyticsData.atsScore}</div>
          <div class="analytics-label">ATS Score</div>
          <div class="analytics-description">How well your resume will parse in Applicant Tracking Systems</div>
        </div>
        <div class="analytics-card">
          <div class="analytics-value">${analyticsData.readabilityScore}</div>
          <div class="analytics-label">Readability</div>
          <div class="analytics-description">How easy your resume is to read and understand</div>
        </div>
        <div class="analytics-card">
          <div class="analytics-value">${analyticsData.keywordMatches.found}/${analyticsData.keywordMatches.required}</div>
          <div class="analytics-label">Keyword Matches</div>
          <div class="analytics-description">Industry keywords found in your resume</div>
        </div>
        <div class="analytics-card">
          <div class="analytics-value">${analyticsData.actionVerbs}</div>
          <div class="analytics-label">Action Verbs</div>
          <div class="analytics-description">Powerful action verbs that make your experience stand out</div>
        </div>
        <div class="analytics-card">
          <div class="analytics-value">${analyticsData.metricsUsed}</div>
          <div class="analytics-label">Quantifiable Metrics</div>
          <div class="analytics-description">Numbers that demonstrate your impact</div>
        </div>
      </div>
      
      <div class="keyword-analysis">
        <h4>Missing Keywords</h4>
        <p>These keywords are commonly found in job descriptions for your target roles:</p>
        <div class="keyword-tags">
          ${analyticsData.keywordMatches.missing.map(keyword => `
            <span class="keyword-tag">${keyword}</span>
          `).join('')}
        </div>
        <button class="cta-button secondary" id="add-keywords">
          <i class="fas fa-plus"></i> Add to Resume
        </button>
      </div>
    </div>
  `;
  
  // Add to resume results
  const resumeFeedback = document.querySelector('.resume-feedback');
  if (resumeFeedback) {
    resumeFeedback.insertAdjacentHTML('afterbegin', analyticsHTML);
    
    // Add event listener for adding keywords
    document.getElementById('add-keywords')?.addEventListener('click', function() {
      const skillsTextarea = document.getElementById('skills');
      const currentSkills = skillsTextarea.value;
      const newSkills = analyticsData.keywordMatches.missing.join(', ');
      
      skillsTextarea.value = currentSkills ? `${currentSkills}, ${newSkills}` : newSkills;
      showToast('Keywords added to your skills section!');
    });
  }
}


function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Remove after animation
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

function getScoreFeedback(score) {
  if (score >= 90) return 'Excellent! Your resume is well-optimized and ready to send to employers.';
  if (score >= 75) return 'Good! Your resume is strong but could benefit from a few improvements.';
  if (score >= 60) return 'Fair. Consider implementing the suggestions below to improve your resume.';
  return 'Needs work. Follow the suggestions below to create a more competitive resume.';
}

function downloadResumePDF() {
  // In a real app, this would download the actual PDF generated by the backend
  alert('In a complete application, this would download your resume as a PDF.');
}

function generateCoverLetter() {
  // In a real app, this would open a cover letter generator
  alert('In a complete application, this would generate a personalized cover letter based on your resume.');
}
