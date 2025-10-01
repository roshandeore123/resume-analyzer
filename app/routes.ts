import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
    route('/Upload', 'routes/Upload.tsx'),
    route('/resume/:id','routes/Resume.tsx'),
    route('/wipe','routes/Wipe.tsx')
] satisfies RouteConfig;
