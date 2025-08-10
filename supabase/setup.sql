-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    surname TEXT NOT NULL,
    othername TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create analytics_data table
CREATE TABLE IF NOT EXISTS public.analytics_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('mental_health', 'vaw', 'lgbtq', 'pwds')),
    sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
    confidence_score DECIMAL(3,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    source TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles - users can only see their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Enable RLS on analytics_data
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;

-- Create policy for analytics_data - all authenticated users can read
CREATE POLICY "Authenticated users can view analytics data" ON public.analytics_data
    FOR SELECT TO authenticated USING (true);

-- Create policy for analytics_data - only admin can insert/update (you can modify this later)
CREATE POLICY "Authenticated users can insert analytics data" ON public.analytics_data
    FOR INSERT TO authenticated WITH CHECK (true);

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles updated_at
CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to automatically create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, surname, othername)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'surname', ''),
        COALESCE(NEW.raw_user_meta_data->>'othername', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample analytics data
INSERT INTO public.analytics_data (content, category, sentiment, confidence_score, source) VALUES
('Mental health awareness is crucial for our community development', 'mental_health', 'positive', 0.85, 'Twitter'),
('Violence against women must be stopped immediately', 'vaw', 'negative', 0.92, 'Facebook'),
('LGBTQ+ rights are human rights', 'lgbtq', 'positive', 0.88, 'Instagram'),
('Accessibility features help persons with disabilities', 'pwds', 'positive', 0.79, 'Twitter'),
('Discrimination against mental health patients', 'mental_health', 'negative', 0.91, 'News Article'),
('Supporting survivors of gender-based violence', 'vaw', 'positive', 0.83, 'Blog Post');