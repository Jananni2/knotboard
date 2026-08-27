 Frontend Tests (KnotBoard Virtual Brainstorming) › T01 - Folder structure: Login component exists

Cannot find module '../store/authSlice' from 'src/Login.jsx'

Require stack:
src/Login.jsx
src/testcase/App.test.js

[0m [90m 2 |[39m [36mimport[39m { useDispatch[33m,[39m useSelector } [36mfrom[39m [32m"react-redux"[39m[33m;[39m
[90m 3 |[39m [36mimport[39m { useNavigate } [36mfrom[39m [32m"react-router-dom"[39m[33m;[39m
[31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m { login } [36mfrom[39m [32m"../store/authSlice"[39m[33m;[39m
[90m |[39m [31m[1m^[22m[39m
[90m 5 |[39m
[90m 6 |[39m [36mfunction[39m [33mLogin[39m() {
[90m 7 |[39m [36mconst[39m [username[33m,[39m setUsername] [33m=[39m useState([32m""[39m)[33m;[39m[0m

at Resolver.resolveModule (node_modules/jest-resolve/build/resolver.js:324:11)
at Object.<anonymous> (src/Login.jsx:4:1)
at src/testcase/App.test.js:18:22
at Object.<anonymous> (src/testcase/App.test.js:18:22)

● Frontend Tests (KnotBoard Virtual Brainstorming) › T03 - Folder structure: store directory exists

expect(received).toBe(expected) // Object.is equality

Expected: "function"
Received: "undefined"

[0m [90m 45 |[39m [36mconst[39m response [33m=[39m [36mawait[39m [36mimport[39m([32m'../store/slices/authSlice'[39m)[33m;[39m
[90m 46 |[39m expect(response)[33m.[39mtoBeDefined()[33m;[39m
[31m[1m>[22m[39m[90m 47 |[39m expect([36mtypeof[39m response[33m.[39mloginSuccess)[33m.[39mtoBe([32m'function'[39m)[33m;[39m
[90m |[39m [31m[1m^[22m[39m
[90m 48 |[39m console[33m.[39mlog([32m'Store directory exists: authSlice verified successfully'[39m)[33m;[39m
[90m 49 |[39m })[33m;[39m
[90m 50 |[39m[0m