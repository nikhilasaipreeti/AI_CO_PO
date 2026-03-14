cs# Systemo Architecture 📐

## Modular Microservice Design

```
+-------------+     +-------------+     +-----------------+
|  Frontend   | --> | Backend API | --> |   AI Engine     |
| Dashboard   |     |  (Express)  |     | (Gemini.js)     |
+-------------+     +-------------+     +-----------------+
                            |                   |
                            v                   v
                    +-------------+     +-----------------+
                    | Data Layer  | <-- | Analytics Engine |
                    |   (JSON)    |     | (Python/Pandas) |
                    +-------------+     +-----------------+
```

## Components
1. **Frontend**: HTML/JS dashboard for faculty
2. **Backend**: Express API orchestrates workflow
3. **AI Engine**: Gemini for CO generation + question mapping
4. **Analytics Engine**: CO/PO/PSO attainment + stats
5. **Data**: JSON/Excel for inputs/outputs

## Why This Architecture?
- **Scalable**: Independent modules
- **Maintainable**: Clear boundaries
- **Deployable**: Containerize services

See [Module Interactions](module_interactions.md)

