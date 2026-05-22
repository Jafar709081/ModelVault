# ModelVault — FastAPI Backend

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Configure Environment

```bash
cp .env.example .env
# Edit .env with your Supabase URL and Key
```

## Supabase Table Schema

Run this SQL in Supabase SQL Editor:

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tags text[] default '{}',
  cost text,
  semester text,
  student_name text,
  student_email text,
  image_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table projects enable row level security;

-- Allow public reads
create policy "Public read" on projects for select using (true);

-- Allow authenticated inserts
create policy "Auth insert" on projects for insert with check (true);
```

## Storage Bucket

1. Go to Supabase → Storage → New bucket  
2. Name: `project-images`  
3. Set as **Public**

## Run the API

```bash
uvicorn main:app --reload --port 8000
```

Visit docs at: http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Fetch all projects |
| GET | `/projects/{id}` | Get single project |
| GET | `/projects/search?q=query` | Search projects |
| POST | `/projects` | Upload new project |
| DELETE | `/projects/{id}` | Delete project |
| GET | `/categories` | List all categories |
