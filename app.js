const laneBase = {
  deterministic: {
    id: "deterministic",
    name: "Deterministic",
    color: "#b7791f",
    tag: "Internal only",
    summary: "Rules, extraction, calculations, timelines, and templated outputs with no LLM involved.",
    trustStatement: "Most conservative lane. Stable, factual, and auditable.",
    modeTitle: "Deterministic logic",
    modeSummary: "No LLM is used. Consentext relies on internal rules, extraction, thresholds, timelines, and templated summaries.",
    inside: [
      "All record facts, source data, calculations, and output generation.",
      "Trend analysis, thresholds, care-gap checks, and structured summaries."
    ],
    outside: ["Nothing leaves Consentext in this lane."],
    controls: [
      "Deterministic logic only.",
      "Fact outputs anchored to internal record data.",
      "No outside provider or user-supplied key."
    ],
    consumerExplainer: "Choose this when you want the most conservative, fact-first answer with no generative AI involved.",
    approval: "No external transmission. Standard record-access review only.",
    boundaryLabel: "No external payload",
    needsApproval: false,
    payloadPreview: {
      title: "No outbound payload",
      summary: "Everything needed to answer stays inside Consentext.",
      items: [
        "Record facts stay internal.",
        "No provider connection is used.",
        "Only deterministic calculations and templates run."
      ]
    }
  },
  private: {
    id: "private",
    name: "Private",
    color: "#0f766e",
    tag: "Controlled AI",
    summary: "Sensitive record AI stays under Consentext control using an internal or controlled model runtime.",
    trustStatement: "Protected lane for natural-language help without sending sensitive record work outward.",
    modeTitle: "Controlled internal AI",
    modeSummary: "Sensitive record interpretation stays inside Consentext-controlled systems while allowing natural-language assistance.",
    inside: [
      "Raw record data, sensitive summaries, prompts, retrieval, and interpretation.",
      "Natural-language explanation generated inside Consentext-controlled systems."
    ],
    outside: ["Nothing sensitive leaves Consentext in this lane."],
    controls: [
      "Consentext-controlled model runtime only.",
      "Sensitive record data remains internal.",
      "Visible lane label and internal audit receipt."
    ],
    consumerExplainer: "Choose this when you want natural-language help but do not want sensitive record interpretation sent outside Consentext.",
    approval: "No external transmission. User proceeds in a protected internal AI lane.",
    boundaryLabel: "Internal controlled AI",
    needsApproval: false,
    payloadPreview: {
      title: "Protected internal AI context",
      summary: "Sensitive record work remains inside Consentext-controlled systems.",
      items: [
        "Raw record data stays inside.",
        "Internal retrieval and prompt context stay inside.",
        "No outside model or user-supplied key is used."
      ]
    }
  },
  "private-plus": {
    id: "private-plus",
    name: "Private+",
    color: "#2b6cb0",
    tag: "Reduced external payload",
    summary: "Consentext keeps the record inside, then prepares a reduced, de-identified, minimum-necessary payload when needed.",
    trustStatement: "Bridge lane between strict protection and richer outside-model assistance.",
    modeTitle: "Reduced outside AI",
    modeSummary: "Consentext keeps the raw record inside, prepares a de-identified minimum-necessary payload, and stays in the middle for the outside step.",
    inside: [
      "Raw record, citations, exact source facts, internal retrieval, and policy checks.",
      "Reduced payload construction and outbound review."
    ],
    outside: [
      "A de-identified feature set such as age range, condition category, lab trend direction, and generalized timing.",
      "No raw record packet or exact identifiers."
    ],
    controls: [
      "Minimum-necessary payload policy.",
      "Explicit boundary review before send.",
      "Consentext remains in the middle for the external step."
    ],
    consumerExplainer: "Choose this when you want broader language help without exposing the raw record; only a reduced, de-identified payload may leave.",
    approval: "User approval required before reduced external payload use.",
    boundaryLabel: "Reduced / de-identified external use",
    needsApproval: true,
    approvalText: "I approve reduced, de-identified external payload use for this demo request.",
    approvalWarning: "Only a reduced, minimum-necessary payload may leave. Raw record facts and citations remain inside Consentext.",
    payloadPreview: {
      title: "Reduced payload example",
      summary: "External use is narrowed to de-identified features rather than the full record.",
      items: [
        "Age range: 52-59",
        "Condition category: Type 2 diabetes",
        "Trend direction: A1C improved over 12 months",
        "Timing: follow-up visit in 2 weeks"
      ]
    }
  },
  "max-intelligence": {
    id: "max-intelligence",
    name: "Max Intelligence",
    color: "#a24d57",
    tag: "Broad external AI",
    summary: "Broader outside-model use for users who want maximum capability and accept the weakest protection boundary of the four.",
    trustStatement: "Richest assistance, weakest boundary after transmission.",
    modeTitle: "Broader outside AI",
    modeSummary: "Consentext still frames the request and records approvals, but more context may leave externally than in Private+.",
    inside: [
      "Consentext logging, user approvals, lane selection, and internal context retained by product policy.",
      "Pre-send review and gateway routing remain under Consentext control."
    ],
    outside: [
      "Broader context may leave externally than in Private+.",
      "This is still mediated by Consentext rather than a direct handoff to an outside UI."
    ],
    controls: [
      "Explicit user choice before broader external use.",
      "Warnings about the weaker protection boundary.",
      "Consentext remains the gateway and returns the result."
    ],
    consumerExplainer: "Choose this when you want the broadest AI help and accept that more context may leave externally than in the other supported lanes.",
    approval: "Explicit user choice required for broader outside-model use.",
    boundaryLabel: "Broad external model use",
    needsApproval: true,
    approvalText: "I approve broader outside-model use for this demo request.",
    approvalWarning: "Broader context may leave externally in this lane. Consentext still mediates the request, but the protection boundary is weaker after transmission.",
    payloadPreview: {
      title: "Broader context example",
      summary: "This lane can send a richer request bundle than Private+ while keeping Consentext in the middle.",
      items: [
        "Task goal and prompt context",
        "Broader condition and recent-care context",
        "Selected trend and support-note details",
        "User-approved outside-model connection mode"
      ]
    }
  }
};

const tasks = [
  {
    id: "a1c",
    label: "Explain my A1C trend over the last year",
    prompt: "Explain my A1C trend over the last year and what I should ask at my next endocrinology visit.",
    recommendedLaneId: "private",
    recommendationReason: "This task benefits from natural-language explanation while keeping sensitive record interpretation inside Consentext.",
    snapshot: [
      ["Patient", "Demo patient, age 52-59"],
      ["Condition", "Type 2 diabetes"],
      ["Trend", "A1C 8.4% -> 7.6% over 12 months"],
      ["Context", "Medication adjusted in August; endocrinology visit in 2 weeks"]
    ],
    results: {
      deterministic: {
        title: "A1C trend review built from deterministic record analysis",
        summary: "This lane stays inside Consentext and uses structured logic rather than generative language modeling.",
        bullets: [
          "A1C moved from 8.4% to 7.6% over the last 12 months, with the largest improvement after the August medication adjustment.",
          "Two lab intervals were longer than expected, which lowers confidence in short-interval comparisons but not the year-over-year direction.",
          "Suggested visit focus: confirm whether home glucose logs match the downward lab trend and whether the current regimen should be maintained."
        ],
        provenance: ["Record-backed calculations", "Lab timeline", "Templated summary"],
        references: ["Lab panel: Mar 18, 2025", "Medication list update: Aug 22, 2025", "Lab panel: Feb 16, 2026"]
      },
      private: {
        title: "Protected internal explanation of the last year of diabetes-related changes",
        summary: "Private adds conversational help while keeping sensitive record interpretation inside Consentext-controlled systems.",
        bullets: [
          "Your A1C improved steadily over the last year, which suggests the treatment plan is helping even though the pace of improvement slowed after December.",
          "Visit-note review also shows fewer severe glucose spikes, which supports the better lab trend.",
          "A reasonable question for the visit is whether the current regimen should stay the same now that the trend is improving."
        ],
        provenance: ["Internal AI explanation", "Record-grounded retrieval", "Sensitive summary kept inside"],
        references: ["Lab panel: Mar 18, 2025", "Primary care follow-up: Sep 10, 2025", "Lab panel: Feb 16, 2026"]
      },
      "private-plus": {
        title: "Balanced explanation using internal facts plus reduced outside language assistance",
        summary: "Private+ keeps exact record facts inside while allowing a narrowed external payload for broader phrasing support.",
        bullets: [
          "Internal analysis found a year-over-year improvement in A1C with a more stable pattern after the late-summer treatment change.",
          "The outside assist step only received a reduced payload describing age range, condition category, trend direction, and appointment context.",
          "Returned guidance emphasizes what improved after the medication adjustment, what remains inconsistent, and which questions to ask about sustaining the gain."
        ],
        provenance: ["Internal citations retained", "Reduced payload reviewed", "External language assist via Consentext"],
        references: ["Lab panel: Mar 18, 2025", "Medication list update: Aug 22, 2025", "Endocrinology visit scheduled: Mar 24, 2026"]
      },
      "max-intelligence": {
        title: "High-capability visit prep with the broadest supported outside-model assistance",
        summary: "Max Intelligence preserves the gateway and review step, but it allows more context to leave externally than any other supported lane.",
        bullets: [
          "Main story for the visit: diabetes markers improved overall, but the rate of improvement leveled off after the first strong response to treatment.",
          "Suggested discussion points include whether the current regimen is optimized, which habits drove the improvement, and what a realistic next target looks like.",
          "This lane favors richer synthesis and planning support while making clear that it uses the weakest privacy boundary of the supported options."
        ],
        provenance: ["Gateway-mediated external model use", "User approval captured", "Lane warning shown before send"],
        references: ["Lab panel: Mar 18, 2025", "Nutrition note: Nov 05, 2025", "Lab panel: Feb 16, 2026"]
      }
    }
  },
  {
    id: "visit",
    label: "What changed since my last doctor visit?",
    prompt: "What changed since my last doctor visit, and what looks better or worse in my record?",
    recommendedLaneId: "private-plus",
    recommendationReason: "This comparison task is a good bridge case for showing internal fact control with optional reduced outside phrasing support.",
    snapshot: [
      ["Patient", "Demo patient, age 52-59"],
      ["Last visit", "4 months ago"],
      ["New items", "Medication change, two updated labs, one nutrition note"],
      ["Focus", "Glucose stability and follow-up questions"]
    ],
    results: {
      deterministic: {
        title: "Structured delta since the last doctor visit",
        summary: "The deterministic lane compares record facts since the last visit without using generative AI.",
        bullets: [
          "Since the last visit, the record shows one medication adjustment, two new lab panels, and one documented nutrition follow-up.",
          "Improvement: A1C and fasting glucose both moved downward compared with the prior documented visit window.",
          "Needs attention: there is still a gap between lab improvement and the consistency of home glucose reporting."
        ],
        provenance: ["Visit delta engine", "Medication change log", "Structured comparison template"],
        references: ["Primary care visit: Nov 12, 2025", "Medication list update: Dec 01, 2025", "Lab panel: Feb 16, 2026"]
      },
      private: {
        title: "Protected internal summary of what changed since the last visit",
        summary: "Private explains the changes in plain language without sending the record outside Consentext.",
        bullets: [
          "The biggest change since the last visit is that the treatment plan was adjusted and the follow-up labs improved afterward.",
          "The record also suggests better day-to-day stability, although the notes still point to occasional inconsistency in self-monitoring.",
          "If you ask what changed most, the answer is treatment adjustment plus stronger follow-through on diet support."
        ],
        provenance: ["Internal AI explanation", "Visit-note retrieval", "Sensitive summary kept inside"],
        references: ["Primary care visit: Nov 12, 2025", "Nutrition note: Jan 08, 2026", "Lab panel: Feb 16, 2026"]
      },
      "private-plus": {
        title: "Hybrid change summary with reduced external language assist",
        summary: "Private+ uses internal facts for the comparison and a reduced payload for optional outside phrasing support.",
        bullets: [
          "Consentext identified three changes internally: medication update, improved lab trend, and one new nutrition follow-up note.",
          "Only a reduced payload describing change categories and direction was used for the outside assist step.",
          "The final answer highlights what improved, what still needs attention, and what to clarify at the next visit."
        ],
        provenance: ["Internal citations retained", "Reduced payload reviewed", "Consentext-mediated outside assist"],
        references: ["Primary care visit: Nov 12, 2025", "Medication list update: Dec 01, 2025", "Nutrition note: Jan 08, 2026"]
      },
      "max-intelligence": {
        title: "Broader synthesis of what changed since the last visit",
        summary: "Max Intelligence offers the broadest comparative narrative while still keeping Consentext in front of the interaction.",
        bullets: [
          "The strongest narrative change is that the care plan now appears to be producing measurable lab improvement after a treatment adjustment.",
          "The broader synthesis also connects the lab trend with follow-up support and preparation for the next appointment.",
          "This lane gives the richest explanation of momentum and risk, but it uses the weakest protection boundary of the supported options."
        ],
        provenance: ["Gateway-mediated external model use", "User approval captured", "Broader context framing"],
        references: ["Primary care visit: Nov 12, 2025", "Medication list update: Dec 01, 2025", "Lab panel: Feb 16, 2026"]
      }
    }
  },
  {
    id: "prep",
    label: "Prepare me for my endocrinology appointment",
    prompt: "Prepare me for my endocrinology appointment with the most important record-based talking points.",
    recommendedLaneId: "max-intelligence",
    recommendationReason: "Visit-prep and planning are the clearest use case for the broadest supported synthesis lane.",
    snapshot: [
      ["Patient", "Demo patient, age 52-59"],
      ["Appointment", "Endocrinology follow-up"],
      ["Priority", "Treatment response, labs, and questions to ask"],
      ["Safety", "Demo data only"]
    ],
    results: {
      deterministic: {
        title: "Structured appointment prep from record facts",
        summary: "The deterministic lane produces a factual prep list without generative synthesis.",
        bullets: [
          "Bring up the year-over-year A1C improvement and the timing of the August medication change.",
          "Ask whether the current regimen should stay stable given the recent slowdown in the pace of improvement.",
          "Confirm whether home glucose logs and lab trends are aligned enough to guide the next treatment decision."
        ],
        provenance: ["Appointment prep template", "Lab trend extraction", "Medication timing check"],
        references: ["Medication list update: Aug 22, 2025", "Lab panel: Feb 16, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      },
      private: {
        title: "Protected internal visit coaching",
        summary: "Private provides natural-language prep while keeping all sensitive appointment context inside Consentext.",
        bullets: [
          "Your strongest talking point is that the treatment plan appears to be working, especially compared with last spring.",
          "You may want to ask whether the improvement is strong enough to stay the course or whether fine-tuning is still needed.",
          "It would also be useful to discuss what evidence matters most between home logs, labs, and symptom patterns."
        ],
        provenance: ["Internal AI coaching", "Record-grounded retrieval", "Sensitive planning kept inside"],
        references: ["Primary care follow-up: Sep 10, 2025", "Lab panel: Feb 16, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      },
      "private-plus": {
        title: "Balanced appointment prep with reduced outside assistance",
        summary: "Private+ preserves internal facts and uses a reduced payload only for optional language and organization support.",
        bullets: [
          "Consentext kept the exact record facts and references inside while using a reduced payload to help organize visit talking points.",
          "The main prep themes are treatment response, questions about sustaining the gain, and whether monitoring practices need adjustment.",
          "This lane is designed to feel more capable than Private without turning the raw record into an outside payload."
        ],
        provenance: ["Internal citations retained", "Reduced payload reviewed", "Consentext-mediated outside assist"],
        references: ["Medication list update: Aug 22, 2025", "Nutrition note: Jan 08, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      },
      "max-intelligence": {
        title: "Rich appointment strategy with the broadest supported AI assistance",
        summary: "Max Intelligence provides the broadest planning help while preserving the gateway review and warning step.",
        bullets: [
          "The visit strategy centers on telling a clear improvement story, identifying what caused it, and deciding what the next measurable target should be.",
          "This lane also adds broader discussion prompts around confidence, sustainability, and tradeoffs of staying aggressive versus stabilizing.",
          "It is the most expansive planning lane in the prototype and the least protective after transmission."
        ],
        provenance: ["Gateway-mediated external model use", "User approval captured", "Broader planning synthesis"],
        references: ["Lab panel: Feb 16, 2026", "Nutrition note: Jan 08, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      }
    }
  },
  {
    id: "care-gap",
    label: "Show possible care gaps and follow-up needs",
    prompt: "Show possible care gaps or follow-up needs in my record and explain which ones matter most right now.",
    recommendedLaneId: "deterministic",
    recommendationReason: "Care-gap identification is strongest when anchored in rule-based checks before adding broader language assistance.",
    snapshot: [
      ["Patient", "Demo patient, age 52-59"],
      ["Focus", "Follow-up timing, monitoring, and preventive checks"],
      ["Recent context", "Improving labs with uneven home tracking"],
      ["Goal", "Prioritize what needs attention next"]
    ],
    results: {
      deterministic: {
        title: "Structured care-gap scan from record rules",
        summary: "The deterministic lane flags likely follow-up needs using rule-based checks and record timelines.",
        bullets: [
          "Potential gap: home glucose logging appears less consistent than the latest lab improvement would suggest.",
          "Potential follow-up: confirm whether the next endocrinology visit covers current treatment response and monitoring cadence.",
          "Preventive attention area: verify whether all diabetes-related follow-up items are current before the next visit."
        ],
        provenance: ["Rule-based care-gap checks", "Timeline engine", "Structured record summary"],
        references: ["Primary care visit: Nov 12, 2025", "Lab panel: Feb 16, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      },
      private: {
        title: "Protected internal explanation of likely follow-up needs",
        summary: "Private translates the record into a plain-language follow-up summary without sending sensitive context outside Consentext.",
        bullets: [
          "The main issue is not worsening labs; it is making sure monitoring habits and follow-up timing keep pace with the improved trend.",
          "Your next visit is the right place to confirm what should be tracked more consistently between appointments.",
          "This lane is useful when you want guidance on what matters now without widening the privacy boundary."
        ],
        provenance: ["Internal AI explanation", "Record-grounded retrieval", "Sensitive planning kept inside"],
        references: ["Primary care visit: Nov 12, 2025", "Nutrition note: Jan 08, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      },
      "private-plus": {
        title: "Hybrid care-gap summary with reduced external phrasing support",
        summary: "Private+ keeps the exact record internal and uses only a reduced payload for optional outside assistance.",
        bullets: [
          "Consentext identified likely follow-up needs internally, then shared only generalized categories and priority signals for outside phrasing support.",
          "The final answer focuses on follow-up timing, consistency of monitoring, and what to clarify at the next specialist visit.",
          "This lane is meant to show a practical middle ground between strict internal control and richer language help."
        ],
        provenance: ["Internal citations retained", "Reduced payload reviewed", "Consentext-mediated outside assist"],
        references: ["Lab panel: Feb 16, 2026", "Nutrition note: Jan 08, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      },
      "max-intelligence": {
        title: "Broad care-gap synthesis with the richest supported outside assistance",
        summary: "Max Intelligence turns likely follow-up needs into a broader action narrative while preserving the gateway review step.",
        bullets: [
          "The strongest synthesis is that the record shows progress, but it still points to a need for better between-visit consistency and explicit follow-up priorities.",
          "This lane expands the guidance into what to ask next, what to monitor, and where confidence is still limited.",
          "It is the most expansive follow-up-planning mode in the prototype and the least protective after transmission."
        ],
        provenance: ["Gateway-mediated external model use", "User approval captured", "Broader planning synthesis"],
        references: ["Primary care visit: Nov 12, 2025", "Lab panel: Feb 16, 2026", "Upcoming endocrinology visit: Mar 24, 2026"]
      }
    }
  }
];

const providerModes = {
  managed: {
    id: "managed",
    label: "Consentext-managed connection",
    shortLabel: "Consentext-managed",
    summary: "Consentext stays in the middle and uses its managed external connection for the outside-model step."
  },
  byok: {
    id: "byok",
    label: "User-supplied provider key",
    shortLabel: "BYOK",
    summary: "A user-supplied provider key may be used for the external step, but Consentext still mediates routing, review, and audit."
  }
};

const reviewChecklist = [
  {
    id: "lanes-visible",
    title: "All four lanes are visible and distinct",
    detail: "A reviewer should be able to identify Deterministic, Private, Private+, and Max Intelligence at a glance."
  },
  {
    id: "offboard-clear",
    title: "Direct outside AI UI handoff is clearly excluded",
    detail: "The off-board path should read as intentionally unsupported rather than forgotten."
  },
  {
    id: "boundary-visible",
    title: "Boundary review makes inside vs outside behavior clear",
    detail: "Before send, a reviewer should understand what stays inside, what may leave, and whether approval is required."
  },
  {
    id: "private-internal",
    title: "Private reads as internal-only AI",
    detail: "The protected lane should not imply broad outside-model access or BYOK."
  },
  {
    id: "external-distinction",
    title: "Private+ and Max Intelligence are meaningfully different",
    detail: "Reduced payload and broader external use should not collapse into the same story."
  },
  {
    id: "audit-governed",
    title: "Audit trail makes the gateway feel governed",
    detail: "A reviewer should see routing, approval, payload, and result steps as deliberate controls rather than hidden implementation."
  }
];

const STORAGE_KEY = "consentext-ai-gateway-prototype-state";
const SHAREABLE_STEPS = ["home", "compose", "review", "result", "audit"];
const STEP_LABELS = {
  home: "Home",
  compose: "Compose",
  review: "Boundary review",
  result: "Result",
  audit: "Result and audit"
};
const STEP_GUIDANCE = {
  home: "Start with the four-lane framing and explain that direct outside AI UI handoff is off the board.",
  compose: "Set the task, lane, and connection mode so reviewers can see the choice before any request runs.",
  review: "Use this phase to explain what stays inside, what may leave, and why approval is or is not required.",
  result: "Use the answer content to show how the lane changes product behavior rather than only changing wording.",
  audit: "Close on governance: show the result, provenance, and plain-English activity trail together."
};

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;
  const int = Number.parseInt(value, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

const laneNotes = {
  deterministic: [
    "Lead with trust: this lane is not a fallback, it is the fact-first anchor of the product.",
    "Point out that no outside provider and no LLM are involved.",
    "Use this lane to show that the gateway changes real behavior, not just labels."
  ],
  private: [
    "Emphasize that natural-language help exists here without sending sensitive record work outside Consentext.",
    "Call out that Private is intentionally different from BYOK and external-model lanes.",
    "Use this lane when describing the long-term trust moat around sensitive health data."
  ],
  "private-plus": [
    "Stress the split between raw record data staying inside and reduced payload use outside.",
    "Show the payload preview as the key bridge concept for reviewers.",
    "Make clear that Consentext still remains in the middle for routing, review, and audit."
  ],
  "max-intelligence": [
    "Frame this as the broadest supported lane, not a direct handoff to an outside AI UI.",
    "Be explicit that capability rises while the protection boundary weakens after transmission.",
    "Use this lane to explain consumer choice without pretending all lanes are equally protective."
  ]
};

const laneScripts = {
  deterministic: [
    "Start on the lane board and explain that Deterministic is the fact-first anchor with no LLM involved.",
    "Show the composer and point out that the same task can be run here without any outside payload.",
    "Open boundary review and emphasize that nothing leaves Consentext in this lane.",
    "Run the demo request and use the result plus audit trail to show governed, repeatable behavior."
  ],
  private: [
    "Start by contrasting Private with Deterministic: natural-language help exists, but sensitive record work stays inside Consentext.",
    "Use the selected lane card and recommendation card to explain why this task often belongs in Private.",
    "Open boundary review and highlight that no outside provider connection or BYOK exists here.",
    "Run the result and show that the output is more conversational without widening the privacy boundary."
  ],
  "private-plus": [
    "Introduce Private+ as the bridge lane between strict internal control and richer outside assistance.",
    "Use the payload preview to explain reduced, de-identified, minimum-necessary sharing.",
    "Highlight the approval step and optional connection mode while keeping Consentext in the middle.",
    "Run the result and compare it against Private to show the product difference clearly."
  ],
  "max-intelligence": [
    "Frame Max Intelligence as the broadest supported lane, not a direct outside-AI handoff.",
    "Show the stronger warning language and explain that capability rises while the protection boundary weakens.",
    "Use the payload preview and approval state to make the tradeoff visible before send.",
    "Run the result and audit trail to show that Consentext still governs routing, approval, and return flow."
  ]
};

const demoScenes = [
  {
    id: "private-anchor",
    label: "Private anchor",
    taskId: "a1c",
    laneId: "private",
    step: "review",
    summary: "Best starting scene for the protected internal-AI story."
  },
  {
    id: "bridge-lane",
    label: "Bridge lane",
    taskId: "visit",
    laneId: "private-plus",
    step: "review",
    approval: true,
    summary: "Shows reduced payload, approval gating, and the middle path."
  },
  {
    id: "broad-mode",
    label: "Broad mode",
    taskId: "prep",
    laneId: "max-intelligence",
    step: "result",
    approval: true,
    providerMode: "byok",
    summary: "Shows the richest lane with the weakest boundary and a result ready."
  },
  {
    id: "fact-first",
    label: "Fact first",
    taskId: "care-gap",
    laneId: "deterministic",
    step: "result",
    summary: "Best scene for explaining the deterministic trust anchor."
  }
];

const state = {
  selectedLaneId: "private",
  selectedTaskId: "a1c",
  activeStep: "compose",
  activeSceneId: "",
  promptDrafts: {},
  reviewedLanes: {},
  sessionBanner: "",
  toastMessage: "",
  composerCollapsed: false,
  reviewMode: false,
  presenterToolsOpen: false,
  helpOpen: false,
  notesOpen: false,
  scriptOpen: false,
  approvals: {
    "private-plus": false,
    "max-intelligence": false
  },
  providerModes: {
    "private-plus": "managed",
    "max-intelligence": "managed"
  }
};

function loadPersistedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    const validLaneIds = Object.keys(laneBase);
    const validTaskIds = tasks.map((task) => task.id);

    if (validLaneIds.includes(parsed.selectedLaneId)) {
      state.selectedLaneId = parsed.selectedLaneId;
    }
    if (validTaskIds.includes(parsed.selectedTaskId)) {
      state.selectedTaskId = parsed.selectedTaskId;
    }
    if (typeof parsed.activeSceneId === "string") {
      state.activeSceneId = parsed.activeSceneId;
    }
    if (typeof parsed.reviewMode === "boolean") {
      state.reviewMode = parsed.reviewMode;
    }
    if (typeof parsed.composerCollapsed === "boolean") {
      state.composerCollapsed = parsed.composerCollapsed;
    }
    if (typeof parsed.activeStep === "string") {
      state.activeStep = parsed.activeStep;
    }
    if (parsed.promptDrafts && typeof parsed.promptDrafts === "object") {
      state.promptDrafts = parsed.promptDrafts;
    }
    if (parsed.reviewedLanes && typeof parsed.reviewedLanes === "object") {
      state.reviewedLanes = parsed.reviewedLanes;
    }
    if (parsed.approvals && typeof parsed.approvals === "object") {
      state.approvals = {
        ...state.approvals,
        ...parsed.approvals
      };
    }
    if (parsed.providerModes && typeof parsed.providerModes === "object") {
      state.providerModes = {
        ...state.providerModes,
        ...parsed.providerModes
      };
    }
    state.sessionBanner = "Restored your last local review session.";
  } catch (_) {
    // Ignore invalid persisted state and continue with defaults.
  }
}

function loadStateFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const laneId = params.get("lane");
    const taskId = params.get("task");
    const step = params.get("step");
    const sceneId = params.get("scene");
    const validLaneIds = Object.keys(laneBase);
    const validTaskIds = tasks.map((task) => task.id);
    const validSceneIds = demoScenes.map((scene) => scene.id);

    if (laneId && validLaneIds.includes(laneId)) {
      state.selectedLaneId = laneId;
    }
    if (taskId && validTaskIds.includes(taskId)) {
      state.selectedTaskId = taskId;
    }
    if (sceneId && validSceneIds.includes(sceneId)) {
      state.activeSceneId = sceneId;
    }
    if (step && SHAREABLE_STEPS.includes(step)) {
      state.activeStep = step;
    }
    if (laneId || taskId || step || sceneId) {
      state.sessionBanner = "Loaded state from a shared review link.";
    }
  } catch (_) {
    // Ignore malformed URL state and keep current state.
  }
}

function persistState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      selectedLaneId: state.selectedLaneId,
      selectedTaskId: state.selectedTaskId,
      activeSceneId: state.activeSceneId,
      composerCollapsed: state.composerCollapsed,
      reviewMode: state.reviewMode,
      activeStep: state.activeStep,
      promptDrafts: state.promptDrafts,
      reviewedLanes: state.reviewedLanes,
      approvals: state.approvals,
      providerModes: state.providerModes
    }));
  } catch (_) {
    // Ignore storage write failures in restricted environments.
  }
}

function syncUrlState() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lane", state.selectedLaneId);
    url.searchParams.set("task", state.selectedTaskId);
    url.searchParams.set("step", state.activeStep);
    if (state.activeSceneId) {
      url.searchParams.set("scene", state.activeSceneId);
    } else {
      url.searchParams.delete("scene");
    }
    window.history.replaceState({}, "", url);
  } catch (_) {
    // Ignore URL update failures in restricted environments.
  }
}

function resetState() {
  state.selectedLaneId = "private";
  state.selectedTaskId = "a1c";
  state.activeStep = "compose";
  state.activeSceneId = "";
  state.composerCollapsed = false;
  state.reviewMode = false;
  state.promptDrafts = {};
  state.reviewedLanes = {};
  state.presenterToolsOpen = false;
  state.helpOpen = false;
  state.notesOpen = false;
  state.scriptOpen = false;
  state.approvals = {
    "private-plus": false,
    "max-intelligence": false
  };
  state.providerModes = {
    "private-plus": "managed",
    "max-intelligence": "managed"
  };

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    // Ignore storage clearing failures in restricted environments.
  }

  try {
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, "", url);
  } catch (_) {
    // Ignore URL clearing failures in restricted environments.
  }
}

const laneGrid = document.getElementById("laneGrid");
const sessionBanner = document.getElementById("sessionBanner");
const sessionBannerText = document.getElementById("sessionBannerText");
const dismissBannerButton = document.getElementById("dismissBannerButton");
const actionToast = document.getElementById("actionToast");
const contextTask = document.getElementById("contextTask");
const contextLane = document.getElementById("contextLane");
const contextStep = document.getElementById("contextStep");
const contextScene = document.getElementById("contextScene");
const reviewModeButton = document.getElementById("reviewModeButton");
const contextRecommendedButton = document.getElementById("contextRecommendedButton");
const contextSceneButton = document.getElementById("contextSceneButton");
const contextGuidance = document.getElementById("contextGuidance");
const togglePresenterToolsButton = document.getElementById("togglePresenterToolsButton");
const presenterToolbar = document.getElementById("presenterToolbar");
const sectionNav = document.getElementById("sectionNav");
const toggleHelpButton = document.getElementById("toggleHelpButton");
const helpPanel = document.getElementById("helpPanel");
const closeHelpButton = document.getElementById("closeHelpButton");
const toggleNotesButton = document.getElementById("toggleNotesButton");
const notesPanel = document.getElementById("notesPanel");
const closeNotesButton = document.getElementById("closeNotesButton");
const notesTitle = document.getElementById("notesTitle");
const notesSummary = document.getElementById("notesSummary");
const notesList = document.getElementById("notesList");
const toggleScriptButton = document.getElementById("toggleScriptButton");
const scriptPanel = document.getElementById("scriptPanel");
const closeScriptButton = document.getElementById("closeScriptButton");
const scriptTitle = document.getElementById("scriptTitle");
const scriptSummary = document.getElementById("scriptSummary");
const scriptList = document.getElementById("scriptList");
const sceneActions = document.getElementById("sceneActions");
const toggleComposerButton = document.getElementById("toggleComposerButton");
const composerWrap = document.getElementById("composerWrap");
const taskSelect = document.getElementById("taskSelect");
const providerField = document.getElementById("providerField");
const providerSelect = document.getElementById("providerSelect");
const providerHint = document.getElementById("providerHint");
const promptInput = document.getElementById("promptInput");
const patientSnapshot = document.getElementById("patientSnapshot");
const selectedLaneCard = document.getElementById("selectedLaneCard");
const recommendationCard = document.getElementById("recommendationCard");
const useRecommendedButton = document.getElementById("useRecommendedButton");
const reviewButton = document.getElementById("reviewButton");
const compareButton = document.getElementById("compareButton");
const reviewSection = document.getElementById("reviewSection");
const reviewHeadline = document.getElementById("reviewHeadline");
const modeTitle = document.getElementById("modeTitle");
const modeSummary = document.getElementById("modeSummary");
const insideList = document.getElementById("insideList");
const outsideList = document.getElementById("outsideList");
const controlsList = document.getElementById("controlsList");
const providerModeTitle = document.getElementById("providerModeTitle");
const providerModeSummary = document.getElementById("providerModeSummary");
const payloadPreviewCard = document.getElementById("payloadPreviewCard");
const payloadPreviewTitle = document.getElementById("payloadPreviewTitle");
const payloadPreviewSummary = document.getElementById("payloadPreviewSummary");
const payloadPreviewList = document.getElementById("payloadPreviewList");
const approvalChip = document.getElementById("approvalChip");
const approvalToggleWrap = document.getElementById("approvalToggleWrap");
const approvalToggle = document.getElementById("approvalToggle");
const approvalToggleText = document.getElementById("approvalToggleText");
const editButton = document.getElementById("editButton");
const sendButton = document.getElementById("sendButton");
const resultsSection = document.getElementById("resultsSection");
const resultLaneBadge = document.getElementById("resultLaneBadge");
const resultBoundaryBadge = document.getElementById("resultBoundaryBadge");
const resultTitle = document.getElementById("resultTitle");
const resultSummary = document.getElementById("resultSummary");
const resultBody = document.getElementById("resultBody");
const provenanceRow = document.getElementById("provenanceRow");
const referenceList = document.getElementById("referenceList");
const activityLog = document.getElementById("activityLog");
const reviewSummaryCard = document.getElementById("reviewSummaryCard");
const summaryRequest = document.getElementById("summaryRequest");
const summaryBoundary = document.getElementById("summaryBoundary");
const summaryPayload = document.getElementById("summaryPayload");
const summaryOutput = document.getElementById("summaryOutput");
const copyLinkButton = document.getElementById("copyLinkButton");
const copySummaryButton = document.getElementById("copySummaryButton");
const exportSummaryButton = document.getElementById("exportSummaryButton");
const printSummaryButton = document.getElementById("printSummaryButton");
const resetSessionButton = document.getElementById("resetSessionButton");
const compareSection = document.getElementById("compareSection");
const compareGrid = document.getElementById("compareGrid");
const checklistSection = document.getElementById("checklistSection");
const checklistScore = document.getElementById("checklistScore");
const checklistGrid = document.getElementById("checklistGrid");
const completeChecklistButton = document.getElementById("completeChecklistButton");
let toastTimer = null;
let activeSectionId = "section-home";

function getSelectedLane() {
  return laneBase[state.selectedLaneId];
}

function getSelectedTask() {
  return tasks.find((task) => task.id === state.selectedTaskId);
}

function getSelectedContent() {
  const task = getSelectedTask();
  return task.results[state.selectedLaneId];
}

function getPromptValue() {
  const task = getSelectedTask();
  return state.promptDrafts[state.selectedTaskId] || task.prompt;
}

function getProviderMode() {
  const providerModeId = state.providerModes[state.selectedLaneId];
  return providerModes[providerModeId] || providerModes.managed;
}

function isExternalLane(laneId) {
  return laneId === "private-plus" || laneId === "max-intelligence";
}

function renderSessionBanner() {
  if (state.sessionBanner) {
    sessionBanner.classList.remove("hidden");
    sessionBannerText.textContent = state.sessionBanner;
  } else {
    sessionBanner.classList.add("hidden");
    sessionBannerText.textContent = "";
  }
}

function renderToast() {
  if (state.toastMessage) {
    actionToast.classList.remove("hidden");
    actionToast.textContent = state.toastMessage;
  } else {
    actionToast.classList.add("hidden");
    actionToast.textContent = "";
  }
}

function showToast(message) {
  state.toastMessage = message;
  renderToast();

  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }

  toastTimer = window.setTimeout(() => {
    state.toastMessage = "";
    renderToast();
  }, 1600);
}

function renderContextBar() {
  const task = getSelectedTask();
  const lane = getSelectedLane();
  const activeScene = demoScenes.find((scene) => scene.id === state.activeSceneId);
  const stepLabel = STEP_LABELS[state.activeStep] || state.activeStep;
  const stepGuidance = STEP_GUIDANCE[state.activeStep] || "";
  const isRecommended = task.recommendedLaneId === lane.id;

  contextTask.textContent = `Task: ${task.label}`;
  contextLane.textContent = `Lane: ${lane.name}`;
  contextStep.textContent = `Phase: ${stepLabel}`;
  contextScene.textContent = `Scene: ${activeScene ? activeScene.label : "Custom state"}`;
  reviewModeButton.textContent = state.reviewMode ? "Exit review mode" : "Enter review mode";
  contextGuidance.textContent = stepGuidance;
  contextRecommendedButton.disabled = isRecommended;
  contextRecommendedButton.textContent = isRecommended
    ? "Recommended lane active"
    : `Open recommended lane (${laneBase[task.recommendedLaneId].name})`;
  contextSceneButton.disabled = !activeScene;
  contextSceneButton.textContent = activeScene
    ? `Return to scene (${activeScene.label})`
    : "No active scene";
}

function applyLaneTheme() {
  const lane = getSelectedLane();
  const rgb = hexToRgb(lane.color);

  document.documentElement.style.setProperty("--lane-accent", lane.color);
  document.documentElement.style.setProperty("--lane-accent-soft", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.14)`);
  document.documentElement.style.setProperty("--lane-accent-line", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28)`);
}

function renderPresenterToolbar() {
  presenterToolbar.classList.toggle("hidden", !state.presenterToolsOpen);
  togglePresenterToolsButton.setAttribute("aria-expanded", String(state.presenterToolsOpen));
}

function renderComposerState() {
  composerWrap.classList.toggle("is-collapsed", state.composerCollapsed);
  toggleComposerButton.setAttribute("aria-expanded", String(!state.composerCollapsed));
  toggleComposerButton.textContent = state.composerCollapsed ? "Expand task lane" : "Minimize task lane";
}

function getVisibleSections() {
  return [
    document.getElementById("section-home"),
    document.getElementById("section-lanes"),
    document.getElementById("section-compose"),
    document.getElementById("reviewSection"),
    document.getElementById("resultsSection"),
    document.getElementById("compareSection"),
    document.getElementById("checklistSection")
  ].filter(Boolean);
}

function getSectionNavId(section) {
  return section.dataset.sectionId || section.id;
}

function renderSectionNav() {
  if (!sectionNav) {
    return;
  }

  sectionNav.querySelectorAll("[data-section-link]").forEach((link) => {
    const isActive = link.getAttribute("data-section-link") === activeSectionId;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function updateActiveSectionFromScroll() {
  const candidates = getVisibleSections().filter((section) => {
    const style = window.getComputedStyle(section);
    return style.display !== "none";
  });

  let nextActive = candidates[0] ? getSectionNavId(candidates[0]) : "section-home";
  const threshold = 180;

  candidates.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= threshold) {
      nextActive = getSectionNavId(section);
    }
  });

  if (nextActive !== activeSectionId) {
    activeSectionId = nextActive;
    renderSectionNav();
  }
}

function renderReviewMode() {
  document.body.classList.toggle("review-mode", state.reviewMode);
}

function applyVisibleSections() {
  reviewSection.classList.toggle("visible", state.activeStep === "review" || state.activeStep === "result" || state.activeStep === "audit");
  resultsSection.classList.toggle("visible", state.activeStep === "result" || state.activeStep === "audit");
  compareSection.classList.toggle("visible", state.activeStep === "result" || state.activeStep === "audit");
  checklistSection.classList.toggle("visible", state.activeStep === "result" || state.activeStep === "audit");
}

function renderScenes() {
  sceneActions.innerHTML = demoScenes.map((scene) => `
    <button class="scene-chip ${scene.id === state.activeSceneId ? "is-active" : ""}" type="button" data-scene-id="${scene.id}" aria-pressed="${scene.id === state.activeSceneId}">
      <strong>${scene.label}</strong>
      <span>${scene.summary}</span>
    </button>
  `).join("");

  sceneActions.querySelectorAll("[data-scene-id]").forEach((button) => {
    button.addEventListener("click", () => {
      applyDemoScene(button.getAttribute("data-scene-id"));
    });
  });
}

function renderHelpPanel() {
  helpPanel.classList.toggle("hidden", !state.helpOpen);
  toggleHelpButton.setAttribute("aria-expanded", String(state.helpOpen));
}

function renderNotesPanel() {
  const lane = getSelectedLane();
  const task = getSelectedTask();

  notesPanel.classList.toggle("hidden", !state.notesOpen);
  toggleNotesButton.setAttribute("aria-expanded", String(state.notesOpen));
  notesTitle.textContent = `${lane.name} notes for "${task.label}"`;
  notesSummary.textContent = `Recommended lane: ${laneBase[task.recommendedLaneId].name}. Current lane: ${lane.name}.`;
  notesList.innerHTML = [
    `Task framing: ${task.recommendationReason}`,
    ...laneNotes[lane.id]
  ].map((item) => `<li>${item}</li>`).join("");
}

function renderScriptPanel() {
  const lane = getSelectedLane();
  const task = getSelectedTask();

  scriptPanel.classList.toggle("hidden", !state.scriptOpen);
  toggleScriptButton.setAttribute("aria-expanded", String(state.scriptOpen));
  scriptTitle.textContent = `${lane.name} walkthrough`;
  scriptSummary.textContent = `Use this sequence while showing "${task.label}" in the ${lane.name} lane.`;
  scriptList.innerHTML = [
    `Open with the task framing: ${task.recommendationReason}`,
    ...laneScripts[lane.id]
  ].map((item) => `<li>${item}</li>`).join("");
}

function openReviewSection() {
  state.activeStep = "review";
  render();
  reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openCompareSection() {
  state.activeStep = "compose";
  render();
  compareSection.classList.add("visible");
  checklistSection.classList.add("visible");
  compareSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openChecklistSection() {
  render();
  checklistSection.classList.add("visible");
  checklistSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function runDemoRequest() {
  const lane = getSelectedLane();
  if (lane.needsApproval && !state.approvals[lane.id]) {
    openReviewSection();
    return;
  }

  state.activeStep = "audit";
  render();
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyDemoScene(sceneId) {
  const scene = demoScenes.find((entry) => entry.id === sceneId);
  if (!scene) {
    return;
  }

  state.activeSceneId = scene.id;
  state.selectedTaskId = scene.taskId;
  state.selectedLaneId = scene.laneId;
  state.activeStep = scene.step === "result" ? "audit" : scene.step;
  state.approvals["private-plus"] = false;
  state.approvals["max-intelligence"] = false;
  if (typeof scene.approval === "boolean" && isExternalLane(scene.laneId)) {
    state.approvals[scene.laneId] = scene.approval;
  }
  if (scene.providerMode && isExternalLane(scene.laneId)) {
    state.providerModes[scene.laneId] = scene.providerMode;
  }

  state.sessionBanner = `Loaded demo scene: ${scene.label}.`;
  render();
  showToast(`Scene loaded: ${scene.label}`);
}

function shouldIgnoreShortcut(target) {
  return Boolean(target.closest("input, textarea, select, button"));
}

function renderLaneCards() {
  laneGrid.innerHTML = "";

  Object.values(laneBase).forEach((lane) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `lane-card${lane.id === state.selectedLaneId ? " selected" : ""}`;
    card.setAttribute("aria-pressed", String(lane.id === state.selectedLaneId));
    card.innerHTML = `
      <div class="lane-kicker">
        <span class="lane-dot" style="background:${lane.color}"></span>
        <span>${lane.tag}</span>
      </div>
      <h3>${lane.name}</h3>
      <p>${lane.summary}</p>
      <div class="lane-meta">
        <div>
          <span class="meta-label">Trust statement</span>
          <span>${lane.trustStatement}</span>
        </div>
        <div>
          <span class="meta-label">External boundary</span>
          <span>${lane.boundaryLabel}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      state.selectedLaneId = lane.id;
      state.activeSceneId = "";
      render();
    });

    laneGrid.appendChild(card);
  });
}

function renderTasks() {
  taskSelect.innerHTML = tasks.map((task) => `<option value="${task.id}">${task.label}</option>`).join("");
  taskSelect.value = state.selectedTaskId;

  const task = getSelectedTask();
  promptInput.value = getPromptValue();
  patientSnapshot.innerHTML = `
    <p class="field-label">Demo record snapshot</p>
    <div class="snapshot-grid">
      ${task.snapshot.map(([label, value]) => `
        <div class="snapshot-item">
          <strong>${label}</strong>
          <span>${value}</span>
        </div>
      `).join("")}
    </div>
  `;

  const lane = getSelectedLane();
  if (isExternalLane(lane.id)) {
    providerField.classList.remove("hidden");
    providerSelect.innerHTML = Object.values(providerModes)
      .map((mode) => `<option value="${mode.id}">${mode.label}</option>`)
      .join("");
    providerSelect.value = state.providerModes[lane.id];
    providerHint.textContent = lane.id === "private-plus"
      ? "Secondary option only. Consentext still sends only the approved reduced payload."
      : "Most natural fit for BYOK, but Consentext still remains the gateway in front of the model.";
  } else {
    providerField.classList.add("hidden");
    providerSelect.innerHTML = "";
    providerHint.textContent = "";
  }
}

function renderSelectedLane() {
  const lane = getSelectedLane();
  const task = getSelectedTask();
  const providerMode = getProviderMode();
  const providerLine = isExternalLane(lane.id)
    ? providerMode.shortLabel
    : "Not available in this lane";
  const recommendedLane = laneBase[task.recommendedLaneId];
  const isRecommended = task.recommendedLaneId === lane.id;

  selectedLaneCard.innerHTML = `
    <div class="lane-kicker">
      <span class="lane-dot" style="background:${lane.color}"></span>
      <span>${lane.tag}</span>
    </div>
    <h3>${lane.name}</h3>
    <p>${lane.trustStatement}</p>
    <div class="lane-meta">
      <div>
        <span class="meta-label">What may leave</span>
        <span>${lane.outside[0]}</span>
      </div>
      <div>
        <span class="meta-label">Approval</span>
        <span>${lane.approval}</span>
      </div>
      <div>
        <span class="meta-label">Connection mode</span>
        <span>${providerLine}</span>
      </div>
    </div>
  `;

  recommendationCard.className = `recommendation-card${isRecommended ? " is-match" : ""}`;
  recommendationCard.innerHTML = `
    <p class="review-label">Recommended lane for this task</p>
    <h3>${recommendedLane.name}</h3>
    <p>${task.recommendationReason}</p>
    <p><strong>Current lane:</strong> ${lane.consumerExplainer}</p>
    <p><strong>${isRecommended ? "Current selection matches." : "Current selection differs."}</strong></p>
  `;
  useRecommendedButton.disabled = isRecommended;
}

function renderReview() {
  const lane = getSelectedLane();
  const providerMode = getProviderMode();
  reviewHeadline.textContent = `${lane.name} keeps the gateway in front of the interaction and makes the boundary visible before the request runs.`;
  modeTitle.textContent = lane.modeTitle;
  modeSummary.textContent = lane.modeSummary;
  insideList.innerHTML = lane.inside.map((item) => `<li>${item}</li>`).join("");
  outsideList.innerHTML = lane.outside.map((item) => `<li>${item}</li>`).join("");
  controlsList.innerHTML = lane.controls.map((item) => `<li>${item}</li>`).join("");
  approvalChip.textContent = lane.approval;
  approvalChip.className = `approval-chip${lane.needsApproval ? " warning" : ""}`;

  if (isExternalLane(lane.id)) {
    providerModeTitle.textContent = providerMode.label;
    providerModeSummary.textContent = providerMode.summary;
  } else {
    providerModeTitle.textContent = "No outside provider connection";
    providerModeSummary.textContent = "This lane does not use a provider connection or a user-supplied key.";
  }

  payloadPreviewTitle.textContent = lane.payloadPreview.title;
  payloadPreviewSummary.textContent = lane.payloadPreview.summary;
  payloadPreviewList.innerHTML = lane.payloadPreview.items.map((item) => `<li>${item}</li>`).join("");
  payloadPreviewCard.classList.toggle("warning", lane.needsApproval);

  if (lane.needsApproval) {
    approvalToggleWrap.classList.remove("hidden");
    approvalToggle.checked = Boolean(state.approvals[lane.id]);
    approvalToggleText.textContent = `${lane.approvalWarning} ${lane.approvalText}`;
    sendButton.disabled = !approvalToggle.checked;
    sendButton.style.opacity = approvalToggle.checked ? "1" : "0.55";
    sendButton.textContent = "Run approved demo request";
  } else {
    approvalToggleWrap.classList.add("hidden");
    approvalToggle.checked = false;
    approvalToggleText.textContent = "";
    sendButton.disabled = false;
    sendButton.style.opacity = "1";
    sendButton.textContent = "Run demo request";
  }
}

function buildAuditTrail() {
  const lane = getSelectedLane();
  const task = getSelectedTask();
  const providerMode = getProviderMode();
  const items = [
    { type: "routing", label: "Routing", text: `Request received and mapped to the ${lane.name} lane.` },
    { type: "internal", label: "Internal", text: `Task selected: ${task.label}. Internal record context prepared inside Consentext.` }
  ];

  if (lane.needsApproval) {
    items.push({
      type: "approval",
      label: "Approval",
      text: state.approvals[lane.id]
        ? `Explicit approval recorded for ${lane.boundaryLabel.toLowerCase()}.`
        : `Explicit approval still required for ${lane.boundaryLabel.toLowerCase()}.`
    });
  } else {
    items.push({
      type: "approval",
      label: "Approval",
      text: "No external approval required for this lane."
    });
  }

  items.push({
    type: "routing",
    label: "Connection",
    text: isExternalLane(lane.id)
      ? `${providerMode.label} selected. Consentext remains in the middle for the external step.`
      : "No outside provider connection used."
  });

  if (lane.id === "deterministic") {
    items.push(
      { type: "internal", label: "Internal", text: "Deterministic extraction, calculation, and templated summarization completed inside Consentext." },
      { type: "internal", label: "Result", text: "Result returned with record references and no outbound payload." }
    );
  } else if (lane.id === "private") {
    items.push(
      { type: "internal", label: "Internal", text: "Controlled internal AI generated the explanation without sending sensitive record work outward." },
      { type: "internal", label: "Result", text: "Protected result returned inside Consentext with an internal audit receipt." }
    );
  } else if (lane.id === "private-plus") {
    items.push(
      { type: "external", label: "Payload", text: "Reduced, de-identified payload prepared from internal facts under minimum-necessary policy." },
      { type: "external", label: "External", text: "Outside language assist completed through Consentext without exposing the raw record." },
      { type: "internal", label: "Result", text: "Hybrid result returned with internal references and reduced-boundary labeling." }
    );
  } else {
    items.push(
      { type: "external", label: "Payload", text: "Broader context bundle prepared under user-approved external lane rules." },
      { type: "external", label: "External", text: "Broader outside-model assist completed while Consentext preserved routing, warning, and logging." },
      { type: "internal", label: "Result", text: "Result returned inside Consentext with broad-boundary labeling and audit receipt." }
    );
  }

  return items;
}

function renderCompare() {
  const task = getSelectedTask();
  compareGrid.innerHTML = Object.values(laneBase).map((lane) => {
    const content = task.results[lane.id];
    const providerMode = providerModes[state.providerModes[lane.id]] || providerModes.managed;
    const connectionText = isExternalLane(lane.id)
      ? state.providerModes[lane.id] === "byok"
        ? "BYOK available while Consentext remains in the middle."
        : "Consentext-managed external connection."
      : "No outside connection used.";
    const approvalText = lane.needsApproval
      ? state.approvals[lane.id]
        ? "Approval recorded"
        : "Approval required"
      : "No approval required";

    return `
      <button class="compare-card ${lane.id === state.selectedLaneId ? "is-selected" : ""}" type="button" data-lane-id="${lane.id}" aria-pressed="${lane.id === state.selectedLaneId}">
        <div class="lane-kicker">
          <span class="lane-dot" style="background:${lane.color}"></span>
          <span>${lane.name}</span>
        </div>
        <div class="compare-stack">
          <div class="compare-panel">
            <p class="compare-label">Boundary</p>
            <p class="compare-boundary">${lane.boundaryLabel}</p>
            <p>${approvalText}</p>
          </div>
          <div class="compare-panel">
            <p class="compare-label">Connection</p>
            <p class="compare-connection">${connectionText}</p>
            <p>${isExternalLane(lane.id) ? providerMode.label : "Internal only"}</p>
          </div>
          <div class="compare-panel">
            <p class="compare-label">Payload</p>
            <p>${lane.payloadPreview.summary}</p>
            <ul>${lane.payloadPreview.items.slice(0, 2).map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
          <div class="compare-panel">
            <p class="compare-label">Output</p>
            <p class="compare-output-title">${content.title}</p>
            <ul>${content.bullets.slice(0, 2).map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
        </div>
      </button>
    `;
  }).join("");

  compareGrid.querySelectorAll("[data-lane-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedLaneId = card.getAttribute("data-lane-id");
      state.activeStep = "compose";
      render();
      selectedLaneCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}

function renderChecklist() {
  const reviewedLaneIds = Object.keys(state.reviewedLanes).filter((laneId) => state.reviewedLanes[laneId]);
  const reviewedCount = reviewedLaneIds.length;
  const lane = getSelectedLane();
  const isExternal = isExternalLane(lane.id);

  checklistScore.textContent = `${reviewedCount} of ${Object.keys(laneBase).length} lanes reviewed`;
  completeChecklistButton.textContent = state.reviewedLanes[state.selectedLaneId]
    ? "Current lane marked reviewed"
    : "Mark current lane reviewed";
  completeChecklistButton.disabled = Boolean(state.reviewedLanes[state.selectedLaneId]);

  checklistGrid.innerHTML = reviewChecklist.map((item) => {
    let status = "Check during review";

    if (item.id === "private-internal") {
      status = lane.id === "private"
        ? "Best checked in this lane"
        : "Switch to Private to verify this directly";
    } else if (item.id === "external-distinction") {
      status = isExternal
        ? "Check external boundary wording and payload story here"
        : "Switch to Private+ or Max Intelligence to verify this directly";
    } else if (item.id === "boundary-visible") {
      status = state.activeStep === "review" || state.activeStep === "audit"
        ? "Boundary review currently in focus"
        : "Open the boundary review to verify this";
    } else if (item.id === "audit-governed") {
      status = state.activeStep === "audit"
        ? "Audit/result state currently in focus"
        : "Run the demo request to verify this";
    }

    return `
      <article class="checklist-card">
        <div class="checklist-card-top">
          <p class="review-label">Checklist item</p>
          <span class="checklist-status">${status}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
      </article>
    `;
  }).join("");
}

function renderResult() {
  const lane = getSelectedLane();
  const task = getSelectedTask();
  const content = getSelectedContent();
  const providerMode = getProviderMode();
  const providerLine = isExternalLane(lane.id)
    ? `<p><strong>Connection mode:</strong> <span class="connection-inline ${providerMode.id}">${providerMode.label}</span></p>`
    : "";

  resultLaneBadge.textContent = lane.name;
  resultBoundaryBadge.textContent = lane.boundaryLabel;
  resultTitle.textContent = content.title;
  resultSummary.textContent = `${content.summary} Task: ${task.label}.`;
  resultBody.innerHTML = `
    <p><strong>Prompt used:</strong> ${getPromptValue().trim()}</p>
    ${providerLine}
    <ul>${content.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  provenanceRow.innerHTML = content.provenance.map((item) => `<div class="provenance-chip">${item}</div>`).join("");
  referenceList.innerHTML = content.references.map((item) => `<li>${item}</li>`).join("");
  activityLog.innerHTML = buildAuditTrail().map((item, index) => `
    <div class="activity-item ${item.type}">
      <div class="activity-bullet"></div>
      <div>
        <span>${item.label} | Step ${index + 1}</span>
        <p>${item.text}</p>
      </div>
    </div>
  `).join("");
}

function renderReviewSummary() {
  const lane = getSelectedLane();
  const task = getSelectedTask();
  const content = getSelectedContent();
  const providerMode = getProviderMode();
  const recommendedLane = laneBase[task.recommendedLaneId];
  const activeScene = demoScenes.find((scene) => scene.id === state.activeSceneId);
  const stepLabel = STEP_LABELS[state.activeStep] || state.activeStep;
  const approvalText = lane.needsApproval
    ? state.approvals[lane.id]
      ? "Explicit approval recorded"
      : "Approval required before send"
    : "No external approval required";
  const connectionText = isExternalLane(lane.id)
    ? providerMode.label
    : "No outside provider connection";

  summaryRequest.innerHTML = `
    <p><strong>Task:</strong> ${task.label}</p>
    <p><strong>Prompt:</strong> ${getPromptValue().trim()}</p>
  `;

  summaryBoundary.innerHTML = `
    <p><strong>Lane:</strong> ${lane.name}</p>
    <p><strong>Phase:</strong> ${stepLabel}</p>
    <p><strong>Demo scene:</strong> ${activeScene ? activeScene.label : "Custom state"}</p>
    <p><strong>Recommended lane:</strong> ${recommendedLane.name}</p>
    <p><strong>Boundary:</strong> ${lane.boundaryLabel}</p>
    <p><strong>Approval:</strong> ${approvalText}</p>
  `;

  summaryPayload.innerHTML = `
    <p><strong>Connection:</strong> ${connectionText}</p>
    <p><strong>Recommendation rationale:</strong> ${task.recommendationReason}</p>
    <p><strong>Payload summary:</strong> ${lane.payloadPreview.summary}</p>
    <ul>${lane.payloadPreview.items.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;

  summaryOutput.innerHTML = `
    <p><strong>Result:</strong> ${content.title}</p>
    <ul>${content.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;

  reviewSummaryCard.classList.toggle("warning", lane.needsApproval);
}

function buildSummaryExportText() {
  const lane = getSelectedLane();
  const task = getSelectedTask();
  const content = getSelectedContent();
  const providerMode = getProviderMode();
  const recommendedLane = laneBase[task.recommendedLaneId];
  const activeScene = demoScenes.find((scene) => scene.id === state.activeSceneId);
  const stepLabel = STEP_LABELS[state.activeStep] || state.activeStep;
  const approvalText = lane.needsApproval
    ? state.approvals[lane.id]
      ? "Explicit approval recorded"
      : "Approval required before send"
    : "No external approval required";
  const connectionText = isExternalLane(lane.id)
    ? providerMode.label
    : "No outside provider connection";

  return [
    "Consentext AI Gateway Internal Review Summary",
    "",
    `Task: ${task.label}`,
    `Prompt: ${getPromptValue().trim()}`,
    "",
    `Demo scene: ${activeScene ? activeScene.label : "Custom state"}`,
    `Phase: ${stepLabel}`,
    `Selected lane: ${lane.name}`,
    `Recommended lane: ${recommendedLane.name}`,
    `Recommendation rationale: ${task.recommendationReason}`,
    `Boundary: ${lane.boundaryLabel}`,
    `Approval: ${approvalText}`,
    `Connection: ${connectionText}`,
    "",
    "Payload summary:",
    lane.payloadPreview.summary,
    ...lane.payloadPreview.items.map((item) => `- ${item}`),
    "",
    "Key output points:",
    ...content.bullets.map((item) => `- ${item}`),
    "",
    "Audit trail:",
    ...buildAuditTrail().map((item, index) => `${index + 1}. [${item.label}] ${item.text}`)
  ].join("\n");
}

function exportSummary() {
  const blob = new Blob([buildSummaryExportText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const task = getSelectedTask();
  const lane = getSelectedLane();
  const dateStamp = "2026-03-10";

  link.href = url;
  link.download = `consentext-gateway-summary-${task.id}-${lane.id}-${dateStamp}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Summary exported");
}

async function copyShareLink() {
  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.set("lane", state.selectedLaneId);
  shareUrl.searchParams.set("task", state.selectedTaskId);
  shareUrl.searchParams.set("step", state.activeStep);
  if (state.activeSceneId) {
    shareUrl.searchParams.set("scene", state.activeSceneId);
  } else {
    shareUrl.searchParams.delete("scene");
  }

  try {
    await navigator.clipboard.writeText(shareUrl.toString());
    showToast("Share link copied");
  } catch (_) {
    showToast("Copy link failed");
  }
}

async function copySummaryText() {
  try {
    await navigator.clipboard.writeText(buildSummaryExportText());
    showToast("Summary copied");
  } catch (_) {
    showToast("Copy summary failed");
  }
}

function render() {
  renderReviewMode();
  applyLaneTheme();
  renderSessionBanner();
  renderToast();
  renderContextBar();
  renderPresenterToolbar();
  renderComposerState();
  renderHelpPanel();
  renderNotesPanel();
  renderScriptPanel();
  renderScenes();
  renderLaneCards();
  renderTasks();
  renderSelectedLane();
  renderReview();
  renderResult();
  renderReviewSummary();
  renderCompare();
  renderChecklist();
  applyVisibleSections();
  renderSectionNav();
  window.requestAnimationFrame(updateActiveSectionFromScroll);
  syncUrlState();
  persistState();
}

taskSelect.addEventListener("change", (event) => {
  state.selectedTaskId = event.target.value;
  state.activeStep = "compose";
  state.activeSceneId = "";
  render();
});

promptInput.addEventListener("input", (event) => {
  state.promptDrafts[state.selectedTaskId] = event.target.value;
  state.activeSceneId = "";
});

providerSelect.addEventListener("change", (event) => {
  const lane = getSelectedLane();
  if (isExternalLane(lane.id)) {
    state.providerModes[lane.id] = event.target.value;
    state.activeSceneId = "";
    render();
  }
});

approvalToggle.addEventListener("change", (event) => {
  const lane = getSelectedLane();
  if (lane.needsApproval) {
    state.approvals[lane.id] = event.target.checked;
    state.activeStep = "review";
    state.activeSceneId = "";
    renderReview();
  }
});

reviewButton.addEventListener("click", () => {
  openReviewSection();
});

compareButton.addEventListener("click", () => {
  openCompareSection();
});

useRecommendedButton.addEventListener("click", () => {
  const task = getSelectedTask();
  state.selectedLaneId = task.recommendedLaneId;
  state.activeStep = "compose";
  state.activeSceneId = "";
  render();
  selectedLaneCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

editButton.addEventListener("click", () => {
  state.activeStep = "compose";
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateJourney();
});

sendButton.addEventListener("click", () => {
  runDemoRequest();
});

completeChecklistButton.addEventListener("click", () => {
  state.reviewedLanes[state.selectedLaneId] = true;
  checklistSection.classList.add("visible");
  renderChecklist();
});

printSummaryButton.addEventListener("click", () => {
  window.print();
});

exportSummaryButton.addEventListener("click", () => {
  exportSummary();
});

copyLinkButton.addEventListener("click", () => {
  copyShareLink();
});

copySummaryButton.addEventListener("click", () => {
  copySummaryText();
});

reviewModeButton.addEventListener("click", () => {
  state.reviewMode = !state.reviewMode;
  showToast(state.reviewMode ? "Review mode enabled" : "Review mode disabled");
  render();
});

contextRecommendedButton.addEventListener("click", () => {
  const task = getSelectedTask();
  state.selectedLaneId = task.recommendedLaneId;
  state.activeSceneId = "";
  showToast(`Switched to recommended lane: ${laneBase[task.recommendedLaneId].name}`);
  render();
});

contextSceneButton.addEventListener("click", () => {
  if (!state.activeSceneId) {
    return;
  }

  applyDemoScene(state.activeSceneId);
});

resetSessionButton.addEventListener("click", () => {
  resetState();
  state.sessionBanner = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
  showToast("Session reset");
});

dismissBannerButton.addEventListener("click", () => {
  state.sessionBanner = "";
  renderSessionBanner();
});

toggleHelpButton.addEventListener("click", () => {
  state.helpOpen = !state.helpOpen;
  renderHelpPanel();
});

closeHelpButton.addEventListener("click", () => {
  state.helpOpen = false;
  renderHelpPanel();
});

toggleNotesButton.addEventListener("click", () => {
  state.notesOpen = !state.notesOpen;
  renderNotesPanel();
});

closeNotesButton.addEventListener("click", () => {
  state.notesOpen = false;
  renderNotesPanel();
});

toggleScriptButton.addEventListener("click", () => {
  state.scriptOpen = !state.scriptOpen;
  renderScriptPanel();
});

closeScriptButton.addEventListener("click", () => {
  state.scriptOpen = false;
  renderScriptPanel();
});

togglePresenterToolsButton.addEventListener("click", () => {
  state.presenterToolsOpen = !state.presenterToolsOpen;
  renderPresenterToolbar();
});

toggleComposerButton.addEventListener("click", () => {
  state.composerCollapsed = !state.composerCollapsed;
  showToast(state.composerCollapsed ? "Task lane minimized" : "Task lane expanded");
  renderComposerState();
  persistState();
});

document.addEventListener("keydown", (event) => {
  if (shouldIgnoreShortcut(event.target)) {
    return;
  }

  if (event.key === "Escape") {
    state.presenterToolsOpen = false;
    state.helpOpen = false;
    state.notesOpen = false;
    state.scriptOpen = false;
    renderPresenterToolbar();
    renderHelpPanel();
    renderNotesPanel();
    renderScriptPanel();
    return;
  }

  if (event.key === "?") {
    event.preventDefault();
    state.helpOpen = !state.helpOpen;
    renderHelpPanel();
    return;
  }

  if (event.key.toLowerCase() === "n") {
    state.notesOpen = !state.notesOpen;
    renderNotesPanel();
    return;
  }

  if (event.key.toLowerCase() === "d") {
    state.scriptOpen = !state.scriptOpen;
    renderScriptPanel();
    return;
  }

  if (event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4") {
    const laneOrder = ["deterministic", "private", "private-plus", "max-intelligence"];
    state.selectedLaneId = laneOrder[Number(event.key) - 1];
    state.activeStep = "compose";
    render();
    return;
  }

  const lowerKey = event.key.toLowerCase();
  if (lowerKey === "r") {
    openReviewSection();
  } else if (lowerKey === "g") {
    runDemoRequest();
  } else if (lowerKey === "c") {
    openCompareSection();
  } else if (lowerKey === "k") {
    openChecklistSection();
  } else if (lowerKey === "m") {
    const task = getSelectedTask();
    state.selectedLaneId = task.recommendedLaneId;
    state.activeSceneId = "";
    showToast(`Switched to recommended lane: ${laneBase[task.recommendedLaneId].name}`);
    render();
  } else if (lowerKey === "s" && state.activeSceneId) {
    applyDemoScene(state.activeSceneId);
  } else if (lowerKey === "l") {
    copyShareLink();
  } else if (lowerKey === "y") {
    copySummaryText();
  }
});

window.addEventListener("scroll", updateActiveSectionFromScroll, { passive: true });

loadPersistedState();
loadStateFromUrl();
render();
