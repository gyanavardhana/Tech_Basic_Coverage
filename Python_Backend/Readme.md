# **Phase 1: Python Basics**
**Concepts to Cover**
- Variables, Data Types, and Operators  
- Conditional Statements and Loops  
- Functions and Modules  
- Basic Data Structures: Lists, Tuples, Sets, Dictionaries  
- File Handling (read/write)

**Practice Tasks**
✅ Write a program to manage a to-do list using lists and file storage.  
✅ Create a basic calculator using functions.  
✅ Parse a `.txt` file and count word frequencies.

---

# **Phase 2: Python Advanced**
**Concepts to Cover**
- OOP: Classes, Inheritance, Polymorphism  
- Exception Handling  
- Decorators and Context Managers  
- List/Dict Comprehensions  
- Generators & Iterators  
- Standard Libraries: `datetime`, `os`, `re`, `json`, `collections`

**Practice Tasks**
✅ Build a class-based Book Library manager.  
✅ Use decorators for logging function calls.  
✅ Use regex to validate email and phone number formats.  
✅ Create a generator that yields Fibonacci numbers.

---

# **Phase 3: API Fundamentals with FastAPI**
**Concepts to Cover**
- FastAPI Basics: Path, Query, and Body parameters  
- Request Validation with Pydantic  
- Response Models and Status Codes  
- Dependency Injection in FastAPI  
- Handling Form, File Uploads  
- Middleware and Exception Handling

**Practice Tasks**
✅ Build a FastAPI app with CRUD endpoints for a "Task" resource.  
✅ Validate input data using Pydantic models.  
✅ Create an endpoint to upload an image and return metadata.  
✅ Add a custom middleware to log requests.

---

# **Phase 4: Backend Engineering Essentials**
**Concepts to Cover**
- API Design Principles (RESTful design, Versioning)  
- Environment Variables and Config Management  
- Authentication & Authorization (JWT/OAuth2)  
- Logging and Error Handling  
- Testing APIs (Pytest, FastAPI TestClient)  
- Async Programming (async/await, aiohttp)

**Practice Tasks**
✅ Secure a route using OAuth2 with Password Flow.  
✅ Write unit + integration tests for your FastAPI app.  
✅ Implement rate limiting or API key validation.  
✅ Refactor the app using dependency injection and routers.

---

# **Phase 5: Database + FastAPI Integration**
**Concepts to Cover**
- Using SQLAlchemy or Tortoise ORM  
- PostgreSQL + Async Drivers (`asyncpg`)  
- MongoDB with `motor`  
- Alembic for Migrations  
- Database Transactions with FastAPI

**Practice Tasks**
✅ Connect a PostgreSQL DB and perform CRUD with SQLAlchemy.  
✅ Use Alembic to create and upgrade DB schemas.  
✅ Store logs or analytics in MongoDB via FastAPI route.  
✅ Implement a money-transfer transaction using SQLAlchemy.

---

# **Phase 6: Real-World Backend Project**
**Mini Project: Job Board Platform**
- Users can sign up and log in.
- Companies can post jobs.
- Users can apply for jobs.
- Admin panel to moderate posts.
- Search/filter functionality.

**Tools/Stack**
- FastAPI + SQLAlchemy  
- PostgreSQL for data storage  
- MongoDB for logs or analytics  
- JWT for Auth  
- Pytest for testing  
- Docker for containerization

**Practice Tasks**
✅ Set up project structure with routers, models, services.  
✅ Implement token-based login + user roles.  
✅ Add full-text job search using PostgreSQL `tsvector`.  
✅ Log all API hits in MongoDB.  
✅ Write unit and integration tests.  
✅ Dockerize the entire project.

---

# 🌟 Bonus (Optional Advanced Concepts)
- Caching with Redis  
- Background Jobs with Celery or FastAPI BackgroundTasks  
- WebSockets with FastAPI  
- Rate Limiting with `slowapi`  
- Deploy using Gunicorn + Nginx + Docker  
- CI/CD with GitHub Actions  
- API documentation and versioning strategy
