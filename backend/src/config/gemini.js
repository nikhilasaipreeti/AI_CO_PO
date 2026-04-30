const {
    GoogleGenerativeAI
} = require('@google/generative-ai');

class GeminiConfig {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        // Use gemini-2.0-flash (correct model name for new SDK)
        this.model = this.genAI.getGenerativeModel({
            model: 'gemini-2.0-flash'
        });
        this.fallbackModel = this.genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-lite'
        });
    }

    async generateContent(prompt, temperature = 0.7, userMessage = null) {
        // Store user message for smart fallback matching
        if (userMessage) this._lastUserMessage = userMessage;

        // Try primary model first, then fallback, then smart fallback
        const models = [this.model, this.fallbackModel];

        for (let i = 0; i < models.length; i++) {
            try {
                const result = await models[i].generateContent({
                    contents: [{
                        role: 'user',
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: temperature,
                        maxOutputTokens: 2048,
                    },
                });
                const response = await result.response;
                const text = response.text();
                console.log(`✅ Gemini response from model ${i + 1}`);
                return text;
            } catch (error) {
                const msg = error.message || '';
                if (msg.includes('429')) {
                    // Check if daily quota is exhausted (no point retrying other models)
                    if (msg.includes('PerDay') || msg.includes('per day') || msg.includes('limit: 0')) {
                        console.log('⚠️  Daily Gemini free-tier quota exhausted. Using intelligent OBE fallback.');
                        break;
                    }
                    console.log(`⚠️  Rate limit on model ${i + 1}, ${i < models.length - 1 ? 'trying fallback...' : 'using smart fallback.'}`);
                    if (i < models.length - 1) {
                        await new Promise(r => setTimeout(r, 1000)); // 1s delay before retry
                        continue;
                    }
                } else if (msg.includes('403') || msg.includes('leaked')) {
                    console.error('❌ Gemini API key issue:', msg.substring(0, 80));
                    break;
                } else {
                    console.error(`❌ Gemini model ${i + 1} error:`, msg.substring(0, 80));
                }
            }
        }

        console.log('ℹ️  Using intelligent OBE fallback response.');
        return this.getSmartFallback(this._lastUserMessage || prompt);
    }

    async generateJSON(prompt) {
        try {
            const jsonPrompt = `${prompt}\n\nReturn the response as a valid JSON object only, no other text.`;
            const result = await this.generateContent(jsonPrompt, 0.2);

            // Clean the response to ensure it's valid JSON
            const cleanedResult = result.replace(/```json\n?|```/g, '').trim();
            return JSON.parse(cleanedResult);
        } catch (error) {
            console.error('❌ Failed to parse Gemini response as JSON:', error);
            // Return mock JSON based on prompt
            return this.getMockJSON(prompt);
        }
    }

    // Smart OBE-specific fallback responses when API is unavailable
    getSmartFallback(userMessage) {
        const p = (userMessage || '').toLowerCase();

        // ── Greetings ──────────────────────────────────────────────
        if (p.match(/^(hi|hello|hey|good morning|good afternoon|howdy|greetings)/)) {
            return `## Hello! 👋 I'm your AI OBE Assistant

I'm specialized in **Outcome Based Education (OBE)** and can help you with:

- 📚 **Course Outcomes (COs)** — generate, write, and manage
- 🔗 **CO-PO-PSO Mapping** — with strength levels 1/2/3
- 🧠 **Bloom's Taxonomy** — classify questions and COs
- 📊 **Attainment Calculation** — CO, PO, PSO levels
- 🏆 **NBA Accreditation** — SAR, reports, compliance
- 📝 **Marks Entry** — upload Excel or enter manually

What would you like to know today?`;
        }

        // ── Bloom's Taxonomy ───────────────────────────────────────
        if (p.includes('bloom')) {
            return `## Bloom's Taxonomy in OBE

Bloom's Taxonomy classifies learning into **6 cognitive levels** (low → high):

| Level | Action Verbs | Example Question |
|-------|-------------|-----------------|
| **1. Remember** | List, Recall, Define, State | "List the data types in C++" |
| **2. Understand** | Explain, Describe, Summarize | "Explain how a stack works" |
| **3. Apply** | Solve, Use, Implement, Write | "Write a program to sort an array" |
| **4. Analyze** | Compare, Differentiate, Examine | "Compare BFS and DFS algorithms" |
| **5. Evaluate** | Justify, Critique, Assess | "Evaluate the efficiency of quicksort" |
| **6. Create** | Design, Develop, Construct | "Design a library management system" |

**Why it matters in OBE:**
- Each CO must target a specific Bloom's level
- Higher levels = deeper learning
- NBA expects a mix of levels across COs
- Our AI auto-classifies questions to Bloom's levels

**Tip:** Aim for at least 2 COs at Apply/Analyze level and 1 at Evaluate/Create.`;
        }

        // ── CO Attainment ──────────────────────────────────────────
        if (p.includes('attainment') || p.includes('level 1') || p.includes('level 2') || p.includes('level 3')) {
            return `## CO Attainment Calculation

**Formula:**
\`\`\`
Attainment % = (Students scoring ≥ threshold / Total students) × 100
\`\`\`

**Attainment Levels:**
| Level | Condition | Meaning |
|-------|-----------|---------|
| **Level 1** | ≥ 50% students pass | Satisfactory |
| **Level 2** | ≥ 60% students pass | Good |
| **Level 3** | ≥ 70% students pass | Excellent |

**Worked Example:**
- Exam: 3 questions → Q1 maps to CO1, Q2 → CO2, Q3 → CO3
- Total students: 60
- Students scoring ≥ 60% in CO1 questions: 45
- **CO1 Attainment = (45/60) × 100 = 75% → Level 3 ✅**

**PO Attainment:**
> PO Attainment = Weighted average of all CO attainments mapped to that PO

**Steps in this system:**
1. Enter marks → **Marks Entry** page
2. Map questions to COs → **Question Mapping** page
3. Click Calculate → **Attainment** page
4. View charts and export reports`;
        }

        // ── CO-PO Mapping ──────────────────────────────────────────
        if ((p.includes('co') && p.includes('po')) || p.includes('mapping strength') || p.includes('co-po')) {
            return `## CO-PO Mapping

Each Course Outcome (CO) is mapped to Program Outcomes (POs) with a **strength value**:

| Strength | Symbol | Meaning |
|----------|--------|---------|
| **3** | High | CO directly and strongly addresses the PO |
| **2** | Medium | CO moderately contributes to the PO |
| **1** | Low | CO slightly relates to the PO |
| **-** | None | No relationship |

**Example CO-PO Matrix:**
| | PO1 | PO2 | PO3 | PO4 | PO5 |
|--|-----|-----|-----|-----|-----|
| CO1 | 3 | 2 | - | - | 1 |
| CO2 | - | 3 | 2 | 1 | - |
| CO3 | - | 2 | 3 | 2 | - |
| CO4 | 1 | - | 2 | 3 | 2 |

**How to decide strength:**
- If the CO directly tests the PO skill → **3**
- If the CO partially involves the PO → **2**
- If the CO has minor overlap → **1**

**In this system:** Course Details → CO-PO Mapping tab → Set values and save`;
        }

        // ── Generate COs ───────────────────────────────────────────
        if (p.includes('generat') && (p.includes('co') || p.includes('course outcome') || p.includes('outcome'))) {
            return `## Generating Course Outcomes (COs)

**What is a CO?**
A Course Outcome is a specific, measurable statement of what students can do after completing the course.

**How to Generate COs in this System:**
1. Go to **Courses** page → Select your course
2. Click **"Generate CO"** or go to **Generate CO** page
3. Upload your **syllabus** (PDF, TXT, or DOC)
4. AI analyzes and generates **4–6 COs** automatically
5. Each CO includes:
   - Description starting with a Bloom's action verb
   - Bloom's Taxonomy level
   - Suggested PO and PSO mappings
6. Review, edit if needed → **Save**

**Good CO Examples:**
- ✅ "Apply sorting algorithms to solve computational problems" *(Apply)*
- ✅ "Analyze database schemas and optimize query performance" *(Analyze)*
- ✅ "Design a full-stack web application using modern frameworks" *(Create)*

**Rules:**
- Start with a **Bloom's action verb**
- Must be **measurable** (can be tested in an exam)
- Cover **different cognitive levels**
- Typically **4–6 COs** per course`;
        }

        // ── NBA / Accreditation / SAR ──────────────────────────────
        if (p.includes('nba') || p.includes('accreditation') || p.includes('sar') || p.includes('self assessment')) {
            return `## NBA Accreditation

**What is NBA?**
National Board of Accreditation evaluates engineering programs in India using OBE principles.

**Key Documents Needed:**
| Document | Description |
|----------|-------------|
| **SAR** | Self Assessment Report — full program overview |
| **CO-PO Matrix** | Mapping table for each course |
| **CO Attainment** | Direct attainment from exams |
| **PO Attainment** | Program-level outcome achievement |
| **Student Data** | Batch-wise performance analysis |

**Attainment Targets (NBA Typical):**
- CO Attainment: ≥ **60%** (Level 2)
- PO Attainment: ≥ **60%** (Level 2)

**How this System Helps:**
- ✅ Auto-generates CO-PO mapping matrices
- ✅ Calculates attainment from marks automatically
- ✅ Exports NBA-ready **PDF and Excel** reports
- ✅ Tracks program-level attainment trends

**Steps:**
1. Set up all courses with COs
2. Map COs to POs/PSOs
3. Enter exam marks
4. Calculate attainment
5. Go to **Reports** → Export SAR / CO-PO Matrix`;
        }

        // ── Marks / Upload ─────────────────────────────────────────
        if (p.includes('mark') || p.includes('upload') || p.includes('excel') || p.includes('csv')) {
            return `## Marks Entry & Upload

**Two Methods:**

**Method 1 — Manual Entry:**
1. Go to **Marks Entry** page
2. Select course and exam
3. Enter marks per question for each student
4. System auto-calculates total and percentage

**Method 2 — Excel/CSV Upload:**
1. Prepare your file in this format:

| Roll No | Name | Q1 | Q2 | Q3 | Total |
|---------|------|----|----|----|----|
| CS001 | Alice | 8 | 9 | 7 | 24 |
| CS002 | Bob | 6 | 7 | 8 | 21 |

2. Go to **Marks Entry** → Upload tab
3. Select your exam → Upload file
4. System validates and imports automatically

**After Upload:**
- Go to **Attainment** page
- Click **"Calculate CO Attainment"**
- Results appear in charts instantly

**Supported formats:** .xlsx, .xls, .csv (max 10MB)`;
        }

        // ── PSO ────────────────────────────────────────────────────
        if (p.includes('pso') || p.includes('program specific')) {
            return `## Program Specific Outcomes (PSOs)

**What are PSOs?**
PSOs are outcomes specific to your engineering program, defined by the department.

**PO vs PSO:**
| | PO | PSO |
|--|----|----|
| **Defined by** | NBA (national) | Your department |
| **Count** | 12 (fixed) | 2–3 (flexible) |
| **Scope** | All engineering programs | Your specific program |
| **Example** | PO2: Problem Analysis | PSO1: Build software apps |

**Sample PSOs for CSE:**
- **PSO1:** Apply software engineering principles to develop scalable applications
- **PSO2:** Use modern tools and technologies to solve real-world computing problems
- **PSO3:** Demonstrate knowledge of emerging areas like AI, ML, and Cloud Computing

**CO-PSO Mapping:**
Same as CO-PO mapping — use strength 1, 2, or 3.

**In this system:** Course Details → CO-PSO Mapping tab`;
        }

        // ── PO vs PSO difference ───────────────────────────────────
        if (p.includes('difference') && (p.includes('po') || p.includes('pso'))) {
            return `## Difference Between PO and PSO

| Feature | PO (Program Outcome) | PSO (Program Specific Outcome) |
|---------|---------------------|-------------------------------|
| **Full Form** | Program Outcome | Program Specific Outcome |
| **Defined by** | NBA nationally | Your department/institution |
| **Count** | 12 (PO1–PO12) | Usually 2–3 |
| **Scope** | Generic for all engineering | Specific to your program (CSE, ECE, etc.) |
| **Purpose** | Broad graduate attributes | Program-specific skills |

**NBA's 12 POs:**
PO1: Engineering Knowledge, PO2: Problem Analysis, PO3: Design/Development,
PO4: Investigation, PO5: Modern Tools, PO6: Society, PO7: Environment,
PO8: Ethics, PO9: Team Work, PO10: Communication, PO11: Project Mgmt, PO12: Lifelong Learning

**Example PSOs for CSE:**
- PSO1: Develop software solutions using modern programming paradigms
- PSO2: Apply data science and AI techniques to solve domain problems`;
        }

        // ── How to write a good CO ─────────────────────────────────
        if (p.includes('write') && p.includes('co') || p.includes('good co') || p.includes('co statement')) {
            return `## How to Write a Good Course Outcome

**Structure of a CO:**
> **[Action Verb]** + **[What]** + **[Context/Condition]**

**Rules:**
1. Start with a **Bloom's Taxonomy action verb**
2. Be **specific** — avoid vague words like "understand" or "know"
3. Be **measurable** — can be assessed in an exam or assignment
4. Be **achievable** in one semester
5. Cover **different cognitive levels** across all COs

**Good vs Bad Examples:**
| ❌ Bad | ✅ Good |
|--------|--------|
| "Understand programming" | "Apply OOP concepts to design modular programs" |
| "Know about databases" | "Design normalized database schemas for real-world applications" |
| "Learn algorithms" | "Analyze time and space complexity of sorting algorithms" |

**Bloom's Verb Bank:**
- Remember: List, Define, Recall, State
- Understand: Explain, Describe, Classify, Summarize
- Apply: Solve, Implement, Use, Demonstrate
- Analyze: Compare, Differentiate, Examine, Break down
- Evaluate: Justify, Critique, Assess, Recommend
- Create: Design, Develop, Construct, Formulate`;
        }

        // ── How many COs ───────────────────────────────────────────
        if (p.includes('how many') && p.includes('co')) {
            return `## How Many COs Should a Course Have?

**NBA Recommendation:** **4 to 6 Course Outcomes** per course.

**Why 4–6?**
- Too few (1–2): Doesn't cover the full course scope
- Too many (7+): Hard to assess and track individually
- 4–6 is the sweet spot for comprehensive yet manageable coverage

**Distribution Across Bloom's Levels:**
| Level | Recommended COs |
|-------|----------------|
| Remember/Understand | 1–2 COs |
| Apply | 1–2 COs |
| Analyze | 1 CO |
| Evaluate/Create | 1 CO |

**Example for a 4-credit course:**
- CO1: Remember/Understand level
- CO2: Apply level
- CO3: Apply/Analyze level
- CO4: Analyze level
- CO5: Evaluate or Create level

**In this system:** AI generates exactly 4–6 COs when you upload your syllabus.`;
        }

        // ── Direct vs Indirect attainment ─────────────────────────
        if (p.includes('direct') || p.includes('indirect')) {
            return `## Direct vs Indirect Attainment

**Direct Attainment:**
Measured directly from student performance in exams and assignments.

| Source | Weight (Typical) |
|--------|-----------------|
| Internal Tests (T1, T2, T3) | 40% |
| Mid Semester Exam | 20% |
| End Semester Exam | 40% |

**Formula:** Based on marks scored in questions mapped to each CO.

**Indirect Attainment:**
Measured through student feedback and surveys.

| Source | Example |
|--------|---------|
| Course Exit Survey | Students rate CO achievement (1–5) |
| Alumni Survey | Graduates rate program outcomes |
| Employer Feedback | Industry rates graduate skills |

**Combined Attainment:**
> Final Attainment = (Direct × 0.8) + (Indirect × 0.2)

**NBA Requirement:** Both direct and indirect attainment must be calculated and documented in the SAR.

**In this system:** Direct attainment is auto-calculated from marks. Indirect can be added manually.`;
        }

        // ── Reports / Export ───────────────────────────────────────
        if (p.includes('report') || p.includes('export') || p.includes('pdf') || p.includes('download')) {
            return `## Reports & Export

**Available Reports in this System:**

| Report | Format | Content |
|--------|--------|---------|
| **CO Attainment Report** | PDF/Excel | CO-wise attainment levels |
| **PO Attainment Report** | PDF/Excel | PO-wise attainment |
| **CO-PO Matrix** | PDF/Excel | Full mapping matrix with strengths |
| **Student Performance** | Excel | Individual and batch analysis |
| **SAR Summary** | PDF | NBA Self Assessment Report |

**How to Export:**
1. Go to **Reports** page
2. Select the report type
3. Choose course and academic year
4. Click **Export PDF** or **Export Excel**

**For NBA Submission:**
- Export CO-PO Matrix for each course
- Export CO Attainment for each semester
- Export PO Attainment for program level
- Compile into SAR document

**Tip:** Generate reports after all marks are entered and attainment is calculated.`;
        }

        // ── Question mapping ───────────────────────────────────────
        if (p.includes('question') && (p.includes('map') || p.includes('co'))) {
            return `## Question-CO Mapping

Each exam question must be mapped to a Course Outcome (CO) so attainment can be calculated.

**How it works:**
1. Go to **Question Mapping** page
2. Select your exam
3. For each question, assign:
   - **Mapped CO** (CO1, CO2, etc.)
   - **Bloom's Level** (auto-suggested by AI)
4. Save the mapping

**AI Auto-Mapping:**
- Upload your question paper
- AI reads each question and suggests the best CO
- AI also classifies the Bloom's level
- You can review and override suggestions

**Example:**
| Question | Marks | Mapped CO | Bloom's Level |
|----------|-------|-----------|---------------|
| Q1: Define data structures | 5 | CO1 | Remember |
| Q2: Write a stack implementation | 10 | CO2 | Apply |
| Q3: Compare linked list vs array | 10 | CO3 | Analyze |

**Why it matters:**
Without question-CO mapping, attainment cannot be calculated accurately.`;
        }

        // ── Pass threshold ─────────────────────────────────────────
        if (p.includes('threshold') || p.includes('pass mark') || p.includes('pass percentage')) {
            return `## Pass Threshold for Attainment

**Default Pass Threshold: 40%**

A student is considered to have "attained" a CO if they score **≥ 40%** of the marks allocated to that CO's questions.

**Attainment Level Calculation:**
After applying the pass threshold, count how many students passed:

| Attainment Level | Condition |
|-----------------|-----------|
| **Level 1** | ≥ 50% of students scored ≥ 40% |
| **Level 2** | ≥ 60% of students scored ≥ 40% |
| **Level 3** | ≥ 70% of students scored ≥ 40% |

**Example:**
- 60 students total
- CO1 questions: Q1 (10 marks) + Q2 (10 marks) = 20 marks
- Pass threshold: 40% of 20 = 8 marks
- Students scoring ≥ 8 marks: 48 students
- Attainment = (48/60) × 100 = **80% → Level 3**

**Note:** The threshold can be adjusted per institution's policy. Some use 50% as the pass threshold.`;
        }

        // ── Default ────────────────────────────────────────────────
        return `## OBE Assistant — I can help with that!

I didn't find a specific answer for **"${userMessage}"**, but here's what I can help you with:

**📚 Course Outcomes**
- How to generate COs from syllabus
- How to write good COs
- How many COs per course

**🔗 Mapping**
- CO-PO mapping with strength levels
- CO-PSO mapping
- Difference between PO and PSO

**📊 Attainment**
- CO attainment calculation formula
- Direct vs indirect attainment
- Attainment levels (1, 2, 3)

**🏆 NBA & Reports**
- NBA accreditation requirements
- SAR preparation
- Exporting PDF/Excel reports

**📝 System Usage**
- How to upload marks
- Question-CO mapping
- Bloom's Taxonomy classification

Try rephrasing your question or click one of the **Quick Topics** on the left panel!`;
    }

    // Keep for backward compatibility
    getMockResponse(prompt) {
        return this.getSmartFallback(prompt);
    }

    getMockJSON(prompt) {
        if (prompt.includes('mapping') || prompt.includes('suggest')) {
            return {
                poMappings: ["PO1", "PO2"],
                psoMappings: ["PSO1"]
            };
        }

        if (prompt.includes('question')) {
            return {
                mappings: [{
                        questionId: 1,
                        coCode: "CO1",
                        bloomLevel: "Understand",
                        confidence: 0.9
                    },
                    {
                        questionId: 2,
                        coCode: "CO2",
                        bloomLevel: "Apply",
                        confidence: 0.85
                    }
                ]
            };
        }

        return {
            success: true
        };
    }
}

module.exports = new GeminiConfig();