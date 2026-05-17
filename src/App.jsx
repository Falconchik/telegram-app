import { useEffect, useRef, useState } from "react"
import html2pdf from "html2pdf.js"
import { motion } from "framer-motion"

import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaTools,
  FaLanguage,
  FaBriefcase,
  FaFileAlt,
  FaCamera,
  FaDownload
} from "react-icons/fa"

function App() {

  const cvRef = useRef()

  const [template, setTemplate] = useState(1)

  const [cvData, setCvData] = useState({
    name: "",
    surname: "",
    specialization: "",
    address: "",
    education: "",
    skills: "",
    languages: "",
    experience: "",
    photo: ""
  })

  const [sections, setSections] = useState([])

  useEffect(() => {

    const savedCV = localStorage.getItem("cvData")

    if (savedCV) {
      setCvData(JSON.parse(savedCV))
    }

  }, [])

  useEffect(() => {

    localStorage.setItem(
      "cvData",
      JSON.stringify(cvData)
    )

  }, [cvData])

  function handleChange(e) {

    const { name, value } = e.target

    setCvData({
      ...cvData,
      [name]: value
    })

  }

  function handlePhotoUpload(e) {

    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {

      setCvData({
        ...cvData,
        photo: reader.result
      })

    }

    reader.readAsDataURL(file)

  }

  function addSection() {

    const newSection = {
      id: Date.now(),
      title: "",
      text: ""
    }

    setSections([...sections, newSection])

  }

  function updateSection(id, field, value) {

    const updatedSections = sections.map((section) => {

      if (section.id === id) {

        return {
          ...section,
          [field]: value
        }

      }

      return section

    })

    setSections(updatedSections)

  }

  function downloadPDF() {

    const element = cvRef.current

    const options = {
      margin: 0.5,
      filename: "my-cv.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait"
      }
    }

    html2pdf().set(options).from(element).save()

  }

  return (

    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1e293b, #020617)",
      padding: "30px",
      fontFamily: "Arial",
      position: "relative",
      overflow: "hidden"
    }}>

      {/* ANIMATED BACKGROUND */}
      <div style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0
      }}>

        <motion.div

          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}

          transition={{
            duration: 10,
            repeat: Infinity
          }}

          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            background: "#3b82f6",
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.2,
            top: "-100px",
            left: "-100px"
          }}
        />

        <motion.div

          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0]
          }}

          transition={{
            duration: 12,
            repeat: Infinity
          }}

          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            background: "#8b5cf6",
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.18,
            bottom: "-100px",
            right: "-100px"
          }}
        />

      </div>

      {/* MAIN CONTENT */}
      <motion.div

        initial={{
          opacity: 0
        }}

        animate={{
          opacity: 1
        }}

        transition={{
          duration: 0.5
        }}

        style={{
          position: "relative",
          zIndex: 1
        }}
      >

        {/* TITLE */}
        <motion.h1

          initial={{
            opacity: 0,
            y: -30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.5
          }}

          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: "800",
            letterSpacing: "-2px",
            marginBottom: "35px",
            textAlign: "center"
          }}
        >
          CV Builder Pro
        </motion.h1>

        <div style={{
          display: "flex",
          gap: "25px",
          alignItems: "flex-start",
          flexWrap: "wrap"
        }}>

          {/* LEFT PANEL */}
          <motion.div

            initial={{
              opacity: 0,
              x: -50
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.5
            }}

            style={{
              flex: 1,
              minWidth: "340px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "28px",
              color: "white",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
            }}
          >

            <h2 style={{
              fontSize: "28px",
              marginBottom: "25px"
            }}>
              Create Your CV
            </h2>

            {/* PHOTO */}
            <label style={uploadBox}>

              <FaCamera />

              Upload Profile Photo

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{
                  display: "none"
                }}
              />

            </label>

            {/* TEMPLATE BUTTONS */}
            <div style={{
              display: "flex",
              gap: "10px",
              marginBottom: "25px",
              flexWrap: "wrap"
            }}>

              {[1,2,3,4,5].map((num) => (

                <motion.button

                  whileHover={{
                    scale: 1.08
                  }}

                  whileTap={{
                    scale: 0.95
                  }}

                  key={num}

                  onClick={() => setTemplate(num)}

                  style={templateButton(template === num)}
                >
                  T{num}
                </motion.button>

              ))}

            </div>

            {/* FORM */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={cvData.name}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={cvData.surname}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={cvData.specialization}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={cvData.address}
                onChange={handleChange}
                style={inputStyle}
              />

              <textarea
                name="education"
                placeholder="Education"
                value={cvData.education}
                onChange={handleChange}
                style={textareaStyle}
              />

              <textarea
                name="skills"
                placeholder="Skills"
                value={cvData.skills}
                onChange={handleChange}
                style={textareaStyle}
              />

              <textarea
                name="languages"
                placeholder="Languages"
                value={cvData.languages}
                onChange={handleChange}
                style={textareaStyle}
              />

              <textarea
                name="experience"
                placeholder="Experience"
                value={cvData.experience}
                onChange={handleChange}
                style={{
                  ...textareaStyle,
                  minHeight: "140px"
                }}
              />

              {/* CUSTOM SECTION */}
              <motion.button

                whileHover={{
                  scale: 1.02
                }}

                whileTap={{
                  scale: 0.98
                }}

                onClick={addSection}

                style={purpleButton}
              >
                + Add Section
              </motion.button>

              {sections.map((section) => (

                <motion.div

                  initial={{
                    opacity: 0,
                    y: 20
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  key={section.id}

                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "15px",
                    borderRadius: "18px"
                  }}
                >

                  <input
                    type="text"
                    placeholder="Section Header"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(
                        section.id,
                        "title",
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />

                  <textarea
                    placeholder="Paragraph"
                    value={section.text}
                    onChange={(e) =>
                      updateSection(
                        section.id,
                        "text",
                        e.target.value
                      )
                    }
                    style={{
                      ...textareaStyle,
                      marginTop: "10px"
                    }}
                  />

                </motion.div>

              ))}

              <motion.button

                whileHover={{
                  scale: 1.03
                }}

                whileTap={{
                  scale: 0.97
                }}

                onClick={downloadPDF}

                style={greenButton}
              >

                <FaDownload />

                Download PDF

              </motion.button>

            </div>

          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div

            initial={{
              opacity: 0,
              x: 50
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.5
            }}

            ref={cvRef}

            style={{
              flex: 1,
              minWidth: "340px",
              background: "white",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 20px 70px rgba(0,0,0,0.45)"
            }}
          >

            {/* HEADER */}
            <div style={{
              background:

                template === 1
                  ? "linear-gradient(135deg,#2563eb,#1d4ed8)"

                  : template === 2
                  ? "linear-gradient(135deg,#7c3aed,#5b21b6)"

                  : template === 3
                  ? "linear-gradient(135deg,#059669,#047857)"

                  : template === 4
                  ? "linear-gradient(135deg,#ea580c,#c2410c)"

                  : "linear-gradient(135deg,#111827,#1e293b)",

              color: "white",
              padding: "45px",
              display: "flex",
              alignItems: "center",
              gap: "25px"
            }}>

              {cvData.photo && (

                <motion.img

                  initial={{
                    scale: 0.8,
                    opacity: 0
                  }}

                  animate={{
                    scale: 1,
                    opacity: 1
                  }}

                  src={cvData.photo}

                  alt="profile"

                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid rgba(255,255,255,0.7)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.25)"
                  }}
                />

              )}

              <div>

                <h1 style={{
                  fontSize: "42px",
                  margin: 0,
                  fontWeight: "800"
                }}>
                  {cvData.name} {cvData.surname}
                </h1>

                <p style={{
                  marginTop: "10px",
                  fontSize: "20px",
                  opacity: 0.92
                }}>
                  {cvData.specialization}
                </p>

              </div>

            </div>

            {/* CONTENT */}
            <div style={{
              padding: "40px"
            }}>

              <Section
                title="Address"
                content={cvData.address}
              />

              <Section
                title="Education"
                content={cvData.education}
              />

              <Section
                title="Skills"
                content={cvData.skills}
              />

              <Section
                title="Languages"
                content={cvData.languages}
              />

              <Section
                title="Experience"
                content={cvData.experience}
              />

              {sections.map((section) => (

                <Section
                  key={section.id}
                  title={section.title}
                  content={section.text}
                />

              ))}

            </div>

          </motion.div>

        </div>

      </motion.div>

    </div>
  )
}

function Section({ title, content }) {

  if (!content) return null

  const icons = {
    Address: <FaMapMarkerAlt />,
    Education: <FaGraduationCap />,
    Skills: <FaTools />,
    Languages: <FaLanguage />,
    Experience: <FaBriefcase />
  }

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.3
      }}

      style={{
        marginBottom: "35px"
      }}
    >

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px"
      }}>

        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: "#eff6ff",
          color: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {icons[title] || <FaFileAlt />}
        </div>

        <h2 style={{
          fontSize: "24px",
          margin: 0,
          color: "#111827"
        }}>
          {title}
        </h2>

      </div>

      <p style={{
        lineHeight: "1.9",
        color: "#374151",
        fontSize: "15px"
      }}>
        {content}
      </p>

    </motion.div>

  )

}

const inputStyle = {
  padding: "15px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  color: "white",
  fontSize: "15px",
  outline: "none"
}

const textareaStyle = {
  ...inputStyle,
  minHeight: "110px",
  resize: "none"
}

function templateButton(active) {

  return {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    background: active
      ? "linear-gradient(135deg,#3b82f6,#2563eb)"
      : "rgba(255,255,255,0.08)",
    color: "white",
    fontWeight: "bold",
    boxShadow: active
      ? "0 10px 20px rgba(37,99,235,0.35)"
      : "none"
  }

}

const greenButton = {
  padding: "16px",
  borderRadius: "16px",
  border: "none",
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  fontWeight: "700",
  boxShadow: "0 10px 25px rgba(34,197,94,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px"
}

const purpleButton = {
  padding: "16px",
  borderRadius: "16px",
  border: "none",
  background: "linear-gradient(135deg,#8b5cf6,#7c3aed)",
  color: "white",
  fontSize: "15px",
  cursor: "pointer",
  fontWeight: "700",
  boxShadow: "0 10px 25px rgba(124,58,237,0.35)"
}

const uploadBox = {
  marginTop: "20px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  background: "rgba(255,255,255,0.06)",
  padding: "16px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.08)"
}

export default App