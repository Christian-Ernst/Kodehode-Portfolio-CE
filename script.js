document.addEventListener("DOMContentLoaded", () => {
  const backgroundContainer = document.querySelector(
      ".background-image-container"
    ),
    sections = document.querySelectorAll("section"),
    overlay = document.getElementById("overlay"),
    navList = document.getElementById("nav-list"),
    navItemTemplate = document.getElementById("nav-item-template"),
    skillGrid = document.getElementById("grid-container2"),
    skillTemplate = document.getElementById("skill-item-template"),
    projectGrid = document.getElementById("grid-container3"),
    projectTemplate = document.getElementById("project-card-template"),
    contactGrid = document.getElementById("grid-container4"),
    contactTemplate = document.getElementById("contact-item-template");

  const createFromTemplate = (template, parent, configure) => {
    const element = template.content.firstElementChild.cloneNode(true);
    configure(element);
    parent.appendChild(element);
    return element;
  };

  const showOverlay = (text) => {
    overlay.innerText = text;
    overlay.style.display = "block";
  };

  const hideOverlay = () => {
    overlay.style.display = "none";
  };

  const attachExternalLink = (element) => {
    if (element.dataset.url) {
      element.addEventListener("click", () => {
        window.open(element.dataset.url, "_blank");
      });
    }
  };

  const navItems = [
    { id: "a1", href: "#section1", label: "HOME" },
    { id: "a2", href: "#section2", label: "ABOUT ME" },
    { id: "a3", href: "#section3", label: "SKILLS" },
    { id: "a4", href: "#section4", label: "PROJECTS" },
    { id: "a5", href: "#section5", label: "CONTACT" },
  ];

  const skills = [
    {
      id: "problem-solving",
      description: "My ability to solve whatever problem gets thrown at me.",
    },
    {
      id: "chatgpt",
      description: "Using and utilising the vast hive-mind knowledge of AI",
    },
    { id: "css", description: "I use CSS to apply styling to my projects." },
    {
      id: "react",
      description: "Used to streamline the process of creating web-apps.",
    },
    {
      id: "python",
      description: "Used for creating ease-of-life scripts.",
    },
    {
      id: "figma",
      description:
        "I use Figma to give myself an idea of how my project should look like.",
    },
    { id: "html", description: "I use HTML to give structure to my web-creations." },
    {
      id: "javascript",
      description: "I am using Javascript to make my websites/projects interactive.",
    },
  ];

  const projects = [
    {
      id: "project1",
      url: "https://kodehode-stavanger.github.io/user-data-assignment-kodehodechristian/",
    },
    {
      id: "project2",
      url: "https://kodehode-stavanger.github.io/javascript-advanced-project-api-kodehodechristian/",
    },
    {
      id: "project3",
      url: "https://kodehode-stavanger.github.io/javascript-advanced-project-drum-machine-kodehodechristian/",
    },
    {
      id: "project4",
      url: "https://kodehodechristian.github.io/Cat_and_Mouse_Game/",
    },
  ];

  const contactItems = [
    { id: "epost-logo", classes: ["contact-logo"] },
    {
      id: "epost",
      content: "kodehodechristian@gmail.com",
      classes: ["contact-text"],
    },
    { id: "mobil-logo", classes: ["contact-logo"] },
    { id: "mobil", content: "mob. 949 88 744", classes: ["contact-text"] },
    { id: "git", content: "Git", classes: ["contact-text"] },
    {
      id: "git-logo",
      url: "https://github.com/kodehodechristian",
      classes: ["contact-logo"],
    },
    { id: "hub", content: "hub", classes: ["contact-text"] },
    {
      id: "cv-pdf-logo",
      url: "https://github.com/kodehodechristian/Kodehode-Portfolio-CE/blob/main/CV-Christian.Ernst.pdf",
      classes: ["contact-logo"],
    },
  ];

  navItems.forEach((item) => {
    createFromTemplate(navItemTemplate, navList, (element) => {
      const link = element.querySelector(".nav-link");
      const highlight = element.querySelector(".firstLetterNavItem");
      const remainder = element.querySelector(".nav-link-text");

      link.href = item.href;
      link.id = item.id;
      highlight.textContent = item.label.charAt(0);
      remainder.textContent = item.label.slice(1);
    });
  });

  skills.forEach((skill) => {
    const skillElement = createFromTemplate(skillTemplate, skillGrid, (element) => {
      element.id = skill.id;
    });
    skillElement.addEventListener("mouseenter", () => showOverlay(skill.description));
    skillElement.addEventListener("mouseleave", hideOverlay);
  });

  projects.forEach((project) => {
    const projectElement = createFromTemplate(
      projectTemplate,
      projectGrid,
      (element) => {
        element.id = project.id;
        element.dataset.url = project.url;
      }
    );
    attachExternalLink(projectElement);
  });

  contactItems.forEach((item) => {
    const contactElement = createFromTemplate(
      contactTemplate,
      contactGrid,
      (element) => {
        element.id = item.id;
        element.classList.add("contact-entry");
        item.classes?.forEach((className) => element.classList.add(className));
        if (item.content) {
          element.textContent = item.content;
        }
        if (item.url) {
          element.dataset.url = item.url;
        }
      }
    );
    attachExternalLink(contactElement);
  });

  const navLinks = navList.querySelectorAll(".nav-link");

  const updateActiveNavLink = (activeLink = null) => {
    navLinks.forEach((link) => link.classList.remove("active"));
    if (activeLink) {
      activeLink.classList.add("active");
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSection = link.getAttribute("href").substring(1);
      const isSection1 = targetSection === "section1";
      backgroundContainer.classList.toggle("darkened", !isSection1);
      backgroundContainer.style.filter = isSection1 ? "none" : "blur(10px)";

      updateActiveNavLink(link);

      const section = document.getElementById(targetSection);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  const updateActiveNavLinkOnScroll = () => {
    let currentSectionId = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - section.clientHeight / 3) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href").substring(1) === currentSectionId
      );
    });
  };

  window.addEventListener("scroll", updateActiveNavLinkOnScroll);
  updateActiveNavLinkOnScroll();
});
