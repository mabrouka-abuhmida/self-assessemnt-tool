import React, { useState } from 'react';
import './App.css';
import efraitLogo from './assets/efrait-logo.png';

function FrontSheet({ onNext }) {
  return (
    <div className="front-sheet">
      <img src={efraitLogo} alt="eFRAIT Logo" className="efrait-logo" />
      <h1>Family Resilience Self-Assessment Tool (FRSAT) Guidance</h1>
      <h2>Authors: Prof. Carolyn Wallace, Dr Michelle Thomas</h2>
      <h3>Introduction:</h3>
      <p>
        This guide gives information on how to use the FRSAT (Family Resilience Self-Assessment Tool).
      </p>
      <p>
        This self-assessment tool requires you to consider each statement and to decide which response best reflects your experience over the last 2 weeks. There are 10 scales that require completion and this should take you between 5 and 10 minutes. Your answers will indicate where you may feel that you need to access information, advice or support to strengthen your family's resilience.
      </p>
      <ul>
        <li>Some of the terms you may not be familiar with, for example, when considering chronic health conditions this can mean mental health, diabetes, asthma, heart disease or any health condition that affects family life.</li>
        <li>When we ask you to consider your lifestyle this can mean family routines, smoking, alcohol and legal or illegal drug use and domestic relationships.</li>
        <li>When we ask you to consider dysfunctional behaviour this can mean behaviour that negatively impacts on family routines and functioning including communication and frequent conflicts.</li>
      </ul>
      <button className="primary-btn" onClick={onNext}>Start Assessment</button>
    </div>
  );
}

function ParentInfoForm({ onSubmit }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    relationship: '',
    education: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="parent-info-form" onSubmit={handleSubmit}>
      <h2>The main parent/carer's information</h2>
      <label>First name
        <input name="firstName" type="text" value={form.firstName} onChange={handleChange} required />
      </label>
      <label>Last name
        <input name="lastName" type="text" value={form.lastName} onChange={handleChange} required />
      </label>
      <label>Date of birth
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
      </label>
      <label>Gender
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>Relationship to child/children
        <select name="relationship" value={form.relationship} onChange={handleChange} required>
          <option value="">Select relationship</option>
          <option value="parent">Parent</option>
          <option value="carer">Carer</option>
          <option value="guardian">Guardian</option>
        </select>
      </label>
      <label>Educational qualification level
        <select name="education" value={form.education} onChange={handleChange} required>
          <option value="">Select education level</option>
          <option value="none">None</option>
          <option value="school">School</option>
          <option value="college">College</option>
          <option value="university">University</option>
        </select>
      </label>
      <div className="form-actions">
        <button className="primary-btn" type="submit">Submit</button>
      </div>
    </form>
  );
}

function Questionnaire({ onSubmit }) {
  const questions = [
    {
      text: "My/our own childhood experiences positively impacts on my/our child/children's experience",
      sub: "Parents' childhood experiences",
    },
    {
      text: "My/our parental life experience positively contributes to my/our family life.",
      sub: "Parental life experiences",
    },
    {
      text: "My/our chronic health condition is managed well and does not impact on my/our family life.",
      sub: "Parental chronic health problems",
    },
    {
      text: "My/our lifestyle can positively impact my/our family life.",
      sub: "History of substance misuse within the family",
    },
    {
      text: "I/we've always recognised the impact of our behaviour on my/our family engagement with others",
      sub: "Parental recognition of weaknesses",
    },
    {
      text: "As parents I/we always recognise the negative impact of dysfunctional behaviour in others on my/our family.",
      sub: "Parents recognise dysfunction in themselves",
    },
    {
      text: "I/we believe I/we have access to support needed to cope with challenging situations in my/our family",
      sub: "Family belief systems",
    },
    {
      text: "I/we have always weathered unexpected challenging situations that may affect our family resilience",
      sub: "History of being entirely able to withstand adversity",
    },
    {
      text: "We are consistently able to manage our family debt.",
      sub: "Unmanageable level of debt",
    },
    {
      text: "I/we always have adequate income to my/our manage family life",
      sub: "Adequate income",
    },
  ];

  const scaleLabels = ['None of the time', 'Rarely', 'Some of the time', 'Often', 'All of the time'];
  const [responses, setResponses] = useState(Array(questions.length).fill(''));

  const handleChange = (idx, value) => {
    setResponses((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data as {q1: ..., q2: ..., ...}
    const data = {};
    responses.forEach((value, idx) => {
      data[`q${idx + 1}`] = value;
    });
    onSubmit(data);
  };

  return (
    <form className="questionnaire" onSubmit={handleSubmit}>
      <h2>Self Assessment</h2>
      <p>To complete this self assessment please consider each statement and how you have felt for the past 2 weeks then select the box that matches this.</p>
      <div className="questionnaire-table">
        <div className="questionnaire-header">
          <div className="question-col">Statement</div>
          {scaleLabels.map((label, i) => (
            <div className="scale-col" key={i}>{label}</div>
          ))}
        </div>
        {questions.map((q, idx) => (
          <div className="questionnaire-row" key={idx}>
            <div className="question-col">
              <div>{q.text}</div>
              <div className="question-sub">[{q.sub}]</div>
            </div>
            {scaleLabels.map((_, i) => (
              <div className="scale-col" key={i}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={i + 1}
                  checked={responses[idx] === String(i + 1)}
                  onChange={() => handleChange(idx, String(i + 1))}
                  required={i === 0}
                  aria-label={scaleLabels[i]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="primary-btn" type="submit" style={{marginTop: '2em'}}>Submit</button>
    </form>
  );
}

function ThankYou({ onReturnHome }) {
  return (
    <div className="thank-you">
      <img src={efraitLogo} alt="eFRAIT Logo" className="thank-you-logo" />
      <h2 className="thank-you-title">Thank you for taking the assessment.</h2>
      <p>Your responses have been recorded.</p>
      <button className="primary-btn" style={{marginTop: '2em'}} onClick={onReturnHome}>Return to Home</button>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [parentInfo, setParentInfo] = useState(null);
  const [questionnaire, setQuestionnaire] = useState(null);

  const handleQuestionnaireSubmit = (qData) => {
    // Combine parent info and questionnaire answers
    const combined = {
      firstName: parentInfo?.firstName || '',
      lastName: parentInfo?.lastName || '',
      dob: parentInfo?.dob || '',
      relationship: parentInfo?.relationship || '',
      ...qData,
    };
    setQuestionnaire(qData);
    setStep(3);
    // Send to SheetDB
    fetch('https://sheetdb.io/api/v1/k25t68wh6emhe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: combined }),
    });
  };

  return (
    <div className="App">
      {step === 0 && <FrontSheet onNext={() => setStep(1)} />}
      {step === 1 && <ParentInfoForm onSubmit={(data) => { setParentInfo(data); setStep(2); }} />}
      {step === 2 && <Questionnaire onSubmit={handleQuestionnaireSubmit} />}
      {step === 3 && <ThankYou onReturnHome={() => setStep(0)} />}
    </div>
  );
}

export default App;
