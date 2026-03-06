import { jsxs, jsx } from "react/jsx-runtime";
import { createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter as createRouter$1 } from "@tanstack/react-router";
const Route$2 = createRootRoute({
  beforeLoad: async () => {
    const themeScript = document.createElement("script");
    themeScript.innerHTML = `(() => { try { const stored = localStorage.getItem('theme'); const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const theme = stored || (systemDark ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; } catch(e) {} })();`;
    document.head.appendChild(themeScript);
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Vishnuraj Rajagopal | Full Stack + AI Engineering Lead"
      },
      {
        name: "description",
        content: "Modern portfolio of Vishnuraj Rajagopal - Full Stack + AI Engineering Lead based in Dubai, UAE."
      },
      {
        property: "og:title",
        content: "Vishnuraj Rajagopal Portfolio"
      },
      {
        property: "og:description",
        content: "Full Stack + AI Engineering Lead | Dubai, UAE"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      }
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico"
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const locales = ["en", "ar", "es", "fr", "hi", "ml"];
function isLocale(value) {
  return locales.includes(value);
}
const localeNames = {
  en: "English",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  hi: "हिन्दी",
  ml: "മലയാളം"
};
const nav$5 = { "home": "الرئيسية", "about": "نبذة عني", "stats": "أبرز الإنجازات", "experience": "الخبرات", "skills": "المهارات", "projects": "المشاريع", "certifications": "الشهادات", "languages": "اللغات", "education": "المؤهلات التعليمية", "contact": "تواصل" };
const hero$5 = { "eyebrow": "دبي، الإمارات العربية المتحدة", "headline": "معماري حلول سحابية في مجال التقنية المالية (FinTech) ومهندس MERN Stack، متخصص في تصميم وتنفيذ حلول مؤسسية آمنة وقابلة للتوسع تتوافق مع متطلبات الأعمال المعقدة. خبير في تصميم معماريات ترتكز على الأمان، وإدارة الموردين، وقيادة الفرق متعددة التخصصات. متمرس في إعداد خارطة طريق تقنية استراتيجية وتنفيذ عمليات نشر مرحلية للمنصات الحيوية.", "summary": "قائد هندسي يتمتع بخبرة تزيد عن 13 عامًا في تطوير وتسليم منصات آمنة وسحابية الأصل ومدعومة بالذكاء الاصطناعي عبر قطاعات التقنية المالية وعمليات الطيران والأنظمة المؤسسية. سجل حافل في بناء وتوسيع فرق عالية الأداء، وتطوير منتجات حيوية، وتحقيق أثر تجاري ملموس.", "value": "بناء حلول FinTech ومنتجات مدعومة بالذكاء الاصطناعي تتميز بالمرونة وقابلية التوسع على المستوى العالمي.", "viewProjects": "عرض المشاريع", "downloadResume": "تحميل السيرة الذاتية (PDF)", "contact": "تواصل" };
const sections$5 = { "about": "نبذة عني", "stats": "الإنجازات المهنية", "experience": "الخبرات", "skills": "المهارات", "projects": "المشاريع", "certifications": "الشهادات", "languages": "اللغات", "education": "المؤهلات التعليمية", "contact": "تواصل معي" };
const stats$5 = { "yearsExperience": "سنوات الخبرة", "certifications": "عدد الشهادات", "companies": "الشركات", "projectsDelivered": "المشاريع المنجزة" };
const skills$5 = { "all": "الكل", "cloudDevOps": "الحوسبة السحابية و DevOps", "frontend": "الواجهة الأمامية (Front-end)", "backend": "الواجهة الخلفية (Back-end)", "aiMachineLearning": "الذكاء الاصطناعي والتعلم الآلي", "security": "الأمن السيبراني", "fintech": "التقنية المالية (FinTech)", "professional": "المهارات المهنية", "toolsOthers": "الأدوات وتقنيات أخرى" };
const projects$5 = { "viewProject": "عرض المشروع ←" };
const certifications$5 = { "all": "الكل", "aws": "AWS", "security": "الأمن", "aiMl": "AI / ML", "architecture": "المعمارية التقنية", "newestFirst": "الأحدث أولاً", "oldestFirst": "الأقدم أولاً", "expires": "تاريخ الانتهاء:" };
const languages$5 = { "title": "اللغات" };
const education$5 = { "in": "في" };
const quickLinks$5 = { "linkedIn": "LinkedIn ↗", "gitHub": "GitHub ↗", "aboutMe": "About.Me ↗", "awsCertified": "معتمد من AWS", "csm": "CSM®" };
const common$5 = { "years": "سنوات" };
const contact$5 = { "name": "الاسم", "email": "البريد الإلكتروني", "subject": "الموضوع", "message": "الرسالة", "submit": "إرسال الرسالة", "success": "تم إرسال الرسالة بنجاح. سأقوم بالتواصل معك قريبًا.", "error": "تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.", "captcha": "فشل التحقق الأمني. يرجى تحديث الصفحة والمحاولة مرة أخرى." };
const ar = {
  nav: nav$5,
  hero: hero$5,
  sections: sections$5,
  stats: stats$5,
  skills: skills$5,
  projects: projects$5,
  certifications: certifications$5,
  languages: languages$5,
  education: education$5,
  quickLinks: quickLinks$5,
  common: common$5,
  contact: contact$5
};
const nav$4 = { "home": "Home", "about": "About", "stats": "Highlights", "experience": "Experience", "skills": "Skills", "projects": "Projects", "certifications": "Certifications", "languages": "Languages", "education": "Education", "contact": "Contact" };
const hero$4 = { "eyebrow": "Dubai, UAE", "headline": "FinTech Cloud Solution Architect & MERN Stack Engineering designing and delivering secure, scalable enterprise solutions that align with complex business needs. Expert in security-first architecture design, vendor management, and leading cross-functional teams. Adept at developing strategic technical roadmaps and executing phased deployments of mission-critical platforms.", "summary": "Engineering leader with 13+ years of experience delivering secure, cloud-native, and AI-augmented platforms across fintech, aviation operations, and enterprise systems. Proven in scaling high-performing teams, building mission-critical products, and driving measurable business impact.", "value": "Building resilient fintech and AI-powered products that scale globally.", "viewProjects": "View Projects", "downloadResume": "Download Resume (PDF)", "contact": "Contact" };
const sections$4 = { "about": "About", "stats": "Career Highlights", "experience": "Experience", "skills": "Skills", "projects": "Projects", "certifications": "Certifications", "languages": "Languages", "education": "Education", "contact": "Contact Me" };
const stats$4 = { "yearsExperience": "Years Experience", "certifications": "Certifications", "companies": "Companies", "projectsDelivered": "Projects Delivered" };
const skills$4 = { "all": "All", "cloudDevOps": "Cloud & DevOps", "frontend": "Frontend", "backend": "Backend", "aiMachineLearning": "AI & Machine Learning", "security": "Security", "fintech": "FinTech", "professional": "Professional", "toolsOthers": "Tools & Others" };
const projects$4 = { "viewProject": "View Project →" };
const certifications$4 = { "all": "All", "aws": "AWS", "security": "Security", "aiMl": "AI/ML", "architecture": "Architecture", "newestFirst": "Newest First", "oldestFirst": "Oldest First", "expires": "Expires:" };
const languages$4 = { "title": "Languages" };
const education$4 = { "in": "in" };
const quickLinks$4 = { "linkedIn": "LinkedIn ↗", "gitHub": "GitHub ↗", "aboutMe": "About.Me ↗", "awsCertified": "AWS Certified", "csm": "CSM®" };
const common$4 = { "years": "years" };
const contact$4 = { "name": "Name", "email": "Email", "subject": "Subject", "message": "Message", "submit": "Send Message", "success": "Message sent successfully. I will get back to you soon.", "error": "Unable to send message. Please try again.", "captcha": "Bot protection failed. Please refresh and retry." };
const en = {
  nav: nav$4,
  hero: hero$4,
  sections: sections$4,
  stats: stats$4,
  skills: skills$4,
  projects: projects$4,
  certifications: certifications$4,
  languages: languages$4,
  education: education$4,
  quickLinks: quickLinks$4,
  common: common$4,
  contact: contact$4
};
const nav$3 = { "home": "Inicio", "about": "Sobre mí", "stats": "Aspectos destacados", "experience": "Experiencia", "skills": "Habilidades", "projects": "Proyectos", "certifications": "Certificaciones", "languages": "Idiomas", "education": "Formación", "contact": "Contacto" };
const hero$3 = { "eyebrow": "Dubái, EAU", "headline": "Arquitecto de Soluciones Cloud FinTech e Ingeniero MERN Stack, especializado en diseñar e implementar soluciones empresariales seguras y escalables alineadas con necesidades comerciales complejas. Experto en arquitectura orientada a la seguridad, gestión de proveedores y liderazgo de equipos multifuncionales. Amplia experiencia en la definición de hojas de ruta técnicas estratégicas y en la ejecución de despliegues por fases de plataformas críticas.", "summary": "Líder de ingeniería con más de 13 años de experiencia en el desarrollo y entrega de plataformas seguras, nativas en la nube y potenciadas por IA en los sectores de FinTech, operaciones aeronáuticas y sistemas empresariales. Experiencia comprobada en el escalado de equipos de alto rendimiento, la creación de productos críticos y la generación de impacto empresarial medible.", "value": "Construcción de productos FinTech resilientes e impulsados por IA que escalan a nivel global.", "viewProjects": "Ver proyectos", "downloadResume": "Descargar currículum (PDF)", "contact": "Contacto" };
const sections$3 = { "about": "Sobre mí", "stats": "Logros profesionales", "experience": "Experiencia", "skills": "Habilidades", "projects": "Proyectos", "certifications": "Certificaciones", "languages": "Idiomas", "education": "Formación", "contact": "Contáctame" };
const stats$3 = { "yearsExperience": "Años de experiencia", "certifications": "Certificaciones", "companies": "Empresas", "projectsDelivered": "Proyectos entregados" };
const skills$3 = { "all": "Todos", "cloudDevOps": "Cloud y DevOps", "frontend": "Front-end", "backend": "Back-end", "aiMachineLearning": "IA y Aprendizaje Automático", "security": "Seguridad", "fintech": "FinTech", "professional": "Competencias profesionales", "toolsOthers": "Herramientas y otras tecnologías" };
const projects$3 = { "viewProject": "Ver proyecto →" };
const certifications$3 = { "all": "Todas", "aws": "AWS", "security": "Seguridad", "aiMl": "IA / ML", "architecture": "Arquitectura", "newestFirst": "Más recientes primero", "oldestFirst": "Más antiguos primero", "expires": "Expira el:" };
const languages$3 = { "title": "Idiomas" };
const education$3 = { "in": "en" };
const quickLinks$3 = { "linkedIn": "LinkedIn ↗", "gitHub": "GitHub ↗", "aboutMe": "About.Me ↗", "awsCertified": "Certificado AWS", "csm": "CSM®" };
const common$3 = { "years": "años" };
const contact$3 = { "name": "Nombre", "email": "Correo electrónico", "subject": "Asunto", "message": "Mensaje", "submit": "Enviar mensaje", "success": "Mensaje enviado correctamente. Me pondré en contacto contigo pronto.", "error": "No se pudo enviar el mensaje. Por favor, inténtalo nuevamente.", "captcha": "La verificación de seguridad falló. Por favor, actualiza la página e inténtalo de nuevo." };
const es = {
  nav: nav$3,
  hero: hero$3,
  sections: sections$3,
  stats: stats$3,
  skills: skills$3,
  projects: projects$3,
  certifications: certifications$3,
  languages: languages$3,
  education: education$3,
  quickLinks: quickLinks$3,
  common: common$3,
  contact: contact$3
};
const nav$2 = { "home": "Accueil", "about": "À propos", "stats": "Points clés", "experience": "Expérience", "skills": "Compétences", "projects": "Projets", "certifications": "Certifications", "languages": "Langues", "education": "Formation", "contact": "Contact" };
const hero$2 = { "eyebrow": "Dubaï, Émirats Arabes Unis", "headline": "Architecte Solutions Cloud FinTech et Ingénieur MERN Stack, concevant et déployant des solutions d’entreprise sécurisées et évolutives adaptées à des besoins métier complexes. Expert en architecture orientée sécurité, en gestion des fournisseurs et en leadership d’équipes transverses. Capable d’élaborer des feuilles de route techniques stratégiques et de piloter le déploiement progressif de plateformes critiques.", "summary": "Leader en ingénierie avec plus de 13 ans d’expérience dans la conception et la livraison de plateformes sécurisées, cloud-native et enrichies par l’IA, dans les secteurs de la FinTech, des opérations aériennes et des systèmes d’entreprise. Expérience confirmée dans la montée en puissance d’équipes performantes, la création de produits critiques et la génération d’un impact mesurable pour l’entreprise.", "value": "Conception de produits FinTech et IA robustes, capables d’évoluer à l’échelle mondiale.", "viewProjects": "Voir les projets", "downloadResume": "Télécharger le CV (PDF)", "contact": "Contact" };
const sections$2 = { "about": "À propos", "stats": "Réalisations professionnelles", "experience": "Expérience", "skills": "Compétences", "projects": "Projets", "certifications": "Certifications", "languages": "Langues", "education": "Formation", "contact": "Me contacter" };
const stats$2 = { "yearsExperience": "Années d’expérience", "certifications": "Certifications", "companies": "Entreprises", "projectsDelivered": "Projets livrés" };
const skills$2 = { "all": "Tous", "cloudDevOps": "Cloud & DevOps", "frontend": "Front-end", "backend": "Back-end", "aiMachineLearning": "IA & Machine Learning", "security": "Sécurité", "fintech": "FinTech", "professional": "Compétences professionnelles", "toolsOthers": "Outils & Autres" };
const projects$2 = { "viewProject": "Voir le projet →" };
const certifications$2 = { "all": "Toutes", "aws": "AWS", "security": "Sécurité", "aiMl": "IA / ML", "architecture": "Architecture", "newestFirst": "Plus récentes en premier", "oldestFirst": "Plus anciennes en premier", "expires": "Expire le :" };
const languages$2 = { "title": "Langues" };
const education$2 = { "in": "en" };
const quickLinks$2 = { "linkedIn": "LinkedIn ↗", "gitHub": "GitHub ↗", "aboutMe": "About.Me ↗", "awsCertified": "Certifié AWS", "csm": "CSM®" };
const common$2 = { "years": "ans" };
const contact$2 = { "name": "Nom", "email": "Email", "subject": "Sujet", "message": "Message", "submit": "Envoyer le message", "success": "Message envoyé avec succès. Je vous contacterai prochainement.", "error": "Impossible d’envoyer le message. Veuillez réessayer.", "captcha": "La vérification anti-bot a échoué. Veuillez actualiser la page et réessayer." };
const fr = {
  nav: nav$2,
  hero: hero$2,
  sections: sections$2,
  stats: stats$2,
  skills: skills$2,
  projects: projects$2,
  certifications: certifications$2,
  languages: languages$2,
  education: education$2,
  quickLinks: quickLinks$2,
  common: common$2,
  contact: contact$2
};
const nav$1 = { "home": "होम", "about": "मेरे बारे में", "stats": "मुख्य उपलब्धियां", "experience": "अनुभव", "skills": "कौशल", "projects": "प्रोजेक्ट्स", "certifications": "प्रमाणन", "languages": "भाषाएं", "education": "शिक्षा", "contact": "संपर्क" };
const hero$1 = { "eyebrow": "दुबई, यूएई", "headline": "FinTech क्लाउड सॉल्यूशन आर्किटेक्ट एवं MERN स्टैक इंजीनियर, जो जटिल व्यावसायिक आवश्यकताओं के अनुरूप सुरक्षित और स्केलेबल एंटरप्राइज समाधान डिज़ाइन एवं डिलीवर करते हैं। सुरक्षा-प्रथम आर्किटेक्चर डिज़ाइन, वेंडर प्रबंधन तथा क्रॉस-फंक्शनल टीमों के नेतृत्व में विशेषज्ञ। रणनीतिक तकनीकी रोडमैप विकसित करने और मिशन-क्रिटिकल प्लेटफॉर्म के चरणबद्ध कार्यान्वयन में दक्ष।", "summary": "13+ वर्षों के अनुभव के साथ इंजीनियरिंग लीडर, जिन्होंने FinTech, एविएशन संचालन और एंटरप्राइज सिस्टम्स में सुरक्षित, क्लाउड-नेटिव तथा AI-सक्षम प्लेटफॉर्म विकसित और डिलीवर किए हैं। उच्च-प्रदर्शन करने वाली टीमों को स्केल करने, मिशन-क्रिटिकल उत्पादों का निर्माण करने और मापनीय व्यावसायिक प्रभाव उत्पन्न करने में सिद्ध।", "value": "वैश्विक स्तर पर स्केलेबल और सुदृढ़ FinTech एवं AI-संचालित उत्पादों का निर्माण।", "viewProjects": "प्रोजेक्ट्स देखें", "downloadResume": "रिज़्यूमे डाउनलोड करें (PDF)", "contact": "संपर्क करें" };
const sections$1 = { "about": "मेरे बारे में", "stats": "करियर उपलब्धियां", "experience": "अनुभव", "skills": "कौशल", "projects": "प्रोजेक्ट्स", "certifications": "प्रमाणन", "languages": "भाषाएं", "education": "शिक्षा", "contact": "मुझसे संपर्क करें" };
const stats$1 = { "yearsExperience": "वर्षों का अनुभव", "certifications": "प्रमाणन", "companies": "कंपनियां", "projectsDelivered": "सफलतापूर्वक पूर्ण प्रोजेक्ट्स" };
const skills$1 = { "all": "सभी", "cloudDevOps": "क्लाउड एवं DevOps", "frontend": "फ्रंटएंड", "backend": "बैकएंड", "aiMachineLearning": "AI एवं मशीन लर्निंग", "security": "सुरक्षा", "fintech": "FinTech", "professional": "व्यावसायिक कौशल", "toolsOthers": "टूल्स एवं अन्य तकनीकें" };
const projects$1 = { "viewProject": "प्रोजेक्ट देखें →" };
const certifications$1 = { "all": "सभी", "aws": "AWS", "security": "सुरक्षा", "aiMl": "AI / ML", "architecture": "आर्किटेक्चर", "newestFirst": "नवीनतम पहले", "oldestFirst": "पुराने पहले", "expires": "समाप्ति तिथि:" };
const languages$1 = { "title": "भाषाएं" };
const education$1 = { "in": "में" };
const quickLinks$1 = { "linkedIn": "LinkedIn ↗", "gitHub": "GitHub ↗", "aboutMe": "About.Me ↗", "awsCertified": "AWS प्रमाणित", "csm": "CSM®" };
const common$1 = { "years": "वर्ष" };
const contact$1 = { "name": "नाम", "email": "ईमेल", "subject": "विषय", "message": "संदेश", "submit": "संदेश भेजें", "success": "संदेश सफलतापूर्वक भेज दिया गया है। मैं शीघ्र ही आपसे संपर्क करूंगा।", "error": "संदेश भेजने में असमर्थ। कृपया पुनः प्रयास करें।", "captcha": "बॉट सुरक्षा सत्यापन विफल हुआ। कृपया पेज रिफ्रेश करके पुनः प्रयास करें।" };
const hi = {
  nav: nav$1,
  hero: hero$1,
  sections: sections$1,
  stats: stats$1,
  skills: skills$1,
  projects: projects$1,
  certifications: certifications$1,
  languages: languages$1,
  education: education$1,
  quickLinks: quickLinks$1,
  common: common$1,
  contact: contact$1
};
const nav = { "home": "ഹോം", "about": "എന്നെക്കുറിച്ച്", "stats": "പ്രധാന നേട്ടങ്ങൾ", "experience": "പരിചയം", "skills": "കഴിവുകൾ", "projects": "പ്രോജക്റ്റുകൾ", "certifications": "സർട്ടിഫിക്കേഷനുകൾ", "languages": "ഭാഷകൾ", "education": "വിദ്യാഭ്യാസം", "contact": "ബന്ധപ്പെടുക" };
const hero = { "eyebrow": "ദുബായ്, യു.എ.อീ.", "headline": "FinTech ക്ലൗഡ് സൊല്യൂഷൻ ആർകിടെക്റ്റും MERN സ്റ്റാക്ക് എഞ്ചിനീയറും ആയ ഞാൻ, സങ്കീർണ്ണമായ ബിസിനസ് ആവശ്യങ്ങൾക്കനുസരിച്ച് സുരക്ഷിതവും സ്കെയിലബിളുമായ എന്റർപ്രൈസ് പരിഹാരങ്ങൾ രൂപകൽപ്പനയും നടപ്പാക്കലും നടത്തുന്നു. സുരക്ഷയെ മുൻഗണന നൽകുന്ന ആർകിടെക്ചർ രൂപകൽപ്പന, വെൻഡർ മാനേജ്മെന്റ്, ക്രോസ്-ഫംഗ്ഷണൽ ടീമുകളുടെ നേതൃത്വത്തിൽ വിദഗ്ധൻ. മിഷൻ-ക്രിറ്റിക്കൽ പ്ലാറ്റ്ഫോമുകളുടെ ഘട്ടംഘട്ടമായ വിന്യാസത്തിനായി സ്ട്രാറ്റജിക് ടെക്നിക്കൽ റോഡ്മാപ്പുകൾ രൂപപ്പെടുത്തുകയും വിജയകരമായി നടപ്പിലാക്കുകയും ചെയ്യുന്നതിൽ പ്രാവീണ്യം.", "summary": "FinTech, വിമാനയാന പ്രവർത്തനങ്ങൾ, എന്റർപ്രൈസ് സിസ്റ്റങ്ങൾ എന്നിവയിൽ സുരക്ഷിതവും ക്ലൗഡ്-നേറ്റീവ് സംവിധാനങ്ങളുമായും AI-അധിഷ്ഠിത പ്ലാറ്റ്ഫോമുകളുമായും 13 വർഷത്തിലധികം പരിചയമുള്ള എഞ്ചിനീയറിംഗ് നേതാവ്. ഉയർന്ന പ്രകടനമുള്ള ടീമുകളെ വളർത്തുകയും, നിർണായക ഉൽപ്പന്നങ്ങൾ സൃഷ്ടിക്കുകയും, അളക്കാവുന്ന ബിസിനസ് ഫലങ്ങൾ കൈവരിക്കുകയും ചെയ്ത അനുഭവം.", "value": "ലോകതലത്തിൽ സ്കെയിൽ ചെയ്യാനാകുന്ന ശക്തമായ FinTech, AI അധിഷ്ഠിത ഉൽപ്പന്നങ്ങൾ നിർമ്മിക്കുന്നു.", "viewProjects": "പ്രോജക്റ്റുകൾ കാണുക", "downloadResume": "റിസ്യൂം ഡൗൺലോഡ് ചെയ്യുക (PDF)", "contact": "ബന്ധപ്പെടുക" };
const sections = { "about": "എന്നെക്കുറിച്ച്", "stats": "കരിയർ നേട്ടങ്ങൾ", "experience": "പരിചയം", "skills": "കഴിവുകൾ", "projects": "പ്രോജക്റ്റുകൾ", "certifications": "സർട്ടിഫിക്കേഷനുകൾ", "languages": "ഭാഷകൾ", "education": "വിദ്യാഭ്യാസം", "contact": "എന്നെ ബന്ധപ്പെടുക" };
const stats = { "yearsExperience": "പരിചയ വർഷങ്ങൾ", "certifications": "സർട്ടിഫിക്കേഷനുകൾ", "companies": "കമ്പനികൾ", "projectsDelivered": "വിജയകരമായി പൂർത്തിയാക്കിയ പ്രോജക്റ്റുകൾ" };
const skills = { "all": "എല്ലാം", "cloudDevOps": "ക്ലൗഡ് & DevOps", "frontend": "ഫ്രണ്ട്‌എൻഡ്", "backend": "ബാക്ക്‌എൻഡ്", "aiMachineLearning": "AI & മെഷീൻ ലേണിംഗ്", "security": "സുരക്ഷ", "fintech": "FinTech", "professional": "പ്രൊഫഷണൽ കഴിവുകൾ", "toolsOthers": "ടൂളുകളും മറ്റു സാങ്കേതികവിദ്യകളും" };
const projects = { "viewProject": "പ്രോജക്റ്റ് കാണുക →" };
const certifications = { "all": "എല്ലാം", "aws": "AWS", "security": "സുരക്ഷ", "aiMl": "AI / ML", "architecture": "ആർക്കിടെക്ചർ", "newestFirst": "പുതിയത് ആദ്യം", "oldestFirst": "പഴയത് ആദ്യം", "expires": "കാലാവധി അവസാനിക്കുന്നത്:" };
const languages = { "title": "ഭാഷകൾ" };
const education = { "in": "വിഭാഗം" };
const quickLinks = { "linkedIn": "LinkedIn ↗", "gitHub": "GitHub ↗", "aboutMe": "About.Me ↗", "awsCertified": "AWS സർട്ടിഫൈഡ്", "csm": "CSM®" };
const common = { "years": "വർഷങ്ങൾ" };
const contact = { "name": "പേര്", "email": "ഇമെയിൽ", "subject": "വിഷയം", "message": "സന്ദേശം", "submit": "സന്ദേശം അയയ്ക്കുക", "success": "സന്ദേശം വിജയകരമായി അയച്ചു. ഉടൻ തന്നെ നിങ്ങളുമായി ബന്ധപ്പെടും.", "error": "സന്ദേശം അയയ്ക്കാനായില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.", "captcha": "ബോട്ട് സുരക്ഷ പരിശോധന പരാജയപ്പെട്ടു. ദയവായി പേജ് റിഫ്രഷ് ചെയ്ത് വീണ്ടും ശ്രമിക്കുക." };
const ml = {
  nav,
  hero,
  sections,
  stats,
  skills,
  projects,
  certifications,
  languages,
  education,
  quickLinks,
  common,
  contact
};
const messages = { en, ar, es, fr, hi, ml };
function getMessages(locale) {
  return messages[locale];
}
const $$splitComponentImporter = () => import("./_locale-DlM1k4zc.js");
const Route$1 = createFileRoute("/$locale")({
  beforeLoad: async ({
    params
  }) => {
    const {
      locale
    } = params;
    if (locale === "api" || locale.startsWith("api")) {
      throw Object.assign(new Error("Not Found"), {
        _skipRouteMatch: true
      });
    }
    if (!isLocale(locale)) {
      throw new Error(` Invalid locale: ${locale}`);
    }
  },
  loader: async ({
    params
  }) => {
    const {
      locale
    } = params;
    return {
      locale,
      messages: getMessages(locale)
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route = createFileRoute("/")({
  loader: async () => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.split("-")[0];
      const supportedLangs = ["en", "ar", "es", "fr", "hi", "ml"];
      if (supportedLangs.includes(browserLang) && browserLang !== "en") {
        throw redirect({ to: "/$locale", params: { locale: browserLang } });
      }
    }
    throw redirect({ to: "/$locale", params: { locale: "en" } });
  }
});
const LocaleRoute = Route$1.update({
  id: "/$locale",
  path: "/$locale",
  getParentRoute: () => Route$2
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  LocaleRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter$1({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultNotFoundComponent: () => {
      return /* @__PURE__ */ jsxs("div", { style: { padding: "2rem", textAlign: "center" }, children: [
        /* @__PURE__ */ jsx("h1", { children: "404 - Not Found" }),
        /* @__PURE__ */ jsx("p", { children: "The page you're looking for doesn't exist." })
      ] });
    }
  });
  return router2;
}
function createRouter() {
  return getRouter();
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRouter,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  localeNames as l,
  router as r
};
