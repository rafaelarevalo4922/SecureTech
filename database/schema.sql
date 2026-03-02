-- =================================================================================
-- BASE DE DATOS PARA SISTEMA DE VENTAS Y ANALÍTICAS AVANZADAS (PostgreSQL / Supabase)
-- =================================================================================

-- 1. Tabla de Empleados (Vendedores)
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Sales Representative',
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
    performance_score DECIMAL(5,2) DEFAULT 0.00, -- Puntaje calculado por eficiencia
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 2. Tabla de Clientes
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Active', -- Active, Inactive, At Risk
    lifetime_value DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 3. Tabla de Ventas (Histórico)
CREATE TABLE IF NOT EXISTS public.sales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID REFERENCES public.employees(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    sale_date DATE NOT NULL,
    product_category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Completed', -- Completed, Pending, Cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 4. Tabla de Prospectos y Predicciones (Forecasting)
-- Aquí se guardan las proyecciones de ventas futuras basadas en el pipeline
CREATE TABLE IF NOT EXISTS public.sales_forecasts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES public.employees(id) ON DELETE SET NULL,
    estimated_amount DECIMAL(15,2) NOT NULL,
    probability_percentage INT NOT NULL CHECK (probability_percentage BETWEEN 0 AND 100),
    expected_close_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 5. Tabla de Analíticas Avanzadas e Insights (Diferenciador)
-- Almacena las alertas generadas por el sistema (ej. Riesgo de fuga, Sugerencias de acción)
CREATE TABLE IF NOT EXISTS public.analytics_insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    insight_type VARCHAR(100) NOT NULL, -- ej. 'CHURN_RISK', 'UPSELL_OPPORTUNITY', 'NEXT_BEST_ACTION'
    description TEXT NOT NULL,
    confidence_score DECIMAL(5,2), -- % de confianza del algoritmo
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- =================================================================================
-- POLÍTICAS DE SEGURIDAD (RLS - Row Level Security para Supabase)
-- =================================================================================
-- Habilitar RLS en tablas principales
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_insights ENABLE ROW LEVEL SECURITY;

-- Nota: Las políticas específicas de lectura/escritura (Policies) se deben definir 
-- según los roles de Supabase (authenticated, anon, etc.)
