# Real-Time Chess [Capstone Project]

## Build Instructions

### Step 1: Run the setup file

**Command**

```bash
source setup.mac.sh
```

This will:

1. Install all NPM packages (locally) for this project
2. Installs the SASS global binary
3. Installs the webpack global binary
4. Installs the `webpack-cli` globally

### Step 2: Build The Server and SASS files

**Command**

```bash
npm run build
```

This will:

1. Build the server TypeScript files
2. Build the SASS files

### Step 3: Build and webpack the client scripts

**Command**

```bash
webpack
```

This will webpack all client-side TypeScript files and compress it.

### Step 4: Start the Server

**Command**

```bash
npm run start
```

This will start the NodeJS server located in `dist/index.js`.
