-- AntiMatrix Academic Project Center Database Schema
-- Compatible with PostgreSQL 15+ & Supabase

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    abstract TEXT NOT NULL,
    problem_statement TEXT,
    proposed_solution TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    modules JSONB NOT NULL DEFAULT '[]',
    documentation_included TEXT[] NOT NULL DEFAULT '{}',
    level TEXT NOT NULL DEFAULT 'UG Final Year',
    year TEXT NOT NULL DEFAULT 'IEEE 2025-26',
    featured BOOLEAN NOT NULL DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create inquiries / consultation requests table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT,
    degree TEXT,
    category TEXT,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    project_title TEXT,
    requirement TEXT,
    message TEXT,
    urgency TEXT DEFAULT '1-2 Weeks',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create student reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    college TEXT NOT NULL,
    degree TEXT NOT NULL,
    project_title TEXT NOT NULL,
    category TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Indexes for search and fast lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category_name);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating DESC);

-- 7. Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for catalog & reviews
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to reviews" ON public.reviews FOR SELECT USING (true);

-- Allow public creation of inquiries and contact messages
CREATE POLICY "Allow public insert to inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Authenticated admin full access policies
CREATE POLICY "Allow authenticated admin full access to projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated admin full access to inquiries" ON public.inquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated admin full access to contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated admin full access to reviews" ON public.reviews FOR ALL TO authenticated USING (true);

-- 8. Seed Default Categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
('Artificial Intelligence & Data Science', 'ai-data-science', 'Deep learning, NLP, computer vision, and predictive analytics projects.', 'BrainCircuit'),
('Machine Learning', 'machine-learning', 'Supervised, unsupervised, reinforcement learning, and graph neural network projects.', 'Cpu'),
('Python Projects', 'python-projects', 'OpenCV, automation, edge computing, and desktop intelligence systems.', 'FileCode2'),
('Java Projects', 'java-projects', 'Enterprise Spring Boot, cryptography, cloud-native microservices, and distributed systems.', 'Coffee'),
('Web Development', 'web-development', 'Next.js, real-time WebSockets, Web3 blockchain, and full-stack collaborative platforms.', 'Globe'),
('Mobile App Development', 'mobile-app-development', 'Flutter, React Native, offline-first mesh systems, and on-device AI applications.', 'Smartphone')
ON CONFLICT (name) DO NOTHING;
