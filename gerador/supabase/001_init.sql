create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'vendedor', 'financeiro');
create type public.document_kind as enum ('proposta', 'contrato');

create table if not exists public.user_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    nome text not null,
    email text not null unique,
    role public.user_role not null default 'vendedor',
    ativo boolean not null default true,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.companies (
    id uuid primary key default gen_random_uuid(),
    razao_social text not null,
    nome_fantasia text,
    cnpj text not null unique,
    endereco text,
    bairro text,
    cep text,
    cidade text,
    estado text,
    qtd_colaboradores integer,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.proposals (
    id uuid primary key default gen_random_uuid(),
    codigo text not null unique,
    proposal_date date not null,
    status text not null default 'rascunho',
    company_id uuid not null references public.companies(id),
    created_by uuid not null references auth.users(id),
    valor_original numeric(12, 2),
    valor_final numeric(12, 2),
    percentual_desconto numeric(5, 2),
    payload jsonb not null,
    imported_legacy boolean not null default false,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.proposal_items (
    id uuid primary key default gen_random_uuid(),
    proposal_id uuid not null references public.proposals(id) on delete cascade,
    tipo text not null,
    descricao text not null,
    quantidade numeric(12, 2),
    valor_unitario numeric(12, 2),
    valor_total numeric(12, 2),
    metadata jsonb,
    created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contracts (
    id uuid primary key default gen_random_uuid(),
    codigo text unique,
    contract_date date not null,
    tipo text not null,
    status text not null default 'rascunho',
    proposal_id uuid references public.proposals(id),
    company_id uuid not null references public.companies(id),
    created_by uuid not null references auth.users(id),
    valor_contrato numeric(12, 2),
    payload jsonb not null,
    imported_legacy boolean not null default false,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contract_services (
    id uuid primary key default gen_random_uuid(),
    contract_id uuid not null references public.contracts(id) on delete cascade,
    descricao text not null,
    valor numeric(12, 2),
    created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_parcels (
    id uuid primary key default gen_random_uuid(),
    contract_id uuid not null references public.contracts(id) on delete cascade,
    numero_parcela integer not null,
    vencimento date,
    valor numeric(12, 2) not null,
    created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.documents (
    id uuid primary key default gen_random_uuid(),
    kind public.document_kind not null,
    proposal_id uuid references public.proposals(id) on delete cascade,
    contract_id uuid references public.contracts(id) on delete cascade,
    file_name text not null,
    file_path text not null,
    file_url text,
    content_type text,
    created_by uuid not null references auth.users(id),
    created_at timestamptz not null default timezone('utc', now()),
    constraint documents_target_check check (
        (kind = 'proposta' and proposal_id is not null and contract_id is null)
        or
        (kind = 'contrato' and contract_id is not null and proposal_id is null)
    )
);

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
as $$
    select role from public.user_profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
    select public.current_user_role() = 'admin'
$$;

create or replace function public.is_financeiro()
returns boolean
language sql
stable
as $$
    select public.current_user_role() = 'financeiro'
$$;

alter table public.user_profiles enable row level security;
alter table public.companies enable row level security;
alter table public.proposals enable row level security;
alter table public.proposal_items enable row level security;
alter table public.contracts enable row level security;
alter table public.contract_services enable row level security;
alter table public.payment_parcels enable row level security;
alter table public.documents enable row level security;

drop policy if exists user_profiles_select on public.user_profiles;
create policy user_profiles_select on public.user_profiles
for select to authenticated
using (public.is_admin() or id = auth.uid());

drop policy if exists user_profiles_update on public.user_profiles;
create policy user_profiles_update on public.user_profiles
for update to authenticated
using (public.is_admin() or id = auth.uid())
with check (public.is_admin() or id = auth.uid());

drop policy if exists companies_select on public.companies;
create policy companies_select on public.companies
for select to authenticated
using (true);

drop policy if exists companies_write on public.companies;
create policy companies_write on public.companies
for all to authenticated
using (public.is_admin() or public.current_user_role() in ('vendedor', 'financeiro'))
with check (public.is_admin() or public.current_user_role() in ('vendedor', 'financeiro'));

drop policy if exists proposals_select on public.proposals;
create policy proposals_select on public.proposals
for select to authenticated
using (
    public.is_admin()
    or public.is_financeiro()
    or created_by = auth.uid()
);

drop policy if exists proposals_insert on public.proposals;
create policy proposals_insert on public.proposals
for insert to authenticated
with check (
    public.is_admin() or created_by = auth.uid()
);

drop policy if exists proposals_update on public.proposals;
create policy proposals_update on public.proposals
for update to authenticated
using (
    public.is_admin()
    or public.is_financeiro()
    or created_by = auth.uid()
)
with check (
    public.is_admin()
    or public.is_financeiro()
    or created_by = auth.uid()
);

drop policy if exists proposals_delete on public.proposals;
create policy proposals_delete on public.proposals
for delete to authenticated
using (public.is_admin() or created_by = auth.uid());

drop policy if exists proposal_items_access on public.proposal_items;
create policy proposal_items_access on public.proposal_items
for all to authenticated
using (
    exists (
        select 1 from public.proposals p
        where p.id = proposal_id
        and (
            public.is_admin()
            or public.is_financeiro()
            or p.created_by = auth.uid()
        )
    )
)
with check (
    exists (
        select 1 from public.proposals p
        where p.id = proposal_id
        and (
            public.is_admin()
            or p.created_by = auth.uid()
        )
    )
);

drop policy if exists contracts_access on public.contracts;
create policy contracts_access on public.contracts
for all to authenticated
using (
    public.is_admin()
    or public.is_financeiro()
    or created_by = auth.uid()
)
with check (
    public.is_admin()
    or public.is_financeiro()
    or created_by = auth.uid()
);

drop policy if exists contract_services_access on public.contract_services;
create policy contract_services_access on public.contract_services
for all to authenticated
using (
    exists (
        select 1 from public.contracts c
        where c.id = contract_id
        and (
            public.is_admin()
            or public.is_financeiro()
            or c.created_by = auth.uid()
        )
    )
)
with check (
    exists (
        select 1 from public.contracts c
        where c.id = contract_id
        and (
            public.is_admin()
            or c.created_by = auth.uid()
        )
    )
);

drop policy if exists payment_parcels_access on public.payment_parcels;
create policy payment_parcels_access on public.payment_parcels
for all to authenticated
using (
    exists (
        select 1 from public.contracts c
        where c.id = contract_id
        and (
            public.is_admin()
            or public.is_financeiro()
            or c.created_by = auth.uid()
        )
    )
)
with check (
    exists (
        select 1 from public.contracts c
        where c.id = contract_id
        and (
            public.is_admin()
            or public.is_financeiro()
            or c.created_by = auth.uid()
        )
    )
);

drop policy if exists documents_access on public.documents;
create policy documents_access on public.documents
for all to authenticated
using (
    public.is_admin()
    or public.is_financeiro()
    or created_by = auth.uid()
)
with check (
    public.is_admin() or created_by = auth.uid()
);