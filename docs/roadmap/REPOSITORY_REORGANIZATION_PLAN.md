# Repository Reorganization Plan

## Current Problems (Duplicates & Confusion)

### 🚨 Multiple Frontend Setups:
1. **Root `/src/`** - Mixed frontend/backend (confusing)
2. **`/autorl_project/autorl-frontend/src/`** - Most complete frontend
3. **`/frontend/src/`** - Another separate frontend
4. **`/autorl-demo/frontend/src/`** - Demo frontend

### 🚨 Multiple Backend Setups:
1. **Root `/src/`** - Mixed with frontend files
2. **`/autorl_project/src/`** - Main backend
3. **`/autorl-demo/backend/`** - Demo backend
4. **Root `/main.py`, `/api_server.py`** - Scattered entry points

### 🚨 Multiple Configuration Files:
- Multiple `package.json` files
- Multiple `docker-compose.yml` files
- Multiple `Dockerfile` files
- Scattered config files

### 🚨 Documentation Chaos:
- 20+ markdown files in root
- Duplicate documentation
- Scattered guides

## 🎯 Target Clean Structure

```
autorl/
├── frontend/                    # Single, clean frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Single, clean backend
│   ├── src/
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── docs/                        # All documentation
│   ├── setup/
│   ├── api/
│   └── guides/
├── examples/                    # Demo and examples
├── tests/                       # All tests
├── deployment/                  # Docker, k8s configs
├── tools/                       # Development tools
├── docker-compose.yml           # Single compose file
├── README.md                    # Main readme
└── .gitignore
```

## 🔧 Consolidation Steps

### Phase 1: Frontend Consolidation
1. **Choose best frontend** (`/autorl_project/autorl-frontend/`)
2. **Move to `/frontend/`**
3. **Delete other frontends**
4. **Update imports and configs**

### Phase 2: Backend Consolidation  
1. **Merge backend code** from all sources
2. **Move to `/backend/`**
3. **Consolidate entry points**
4. **Update dependencies**

### Phase 3: Documentation Cleanup
1. **Move all docs** to `/docs/`
2. **Consolidate duplicates**
3. **Create clear structure**

### Phase 4: Configuration Cleanup
1. **Single docker-compose.yml**
2. **Single package.json** (frontend)
3. **Single requirements.txt** (backend)
4. **Clean .gitignore**

## 🎯 Benefits
- ✅ No more confusion about which files to use
- ✅ Clear separation of frontend/backend
- ✅ Single source of truth for each component
- ✅ Easier development and deployment
- ✅ Professional repository structure
