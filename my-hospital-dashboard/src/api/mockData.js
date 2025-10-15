// This file simulates a comprehensive API response from your backend.
// It contains all the necessary data for all user dashboards.

export const MOCK_API_DATA = {
  // --- Data for Administrator Dashboard ---
  adminDashboard: {
    surgeForecast: [
      { day: 'Today', prediction: 195, cause: 'Post-Diwali Pollution' },
      { day: 'Thu', prediction: 210, cause: 'High Pollution & Festival Traffic' },
      { day: 'Fri', prediction: 240, cause: 'Weekend & Peak Pollution' },
      { day: 'Sat', prediction: 285, cause: 'Diwali Festival & Severe Pollution' },
      { day: 'Sun', prediction: 260, cause: 'Diwali Festival & High Pollution' },
      { day: 'Mon', prediction: 180, cause: 'Lingering Pollution' },
      { day: 'Tue', prediction: 150, cause: 'Return to Normal' },
    ],
    readiness: {
      score: 72,
      staffing: 85,
      beds: 65,
      supplies: 68,
    },
    actionItems: [
      { priority: 'High', action: 'Increase ER nursing staff by 25% for Friday through Sunday night shifts.', reason: 'AI predicts a 150% increase in patient load compared to baseline.' },
      { priority: 'High', action: 'Immediately order 100 units of Pediatric Spacers for nebulizers.', reason: 'Critical deficit detected; stockout predicted in 24 hours.' },
      { priority: 'Medium', action: 'Convert West Wing general ward (20 beds) into a temporary respiratory observation unit.', reason: 'To prevent overwhelming the ER and ICU with moderate-severity cases.' },
    ],
    liveStatus: {
      erWaitTime: '55 Mins',
      icuOccupancy: '19 / 20',
      ventilatorsInUse: '14 / 15',
      onDutyStaff: '48 / 115',
    },
  },

  // --- Data for Doctor/Nurse Dashboard ---
  doctorDashboard: {
    department: "Emergency Room",
    startTime: "7:00 PM",
    surgeIncrease: "+60%",
    caseMix: [
      { name: 'Respiratory (Pollution-induced)', value: 55 },
      { name: 'Trauma (Festival-related)', value: 25 },
      { name: 'Cardiac (Exacerbated by pollution)', value: 15 },
      { name: 'Other', value: 5 },
    ],
    alerts: [
      { icon: '💨', title: 'Severe Air Quality Alert:', text: 'High PM2.5 levels. Expect a surge in asthma, COPD, and bronchitis cases. Ensure nebulizers are primed and ready.'},
      { icon: '🔥', title: 'Burn Risk:', text: 'High probability of firecracker-related burn injuries. Burn kits and sterile dressings are stocked in Bay 3.'},
      { icon: ' pediatric_patient', title: 'Pediatric Advisory:', text: 'A high number of children are expected with breathing difficulties. Pediatric respiratory team is on standby.'},
    ],
  },

  // --- Data for Inventory Manager Dashboard ---
  inventoryDashboard: {
    surgeEvent: "High-Pollution & Festival Respiratory Surge",
    checklist: [
      { item: 'Nebulizer Kits', need: 300, stock: 210 },
      { item: 'Albuterol Vials (boxes)', need: 50, stock: 65 },
      { item: 'Pediatric Spacers', need: 120, stock: 25 },
      { item: 'Burn Treatment Kits', need: 50, stock: 55 },
      { item: 'N95 Masks (boxes)', need: 200, stock: 90 },
      { item: 'IV Fluids (cases)', need: 80, stock: 95 },
    ]
  },

  // --- Data for ERT Dashboard ---
  ertDashboard: {
    eventType: 'Mass Casualty Event: High-Pollution Respiratory Surge',
    peakTime: 'Saturday, Oct 18, ~9:00 PM',
    predictedInflux: '~120-150 severe cases within a 3-hour window',
    primaryNeeds: [
      'Ventilators (Est. 20+ needed)', 
      'All Respiratory Therapists to be on-site', 
      'ICU Bed Overflow Protocol to be activated'
    ],
    team: [
      { name: 'Dr. Anand Kumar', role: 'Pulmonologist (On-Call)', status: 'Notified' },
      { name: 'Dr. Priya Singh', role: 'ER Lead Physician', status: 'On-Site' },
      { name: 'Rajesh Verma', role: 'Lead Respiratory Therapist', status: 'En Route (ETA 12m)' },
      { name: 'Sunita Patil', role: 'Head Nurse (ICU)', status: 'Acknowledged' },
    ]
  },
  
  // --- Data for Public Advisory Page ---
  publicAdvisory: {
    title: "Severe Air Quality Advisory for Navi Mumbai Residents",
    issued: "Wednesday, October 15, 2025",
    risk: "Our AI-powered forecasting system predicts a severe spike in PM2.5 and PM10 pollution levels for the next 72-96 hours due to post-Diwali atmospheric conditions. This poses a significant health risk, especially for children, the elderly, and individuals with pre-existing respiratory or cardiac conditions.",
    preventativeMeasures: [
        "Stay indoors and close windows, especially during early morning and late evening.",
        "Wear a certified N95 or FFP2 mask if you must go outside.",
        "Use air purifiers with HEPA filters at home.",
        "Avoid all strenuous outdoor activities, including jogging and sports."
    ],
    symptoms: ["Persistent coughing or wheezing", "Shortness of breath or difficulty breathing", "Unusual fatigue or dizziness", "Chest tightness or pain"],
    doctors: [
        { name: 'Dr. R. Mehta', specialty: 'Pulmonologist (Lungs)', available: true },
        { name: 'Dr. P. Joshi', specialty: 'Pediatrician (Children)', available: true },
        { name: 'Dr. S. Khan', specialty: 'General Physician', available: false },
    ]
  }
};