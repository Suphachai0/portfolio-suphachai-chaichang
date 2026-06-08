(function () {
  "use strict";

  const STORAGE_KEY = "portfolioLanguage";
  const DEFAULT_LANGUAGE = "en";
  const SUPPORTED_LANGUAGES = new Set(["en", "th"]);

  const textTranslations = {
    "Suphachai Chaichang | Portfolio": "Suphachai Chaichang | Portfolio",
    "Portfolio": "Portfolio",
    "Scroll": "Scroll",
    "Experience": "ประสบการณ์",
    "2 years": "2 ปี",
    "cutting data-entry errors by": "ลดข้อผิดพลาดจากการกรอกข้อมูลได้",
    "Fast audit design system": "Audit Design System ได้เร็วขึ้น",
    "I have 2 years of experience working as a UX/UI Designer, during which I developed strong analytical and problem-solving skills, especially in design. I excel in team environments and am driven to continuously learn and grow in my career.":
      "ผมมีประสบการณ์ทำงานด้าน UX/UI Design 2 ปี พัฒนาทักษะการวิเคราะห์และการแก้ปัญหา โดยเฉพาะงานออกแบบ ทำงานร่วมกับทีมได้ดี และพร้อมเรียนรู้เพื่อเติบโตในสายอาชีพอย่างต่อเนื่อง",
    "I am ready to collaborate with your team to produce outstanding and valuable work for your company.":
      "พร้อมร่วมงานกับทีมของคุณ เพื่อสร้างผลงานที่มีคุณค่าและตอบโจทย์ธุรกิจ",
    "Resume": "Resume",
    "Download Resume": "Download Resume",
    "Skill": "ทักษะ",
    "Conducting real user research, documenting insights, and summarizing key findings provides the team with a clear overview before design, which can reduce iteration cycles by up to":
      "ทำ user research กับผู้ใช้จริง บันทึก insight และสรุปประเด็นสำคัญให้ทีมเห็นภาพก่อนออกแบบ ช่วยลดรอบการแก้งานได้ถึง",
    "Usability Testing": "Usability Testing",
    "Information Architecture": "Information Architecture",
    "User Journey Mapping": "User Journey Mapping",
    "Accelerated UI component creation by": "เพิ่มความเร็วในการสร้าง UI components ได้",
    "through the use of Components, Auto-layout, Variables, Prototyping, and seamless Dev handoffs ready for immediate development.":
      "ด้วยการใช้ Components, Auto-layout, Variables, Prototyping และ Dev handoff ที่พร้อมสำหรับการพัฒนาต่อทันที",
    "Responsive Design": "Responsive Design",
    "Boosted overall work efficiency by": "เพิ่มประสิทธิภาพการทำงานโดยรวมได้",
    "by leveraging AI tools for ideation, copywriting, and research synthesis, while maintaining strong design judgment.":
      "ด้วยการใช้ AI tools สำหรับ ideation, copywriting และ research synthesis โดยยังคงใช้วิจารณญาณด้าน design อย่างรอบคอบ",
    "Collaboration": "Collaboration",
    "Delivered crystal-clear annotations and redlines to eliminate guesswork for developers. Implementing a strong design system approach improves delivery throughput by":
      "ทำ annotation และ redline ให้ชัดเจน เพื่อลดการคาดเดาของ developer และใช้แนวทาง Design System ที่แข็งแรง ช่วยเพิ่มความเร็วในการส่งมอบได้",
    "through reduced miscommunication.": "จากการลดความคลาดเคลื่อนในการสื่อสาร",
    "Certificates": "ประกาศนียบัตร",
    "View": "ดู",
    "Projects": "ผลงาน",
    "Let's build something great together.": "มาสร้างงานดี ๆ ด้วยกันครับ",
    "Home": "หน้าแรก",
    "Contact": "ติดต่อ",
    "Open menu": "เปิดเมนู",
    "Close menu": "ปิดเมนู",
    "Site navigation": "เมนูหลักของเว็บไซต์",
    "Site menu": "เมนูเว็บไซต์",
    "Close certificate preview": "ปิดตัวอย่าง certificate",
    "Project showcase": "รายการโปรเจกต์",
    "Skills prototype progress": "รายการทักษะ",
    "UX Research tags": "แท็ก UX Research",
    "UI Design tags": "แท็ก UI Design",
    "AI Tools and Workflow tags": "แท็ก AI Tools & Workflow",
    "Collaboration tags": "แท็ก Collaboration",
    "Language selector": "ตัวเลือกภาษา",

    "Project Overview": "ภาพรวมโปรเจกต์",
    "Timeline": "ระยะเวลา",
    "Role": "บทบาท",
    "Type": "ประเภท",
    "Color": "สี",
    "Problem": "ปัญหา",
    "Solution": "แนวทางแก้",
    "Design Process": "กระบวนการออกแบบ",
    "Discover": "Discover",
    "Define": "Define",
    "Test & Impact": "Test & Impact",
    "Impact and Statistics": "ผลลัพธ์และสถิติ",
    "Features": "ฟีเจอร์",
    "Project Outcomes": "ผลลัพธ์โปรเจกต์",
    "Next Project": "โปรเจกต์ถัดไป",
    "Previous Project": "โปรเจกต์ก่อนหน้า",
    "Project navigation": "การนำทางโปรเจกต์",
    "Project type": "ประเภทโปรเจกต์",
    "Project colors": "สีของโปรเจกต์",
    "Product mockup and problem solution": "Mockup และ Problem/Solution ของโปรเจกต์",
    "Design process steps": "ขั้นตอน Design Process",
    "Pink": "สีชมพู",
    "Blue": "สีน้ำเงิน",
    "Green": "สีเขียว",
    "Teal": "สีเขียวอมฟ้า",
    "Purple": "สีม่วง",

    "My Success Story | Suphachai Chaichang": "My Success Story | Suphachai Chaichang",
    "A web app that centralizes every student service - course registration, schedules, document requests, and tuition payments - all in one place, eliminating the need to queue at the university.":
      "WebApp ที่รวมบริการนักศึกษาหลักไว้ในที่เดียว ทั้งลงทะเบียนเรียน ตารางเรียน ขอเอกสาร และชำระค่าเทอม ช่วยลดขั้นตอนและไม่ต้องต่อคิวที่มหาวิทยาลัย",
    "Students struggle with fragmented and complex university systems, requiring multiple platforms for registration, payments, and document requests. Many processes are still manual, time-consuming, and require physical queuing.":
      "นักศึกษาต้องใช้งานหลายระบบที่ซับซ้อนและแยกส่วนกัน ทั้งลงทะเบียน ชำระเงิน และขอเอกสาร หลายขั้นตอนยังเป็น manual ทำให้เสียเวลาและต้องต่อคิวด้วยตัวเอง",
    "Redesigned the experience into a centralized, one-stop service web app. By streamlining the Information Architecture, My Success Story empowers students to easily handle course registration, online payments, and instant document downloads entirely through an intuitive self-service platform.":
      "ออกแบบประสบการณ์ใหม่ให้เป็น one-stop service web app โดยจัด Information Architecture ให้เป็นระบบ ช่วยให้นักศึกษาลงทะเบียนเรียน ชำระเงินออนไลน์ และดาวน์โหลดเอกสารได้เองอย่างง่ายในแพลตฟอร์มเดียว",
    "I researched student pain points and identified that scattered systems and long wait times were the biggest frustrations.":
      "ผมศึกษา pain point ของนักศึกษาและพบว่าระบบที่กระจัดกระจายกับเวลารอที่ยาวนานคือปัญหาหลัก",
    "I reorganized the complex data and created a unified user flow to bring all essential services into one easy-to-use platform.":
      "ผมจัดโครงสร้างข้อมูลที่ซับซ้อนใหม่ และสร้าง user flow ที่รวมบริการสำคัญไว้ในแพลตฟอร์มเดียวที่ใช้งานง่าย",
    "I designed a clean, intuitive UI focused on self-service, reducing clicks and allowing students to complete tasks instantly.":
      "ผมออกแบบ UI ที่สะอาดและเข้าใจง่าย โดยเน้น self-service ลดจำนวนคลิก และช่วยให้นักศึกษาทำงานสำเร็จได้ทันที",
    "I tested the prototype with real users to refine the experience, resulting in a system that measurably saves time and reduces physical queues.":
      "ผมทดสอบ prototype กับผู้ใช้จริงเพื่อปรับประสบการณ์ให้ดีขึ้น จนได้ระบบที่ช่วยประหยัดเวลาและลดการต่อคิวได้อย่างเห็นผล",
    "Saves time for students by combining registration and payments into one fast system.":
      "ช่วยประหยัดเวลานักศึกษาโดยรวมการลงทะเบียนและการชำระเงินไว้ในระบบเดียวที่ทำงานได้รวดเร็ว",
    "Reduces long queues at the office since students can request and download documents instantly.":
      "ลดคิวยาวที่สำนักงาน เพราะนักศึกษาสามารถขอและดาวน์โหลดเอกสารได้ทันที",
    "Zero Time": "Zero Time",
    "Makes university life easier for both students and staff by removing complicated manual steps.":
      "ทำให้ชีวิตในมหาวิทยาลัยง่ายขึ้นสำหรับทั้งนักศึกษาและเจ้าหน้าที่ ด้วยการลดขั้นตอน manual ที่ซับซ้อน",
    "Making university life easier at your fingertips.": "ทำให้ชีวิตมหาวิทยาลัยง่ายขึ้นเพียงปลายนิ้ว",
    "Academics": "Academics",
    "A seamless online registration system where you can easily check your class schedules.":
      "ระบบลงทะเบียนออนไลน์ที่ใช้งานต่อเนื่อง และตรวจสอบตารางเรียนได้ง่าย",
    "Payments": "Payments",
    "Convenient and secure online tuition fee payments.": "ชำระค่าเทอมออนไลน์ได้สะดวกและปลอดภัย",
    "Request essential documents in just a few steps and download them for immediate use.":
      "ขอเอกสารสำคัญได้ในไม่กี่ขั้นตอน และดาวน์โหลดไปใช้งานได้ทันที",
    "The main challenge with this project was dealing with a lot of complex data. My biggest learning was figuring out how to digest all that information and translate it into a really clean UI. In the end, it cut down the user journey significantly and noticeably improved the overall student experience.":
      "ความท้าทายหลักของโปรเจกต์นี้คือข้อมูลจำนวนมากและซับซ้อน สิ่งที่ผมได้เรียนรู้มากที่สุดคือการย่อยข้อมูลเหล่านั้นและแปลงออกมาเป็น UI ที่สะอาด เข้าใจง่าย สุดท้ายช่วยลด user journey ลงอย่างมากและยกระดับประสบการณ์นักศึกษาได้ชัดเจน",

    "My Success Maker | Suphachai Chaichang": "My Success Maker | Suphachai Chaichang",
    "My Success Maker is a platform designed to streamline and enhance academic management within universities. It provides a comprehensive set of features, including viewing academic calendars, scheduling classes and exams, announcing grades, and sharing important campus news in real time. The system also supports score recording and helps track students with outstanding payments, ensuring smooth and efficient operations for faculty and administrative staff.":
      "My Success Maker คือแพลตฟอร์มที่ออกแบบมาเพื่อทำให้การจัดการงานวิชาการในมหาวิทยาลัยเป็นระบบและมีประสิทธิภาพขึ้น ครอบคลุมการดู academic calendar การจัดตารางเรียนและสอบ การประกาศผลคะแนน และการสื่อสารข่าวสารภายในมหาวิทยาลัยแบบ real-time รวมถึงรองรับการบันทึกคะแนนและติดตามนักศึกษาที่มียอดค้างชำระ เพื่อให้การทำงานของอาจารย์และฝ่ายบริหารราบรื่นขึ้น",
    "Professors and staff waste time on redundant paperwork and disconnected systems to manage grades, documents, and student payment tracking, which slows down work and increases the risk of data errors.":
      "อาจารย์และเจ้าหน้าที่เสียเวลาไปกับเอกสารซ้ำซ้อนและระบบที่ไม่เชื่อมต่อกันในการจัดการคะแนน เอกสาร และการติดตามการชำระเงินของนักศึกษา ทำให้งานช้าลงและเพิ่มความเสี่ยงของ data errors",
    "I designed a centralized platform that unifies academic, HR, and document management into one place. This transforms manual tasks into automated processes, making daily operations fast and secure.":
      "ผมออกแบบแพลตฟอร์มกลางที่รวมงานวิชาการ HR และ document management ไว้ในที่เดียว เปลี่ยนงาน manual ให้เป็นกระบวนการอัตโนมัติ ช่วยให้การทำงานประจำวันรวดเร็วและปลอดภัยขึ้น",
    "I researched the daily workflows of professors and staff, discovering that their main pain point was wasting hours on repetitive paperwork and disconnected systems.":
      "ผมศึกษา workflow ประจำวันของอาจารย์และเจ้าหน้าที่ และพบว่า pain point หลักคือการเสียเวลาหลายชั่วโมงกับเอกสารซ้ำ ๆ และระบบที่ไม่เชื่อมต่อกัน",
    "I designed a centralized system to seamlessly connect document management, report generation, and student grading, ensuring all data flows smoothly together.":
      "ผมออกแบบระบบกลางที่เชื่อม document management, report generation และ student grading ให้ไหลต่อกันอย่างราบรื่น",
    "I designed a clean, highly intuitive UI focused on minimizing complex steps, empowering staff to manage schedules, track attendance, and handle student payment tracking all in one platform.":
      "ผมออกแบบ UI ที่สะอาดและเข้าใจง่าย เพื่อลดขั้นตอนซับซ้อน ช่วยให้เจ้าหน้าที่จัดการตาราง ติดตาม attendance และจัดการการติดตามการชำระเงินของนักศึกษาได้ในแพลตฟอร์มเดียว",
    "I tested the prototype with actual users to refine the experience. The final result is a system that drastically cuts down manual workloads and saves significant time for university personnel.":
      "ผมทดสอบ prototype กับผู้ใช้จริงเพื่อปรับประสบการณ์ให้ดีขึ้น ผลลัพธ์คือระบบที่ลดภาระงาน manual ได้มาก และช่วยประหยัดเวลาให้บุคลากรของมหาวิทยาลัย",
    "Reduced teachers' time spent on attendance and grading.": "ลดเวลาที่อาจารย์ใช้กับ attendance และ grading",
    "Cut physical paperwork for professor workflows.": "ลดงานเอกสารของอาจารย์ใน workflow หลัก",
    "Combined all tools into one app, reducing data management errors for staff.":
      "รวมเครื่องมือทั้งหมดไว้ในแอปเดียว ช่วยลดข้อผิดพลาดในการจัดการข้อมูลของเจ้าหน้าที่",
    "Manage everything from a centralized system.": "จัดการทุกอย่างผ่านระบบกลาง",
    "Store essential documents and data on a highly secure cloud infrastructure.":
      "จัดเก็บเอกสารและข้อมูลสำคัญบน cloud infrastructure ที่ปลอดภัย",
    "Announcements": "Announcements",
    "A centralized system for broadcasting university news and updates efficiently.":
      "ระบบกลางสำหรับประกาศข่าวสารและอัปเดตของมหาวิทยาลัยได้อย่างมีประสิทธิภาพ",
    "An all-in-one solution for scheduling classes and exams, tracking attendance, and recording grades.":
      "โซลูชัน all-in-one สำหรับจัดตารางเรียนและสอบ ติดตาม attendance และบันทึกคะแนน",
    "Payments Management": "Payments Management",
    "Real-time tracking of student payments.": "ติดตามการชำระเงินของนักศึกษาแบบ real-time",
    "The main challenge was the complexity of the system itself - it required extensive consultation and discussion with stakeholders to fully understand how everything worked. That deep-dive process was essential to translating complex administrative workflows into a clean, intuitive UI that genuinely solved the challenges faced by university faculty and staff, significantly reducing their workload and improving day-to-day operations.":
      "ความท้าทายหลักคือความซับซ้อนของระบบ ต้องพูดคุยและทำความเข้าใจกับ stakeholders หลายรอบเพื่อเห็นภาพการทำงานจริง กระบวนการ deep-dive นี้สำคัญมากในการแปลง workflow งานบริหารที่ซับซ้อนให้เป็น UI ที่สะอาด ใช้งานง่าย และแก้ปัญหาให้คณาจารย์กับเจ้าหน้าที่ได้จริง",

    "Ace Student | Suphachai Chaichang": "Ace Student | Suphachai Chaichang",
    "Ace Student is a school platform that brings together all core academic functions, including course registration, class schedules, exam timetables, grade announcements, and school news updates. It also expands its capabilities to support student health and development with features such as recording health information and allergies, tracking young children's growth through weight and height records, generating official documents automatically, and providing a system for purchasing extra courses to make supplementary learning easier for both parents and students.":
      "Ace Student คือแพลตฟอร์มสำหรับโรงเรียนที่รวมฟังก์ชันวิชาการหลักไว้ในที่เดียว ทั้งลงทะเบียนเรียน ตารางเรียน ตารางสอบ ประกาศผลการเรียน และข่าวสารโรงเรียน รวมถึงรองรับข้อมูลสุขภาพและพัฒนาการของนักเรียน เช่น บันทึกข้อมูลสุขภาพและการแพ้ ติดตามการเติบโตของเด็กเล็กจากน้ำหนักและส่วนสูง สร้างเอกสารอัตโนมัติ และซื้อคอร์สเสริมเพื่อให้การเรียนเพิ่มเติมง่ายขึ้นสำหรับทั้งผู้ปกครองและนักเรียน",
    "Parents often miss important school updates and lack real-time visibility into their child's academic progress and health, causing worry and delayed communication.":
      "ผู้ปกครองมักพลาดข่าวสารสำคัญจากโรงเรียน และไม่เห็นความคืบหน้าด้านการเรียนหรือสุขภาพของลูกแบบ real-time ทำให้เกิดความกังวลและการสื่อสารล่าช้า",
    "I designed an application that bridges the gap between parents and the school, allowing them to track academic progress, receive instant health alerts, and view announcements in real time.":
      "ผมออกแบบแอปที่เชื่อมผู้ปกครองกับโรงเรียน ให้ติดตามผลการเรียน รับ health alerts ทันที และดูประกาศแบบ real-time ได้",
    "I talked to parents and found their main pain point was anxiety, feeling disconnected from their child's school life and missing important updates.":
      "ผมพูดคุยกับผู้ปกครองและพบว่า pain point หลักคือความกังวลจากการรู้สึกห่างจากชีวิตในโรงเรียนของลูกและพลาดข่าวสารสำคัญ",
    "I structured the app to be a central communication hub, prioritizing the most critical information on the home screen, such as emergency health alerts, grades, and pick-up schedules.":
      "ผมจัดโครงสร้างแอปให้เป็น communication hub โดยให้ข้อมูลสำคัญที่สุดอยู่บนหน้า home เช่น emergency health alerts, grades และ pick-up schedules",
    "I designed a warm, trustworthy, and highly intuitive UI, ensuring that parents of all ages could quickly access information and track their child's success right at their fingertips.":
      "ผมออกแบบ UI ให้รู้สึกอบอุ่น น่าเชื่อถือ และใช้งานง่าย เพื่อให้ผู้ปกครองทุกช่วงวัยเข้าถึงข้อมูลและติดตามพัฒนาการกับผลการเรียนของลูกได้ทันที",
    "I tested the prototype with actual parents to simplify complex flows. The result is an app that significantly reduces parental anxiety and makes school communication fast and effortless.":
      "ผมทดสอบ prototype กับผู้ปกครองจริงเพื่อลดความซับซ้อนของ flow ผลลัพธ์คือแอปที่ช่วยลดความกังวลของผู้ปกครองและทำให้การสื่อสารกับโรงเรียนรวดเร็วขึ้น",
    "Speed of how fast parents receive important school announcements.":
      "เพิ่มความเร็วในการรับประกาศสำคัญจากโรงเรียนของผู้ปกครอง",
    "Boosted parent engagement in tracking their child's academic progress.":
      "เพิ่ม engagement ของผู้ปกครองในการติดตามผลการเรียนของลูก",
    "1 minute": "1 นาที",
    "Reduced emergency and health notification time to parents down to just one minute.":
      "ลดเวลาการแจ้งเตือนเหตุฉุกเฉินและสุขภาพไปยังผู้ปกครองเหลือเพียง 1 นาที",
    "Stay connected to your child's success in real-time.": "ติดตามพัฒนาการและผลการเรียนของลูกแบบ real-time",
    "Academic Tracking": "Academic Tracking",
    "Monitor your child's academic performance and progress in real-time.":
      "ติดตามผลการเรียนและความก้าวหน้าของลูกแบบ real-time",
    "Health & Safety": "Health & Safety",
    "Receive instant alerts in case of illness or accidents at school.":
      "รับแจ้งเตือนทันทีเมื่อเกิดอาการป่วยหรืออุบัติเหตุที่โรงเรียน",
    "News & Notifications": "News & Notifications",
    "Stay updated with school announcements and get timely pick-up reminders.":
      "รับข่าวสารโรงเรียนและ pick-up reminders ได้ตรงเวลา",
    "Skill Development": "Skill Development",
    "Discover specialized extracurricular courses tailored to enhance your child's unique potential.":
      "ค้นหาคอร์สเสริมเฉพาะทางที่ช่วยพัฒนาศักยภาพเฉพาะตัวของลูก",
    "The main challenge was not only understanding the complex workflows of school faculty and staff, but also analyzing the needs of parents as a secondary user group. Balancing these two perspectives required extensive consultation with both stakeholders to find the right middle ground, ensuring the system worked seamlessly for everyone involved and delivered a complete, cohesive experience.":
      "ความท้าทายหลักไม่ใช่แค่การเข้าใจ workflow ที่ซับซ้อนของครูและเจ้าหน้าที่โรงเรียน แต่ยังต้องวิเคราะห์ความต้องการของผู้ปกครองในฐานะ secondary user group การบาลานซ์สองมุมมองนี้ต้องพูดคุยกับ stakeholders ทั้งสองฝั่งเพื่อหาจุดที่เหมาะสม ทำให้ระบบใช้งานได้ราบรื่นสำหรับทุกคน",

    "Ace Teacher | Suphachai Chaichang": "Ace Teacher | Suphachai Chaichang",
    "Ace Teacher is a system designed specifically to support teachers by bringing together all essential classroom and student management functions in one platform. Teachers can organize class schedules, record grades, evaluate student performance, monitor progress, and share announcements with both students and parents conveniently.":
      "Ace Teacher คือระบบที่ออกแบบมาเพื่อช่วยครูโดยเฉพาะ รวมเครื่องมือจัดการห้องเรียนและนักเรียนไว้ในแพลตฟอร์มเดียว ครูสามารถจัดตารางเรียน บันทึกคะแนน ประเมินผล ติดตามพัฒนาการ และส่งประกาศถึงนักเรียนกับผู้ปกครองได้สะดวก",
    "Teachers spend too much time every day on manual paperwork, such as tracking attendance, grading, and logging health records, leaving them with less time to focus on student development.":
      "ครูใช้เวลามากเกินไปกับงานเอกสาร manual ในแต่ละวัน เช่น attendance, grading และ health records ทำให้เหลือเวลาน้อยลงสำหรับการพัฒนานักเรียน",
    "I designed a centralized platform that digitizes classroom management. It automates paperwork, allowing teachers to quickly track attendance, manage grades, and monitor student health efficiently.":
      "ผมออกแบบแพลตฟอร์มกลางที่เปลี่ยนการจัดการห้องเรียนให้เป็น digital และช่วย automate งานเอกสาร ให้ครูติดตาม attendance จัดการ grades และดูข้อมูลสุขภาพนักเรียนได้รวดเร็ว",
    "I spoke with teachers and found their biggest struggle was losing daily time to minor admin tasks, like manual attendance, grading, and paper-based health logs.":
      "ผมพูดคุยกับครูและพบว่าปัญหาใหญ่คือการเสียเวลาในแต่ละวันกับงาน admin เล็ก ๆ เช่น manual attendance, grading และ paper-based health logs",
    "I structured a centralized system to bring all classroom management tools into one place, transforming manual workflows into a streamlined digital process.":
      "ผมจัดโครงสร้างระบบกลางที่รวมเครื่องมือจัดการห้องเรียนไว้ในที่เดียว เปลี่ยน workflow manual ให้เป็นกระบวนการ digital ที่ลื่นไหล",
    "I designed a fast and intuitive UI focused on reducing clicks, allowing teachers to take attendance, input grades, or update student health records in just a few seconds.":
      "ผมออกแบบ UI ที่เร็วและเข้าใจง่าย โดยเน้นลดจำนวนคลิก ให้ครูเช็ก attendance กรอก grades หรืออัปเดต health records ได้ในไม่กี่วินาที",
    "I tested the prototype with actual teachers to eliminate any complex steps. The result is an app that cuts down paperwork and gives teachers their time back to focus on their students.":
      "ผมทดสอบ prototype กับครูจริงเพื่อตัดขั้นตอนซับซ้อน ผลลัพธ์คือแอปที่ลดงานเอกสารและคืนเวลาให้ครูโฟกัสกับนักเรียนได้มากขึ้น",
    "Cut daily time spent on paperwork and attendance.": "ลดเวลาที่ใช้กับ paperwork และ attendance ในแต่ละวัน",
    "Managing grades and data in one app reduced paper-based errors.":
      "การจัดการ grades และข้อมูลในแอปเดียวช่วยลด paper-based errors",
    "Speed up health logging and notifications, allowing teachers to finish tasks in under a minute.":
      "เพิ่มความเร็วในการบันทึกสุขภาพและส่ง notification ให้ครูทำงานจบได้ในไม่ถึง 1 นาที",
    "Managing your students effectively.": "จัดการนักเรียนได้อย่างมีประสิทธิภาพ",
    "An all-in-one system for taking attendance, logging activities, recording grades, and organizing academic schedules.":
      "ระบบ all-in-one สำหรับเช็ก attendance, logging activities, recording grades และจัดตารางวิชาการ",
    "Health Tracking": "Health Tracking",
    "Securely record and monitor students' well-being and medical profiles for proactive care.":
      "บันทึกและติดตามสุขภาพกับ medical profiles ของนักเรียนอย่างปลอดภัย เพื่อดูแลเชิงรุก",
    "Communication Hub": "Communication Hub",
    "A centralized system for efficiently managing and distributing essential school news and announcements.":
      "ระบบกลางสำหรับจัดการและกระจายข่าวสารสำคัญของโรงเรียนได้อย่างมีประสิทธิภาพ",

    "Linda Exchange | Suphachai Chaichang": "Linda Exchange | Suphachai Chaichang",
    "Linda Exchange is a comprehensive system designed to streamline foreign currency exchange businesses. It enables users to record and track daily buy-sell transactions with clear reports, while the Profit & Loss Dashboard provides real-time insights into overall business performance. The platform also includes an income and expense tracking feature, ensuring effective financial management and decision-making.":
      "Linda Exchange คือระบบสำหรับธุรกิจแลกเปลี่ยนเงินตราต่างประเทศ ช่วยให้ผู้ใช้บันทึกและติดตามธุรกรรมซื้อขายรายวันพร้อมรายงานที่ชัดเจน มี Profit & Loss Dashboard สำหรับดู performance ของธุรกิจแบบ real-time และมีฟีเจอร์ติดตามรายรับรายจ่ายเพื่อช่วยการบริหารการเงินและการตัดสินใจ",
    "Tracking constantly fluctuating foreign exchange rates is complicated. Both customers and staff waste time checking rates and manually recording transactions, which is prone to error and hard to track later.":
      "การติดตามอัตราแลกเปลี่ยนที่เปลี่ยนตลอดเวลามีความซับซ้อน ทั้งลูกค้าและพนักงานเสียเวลาเช็ก rate และบันทึกธุรกรรมด้วยมือ ซึ่งเสี่ยงต่อความผิดพลาดและตรวจย้อนหลังยาก",
    "I designed a currency exchange platform featuring real-time rates and clear transaction tracking. It enables users to check rates, exchange money, and review their history effortlessly in a single screen.":
      "ผมออกแบบแพลตฟอร์มแลกเปลี่ยนเงินที่มี real-time rates และ transaction tracking ที่ชัดเจน ให้ผู้ใช้เช็ก rate แลกเงิน และดูประวัติได้ง่ายในหน้าจอเดียว",
    "I researched the behavior of users and staff, discovering that the main pain points were tracking constantly fluctuating rates and manual transaction logging that often led to errors.":
      "ผมศึกษาพฤติกรรมของผู้ใช้และพนักงาน พบว่า pain point หลักคือการติดตาม rate ที่เปลี่ยนตลอดเวลาและการบันทึกธุรกรรมแบบ manual ที่มักเกิด error",
    "I structured the system to prioritize real-time data display and organized the transaction history to be easily trackable, ensuring transparency and trust.":
      "ผมจัดโครงสร้างระบบให้เน้น real-time data display และจัด transaction history ให้ติดตามง่าย เพื่อสร้างความโปร่งใสและความน่าเชื่อถือ",
    "I designed a clean UI focused on making numbers highly legible. I created a dashboard where users can instantly check rates, calculate conversions, and view their history without switching screens.":
      "ผมออกแบบ UI ที่สะอาดและให้ตัวเลขอ่านง่าย สร้าง dashboard ที่ผู้ใช้เช็ก rate คำนวณเงิน และดูประวัติได้ทันทีโดยไม่ต้องสลับหลายหน้าจอ",
    "I tested the design through simulated transactions. The result is a platform that speeds up the exchange process, reduces calculation errors, and empowers users to make confident decisions.":
      "ผมทดสอบ design ด้วย transaction simulation ผลลัพธ์คือแพลตฟอร์มที่ทำให้ขั้นตอนแลกเงินเร็วขึ้น ลด calculation errors และช่วยให้ผู้ใช้ตัดสินใจได้มั่นใจ",
    "Sped up rate checking and the overall currency exchange process.":
      "เพิ่มความเร็วในการเช็ก rate และกระบวนการแลกเงินโดยรวม",
    "Automated calculations and logging dropped manual errors down to 0%.":
      "Automated calculations และ logging ช่วยลด manual errors เหลือ 0%",
    "Made transaction history tracking faster, greatly boosting user confidence.":
      "ทำให้การติดตาม transaction history เร็วขึ้น และเพิ่มความมั่นใจให้ผู้ใช้อย่างมาก",
    "Real-time Rates Dashboard": "Real-time Rates Dashboard",
    "Live currency rate updates with clear, easy-to-read numbers.":
      "อัปเดต currency rate แบบ live พร้อมตัวเลขที่อ่านง่าย",
    "Smart Currency Calculator": "Smart Currency Calculator",
    "Instantly calculates money conversions using current rates.":
      "คำนวณการแลกเงินทันทีด้วย rate ปัจจุบัน",
    "Seamless Transaction Tracking": "Seamless Transaction Tracking",
    "Automatically logs all exchanges so users can easily check their history.":
      "บันทึกการแลกเงินทั้งหมดอัตโนมัติ เพื่อให้ผู้ใช้ตรวจประวัติได้ง่าย",
    "Manage every exchange with clarity.": "จัดการทุกการแลกเปลี่ยนได้อย่างชัดเจน",
    "The Linda Exchange project improved my skills in designing for real-time data, making fast-changing numbers easy to read. I learned to prevent human error by integrating automated calculations, and discovered how to build trust in FinTech by making transaction histories transparent and easily trackable for users.":
      "โปรเจกต์ Linda Exchange ช่วยพัฒนาทักษะการออกแบบสำหรับ real-time data และการทำให้ตัวเลขที่เปลี่ยนเร็วอ่านง่าย ผมได้เรียนรู้การลด human error ด้วย automated calculations และการสร้างความน่าเชื่อถือใน FinTech ผ่าน transaction histories ที่โปร่งใสและติดตามง่าย",

    "Business Management ERP System | Suphachai Chaichang": "Business Management ERP System | Suphachai Chaichang",
    "Business Management": "Business Management",
    "ERP System": "ERP System",
    "A comprehensive Enterprise Resource Planning platform designed for organizational transparency and efficiency.":
      "แพลตฟอร์ม Enterprise Resource Planning ที่ออกแบบเพื่อเพิ่มความโปร่งใสและประสิทธิภาพขององค์กร",
    "Most businesses struggle with scattered data across multiple departments like sales, accounting, and inventory. This causes redundant work, slow reporting, and frequent manual errors.":
      "ธุรกิจจำนวนมากมีปัญหาข้อมูลกระจัดกระจายอยู่หลายแผนก เช่น sales, accounting และ inventory ทำให้เกิดงานซ้ำ รายงานล่าช้า และ manual errors บ่อยครั้ง",
    "I designed a centralized ERP system that seamlessly connects all departments. It automates repetitive tasks, providing teams and management with accurate, real-time data insights.":
      "ผมออกแบบ ERP System กลางที่เชื่อมทุกแผนกเข้าด้วยกันอย่างลื่นไหล ช่วย automate งานซ้ำ และให้ทีมกับ management เห็น insight แบบ real-time ที่แม่นยำ",
    "I studied the workflows of various departments (sales, accounting, warehouse) and found the main pain point was scattered data across different systems, causing redundant work and delayed reporting.":
      "ผมศึกษา workflow ของหลายแผนก เช่น sales, accounting และ warehouse พบว่า pain point หลักคือข้อมูลกระจัดกระจายในหลายระบบ ทำให้เกิดงานซ้ำและรายงานล่าช้า",
    "I designed a centralized system architecture to connect all departments, ensuring smooth automated workflows. For instance, when a sale is made, the system instantly updates inventory and accounting.":
      "ผมออกแบบ system architecture กลางเพื่อเชื่อมทุกแผนก ทำให้ automated workflows ลื่นไหล เช่น เมื่อเกิดการขาย ระบบจะอัปเดต inventory และ accounting ทันที",
    "I designed a clean UI with clear navigation. I built an intuitive dashboard for management to easily view insights, and simplified data entry screens for staff to minimize manual typing.":
      "ผมออกแบบ UI ที่สะอาด มี navigation ชัดเจน สร้าง dashboard ที่ management ดู insight ได้ง่าย และทำหน้ากรอกข้อมูลให้เรียบง่ายเพื่อลด manual typing ของ staff",
    "I tested the system with employees from different departments to eliminate usability friction. The final result is an ERP system that removes redundant tasks, eliminates document errors, and provides the company with real-time data visibility.":
      "ผมทดสอบระบบกับพนักงานจากหลายแผนกเพื่อลด usability friction ผลลัพธ์คือ ERP System ที่ลดงานซ้ำ ลด document errors และทำให้องค์กรเห็นข้อมูลแบบ real-time",
    "Reduced the time employees spend on redundant data entry across departments.":
      "ลดเวลาที่พนักงานใช้กับการกรอกข้อมูลซ้ำระหว่างแผนก",
    "Automated data syncing decreased manual paperwork and inventory errors.":
      "การซิงก์ข้อมูลอัตโนมัติช่วยลดงานเอกสารและข้อผิดพลาดด้านคลังสินค้า",
    "5 minutes": "5 นาที",
    "Cut management report generation time from several days down to just 5 minutes.":
      "ลดเวลาการสร้างรายงานสำหรับผู้บริหารจากหลายวันเหลือเพียง 5 นาที",
    "Managing your business effectively.": "จัดการธุรกิจได้อย่างมีประสิทธิภาพ",
    "Real-time Dashboard": "Real-time Dashboard",
    "Displays live sales, accounting, and inventory data for instant management decisions.":
      "แสดงข้อมูล sales, accounting และ inventory แบบ live เพื่อช่วยการตัดสินใจของ management ทันที",
    "Automated Workflow": "Automated Workflow",
    "Connects departments automatically (e.g., a new sale instantly updates inventory), ending repetitive data entry.":
      "เชื่อมแผนกต่าง ๆ อัตโนมัติ เช่น เมื่อมีการขาย ระบบจะอัปเดต inventory ทันที ช่วยลดการกรอกข้อมูลซ้ำ",
    "Centralized Tracking": "Centralized Tracking",
    "Stores all documents and history in one secure place for quick searching and zero data loss.":
      "เก็บเอกสารและประวัติทั้งหมดไว้ในที่เดียวที่ปลอดภัย ค้นหาได้เร็วและลดโอกาสข้อมูลสูญหาย",
    "Designing this ERP system strengthened my ability to handle complex, cross-departmental workflows. I learned to reduce cognitive load by turning complicated processes into intuitive UIs for staff and clear data visualizations for management. Ultimately, it taught me that successful enterprise design is about structuring a seamlessly connected system that eliminates redundant tasks, prevents errors, and drives real business impact.":
      "การออกแบบ ERP System นี้ช่วยพัฒนาความสามารถของผมในการจัดการ workflow ที่ซับซ้อนข้ามหลายแผนก ผมได้เรียนรู้การลด cognitive load ด้วยการเปลี่ยนกระบวนการซับซ้อนให้เป็น UI ที่เข้าใจง่ายสำหรับ staff และ data visualization ที่ชัดเจนสำหรับ management สุดท้ายทำให้เข้าใจว่า enterprise design ที่ดีคือการสร้างระบบที่เชื่อมต่อกันอย่างราบรื่น ลดงานซ้ำ ป้องกัน error และสร้างผลลัพธ์ทางธุรกิจจริง",

    "View My Success Story project": "ดูโปรเจกต์ My Success Story",
    "View My Success Maker project": "ดูโปรเจกต์ My Success Maker",
    "View Ace Student project": "ดูโปรเจกต์ Ace Student",
    "View Ace Teacher project": "ดูโปรเจกต์ Ace Teacher",
    "View Linda Exchange project": "ดูโปรเจกต์ Linda Exchange",
    "View Business Management ERP System project": "ดูโปรเจกต์ Business Management ERP System",
    "My Success Story project": "โปรเจกต์ My Success Story",
    "My Success Maker project": "โปรเจกต์ My Success Maker",
    "Ace Student project": "โปรเจกต์ Ace Student",
    "Ace Teacher project": "โปรเจกต์ Ace Teacher",
    "Linda Exchange project": "โปรเจกต์ Linda Exchange",
    "Business Management ERP System project": "โปรเจกต์ Business Management ERP System",
    "My Success Story sign in screen displayed on a phone": "หน้าจอเข้าสู่ระบบ My Success Story บนโทรศัพท์",
    "Two mobile screens showing My Success Story features": "สองหน้าจอมือถือที่แสดงฟีเจอร์ของ My Success Story",
    "My Success Story project presentation photo": "ภาพ presentation ของโปรเจกต์ My Success Story",
    "My Success Maker dashboard displayed on a laptop": "Dashboard ของ My Success Maker บน laptop",
    "Two mobile screens showing My Success Maker calendar and teaching schedule features":
      "สองหน้าจอมือถือที่แสดง calendar และ teaching schedule ของ My Success Maker",
    "My Success Maker stakeholder testing photo": "ภาพ stakeholder testing ของ My Success Maker",
    "Ace Student login and home screens displayed on two phones": "หน้าจอ login และ home ของ Ace Student บนโทรศัพท์สองเครื่อง",
    "Two Ace Student mobile screens showing login and home features": "สองหน้าจอมือถือของ Ace Student ที่แสดง login และ home",
    "Ace Student stakeholder testing photo": "ภาพ stakeholder testing ของ Ace Student",
    "Ace Teacher login screen displayed on a phone": "หน้าจอ login ของ Ace Teacher บนโทรศัพท์",
    "Two Ace Teacher mobile screens showing login and teaching schedule features":
      "สองหน้าจอมือถือของ Ace Teacher ที่แสดง login และ teaching schedule",
    "Ace Teacher stakeholder testing photo": "ภาพ stakeholder testing ของ Ace Teacher",
    "Two Linda Exchange mobile screens showing exchange history and rates":
      "สองหน้าจอมือถือของ Linda Exchange ที่แสดง exchange history และ rates",
    "Business Management ERP System laptop dashboard mockup": "Mockup dashboard บน laptop ของ Business Management ERP System",
    "Two Business Management ERP System mobile screens showing dashboard and reports":
      "สองหน้าจอมือถือของ Business Management ERP System ที่แสดง dashboard และ reports",
    "Business Management ERP System project presentation meeting": "ภาพ meeting presentation ของ Business Management ERP System"
  };

  const textNodeOriginals = new WeakMap();
  const attrOriginals = new WeakMap();
  const titleOriginals = new WeakMap();
  const translatableAttributes = ["aria-label", "alt", "title", "data-certificate-title"];

  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function getStoredLanguage() {
    try {
      const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

      if (SUPPORTED_LANGUAGES.has(storedLanguage)) {
        return storedLanguage;
      }
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }

    return DEFAULT_LANGUAGE;
  }

  function setStoredLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Ignore storage failures so language switching still works for the current page.
    }
  }

  function translateText(text, language = getStoredLanguage()) {
    if (language === "en") {
      return text;
    }

    return textTranslations[normalize(text)] || text;
  }

  function preserveWhitespace(originalText, translatedText) {
    const leadingWhitespace = originalText.match(/^\s*/)[0];
    const trailingWhitespace = originalText.match(/\s*$/)[0];

    return `${leadingWhitespace}${translatedText}${trailingWhitespace}`;
  }

  function translateTextNode(textNode, language) {
    if (!textNodeOriginals.has(textNode)) {
      textNodeOriginals.set(textNode, textNode.nodeValue);
    }

    const originalText = textNodeOriginals.get(textNode);
    const key = normalize(originalText);

    if (!key || key.length === 1 || !/[A-Za-zก-๙]/.test(key)) {
      textNode.nodeValue = originalText;
      return;
    }

    const translatedText = language === "en" ? key : textTranslations[key];

    if (translatedText) {
      textNode.nodeValue = preserveWhitespace(originalText, translatedText);
    } else {
      textNode.nodeValue = originalText;
    }
  }

  function getElementAttributeOriginals(element) {
    if (!attrOriginals.has(element)) {
      attrOriginals.set(element, {});
    }

    return attrOriginals.get(element);
  }

  function translateAttributes(element, language) {
    const originals = getElementAttributeOriginals(element);

    translatableAttributes.forEach((attributeName) => {
      if (!element.hasAttribute(attributeName)) {
        return;
      }

      if (!Object.prototype.hasOwnProperty.call(originals, attributeName)) {
        originals[attributeName] = element.getAttribute(attributeName);
      }

      const originalValue = originals[attributeName];
      const translatedValue = language === "en" ? originalValue : textTranslations[normalize(originalValue)];

      element.setAttribute(attributeName, translatedValue || originalValue);
    });
  }

  function translateDataHooks(language) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      element.textContent = language === "en" ? key : textTranslations[key] || key;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.getAttribute("data-i18n-html");
      element.innerHTML = language === "en" ? key : textTranslations[key] || key;
    });

    translatableAttributes.forEach((attributeName) => {
      const hookName = `data-i18n-${attributeName}`;
      document.querySelectorAll(`[${hookName}]`).forEach((element) => {
        const key = element.getAttribute(hookName);
        const translatedValue = language === "en" ? key : textTranslations[key] || key;
        element.setAttribute(attributeName, translatedValue);
      });
    });
  }

  function translateStaticDom(language) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(textNode) {
        const parentElement = textNode.parentElement;

        if (!parentElement || ["SCRIPT", "STYLE", "TEMPLATE", "NOSCRIPT"].includes(parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((textNode) => translateTextNode(textNode, language));
    document.querySelectorAll("*").forEach((element) => translateAttributes(element, language));
  }

  function translateDocumentTitle(language) {
    if (!titleOriginals.has(document)) {
      titleOriginals.set(document, document.title);
    }

    const originalTitle = titleOriginals.get(document);
    document.title = language === "en" ? originalTitle : textTranslations[normalize(originalTitle)] || originalTitle;
  }

  function updateLanguageControls(language) {
    document.querySelectorAll("[data-language]").forEach((button) => {
      const isActive = button.getAttribute("data-language") === language;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function captureScrollState() {
    const isMenuOpen =
      document.documentElement.classList.contains("is-menu-open") || document.body.classList.contains("is-menu-open");

    return {
      isMenuOpen,
      scrollY: window.scrollY,
    };
  }

  function restoreScrollState(scrollState) {
    if (scrollState.isMenuOpen) {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"));
      });
      return;
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollState.scrollY, behavior: "auto" });

      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"));
      });
    });
  }

  function applyLanguage(language = getStoredLanguage(), options = {}) {
    const safeLanguage = SUPPORTED_LANGUAGES.has(language) ? language : DEFAULT_LANGUAGE;
    const scrollState = options.scrollState;

    document.documentElement.lang = safeLanguage;
    translateDataHooks(safeLanguage);
    translateStaticDom(safeLanguage);
    translateDocumentTitle(safeLanguage);
    updateLanguageControls(safeLanguage);
    window.dispatchEvent(
      new CustomEvent("portfolio-language-change", {
        detail: {
          language: safeLanguage,
          isMenuOpen: Boolean(scrollState?.isMenuOpen),
          scrollY: Number.isFinite(scrollState?.scrollY) ? scrollState.scrollY : window.scrollY,
        },
      })
    );
  }

  function setLanguage(language) {
    const safeLanguage = SUPPORTED_LANGUAGES.has(language) ? language : DEFAULT_LANGUAGE;
    const scrollState = captureScrollState();

    setStoredLanguage(safeLanguage);
    applyLanguage(safeLanguage, { scrollState });
    restoreScrollState(scrollState);
  }

  function initLanguageSwitcher() {
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.getAttribute("data-language")));
    });

    applyLanguage(getStoredLanguage());
  }

  window.portfolioI18n = {
    applyLanguage,
    setLanguage,
    getLanguage: getStoredLanguage,
    t: translateText,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }
})();
