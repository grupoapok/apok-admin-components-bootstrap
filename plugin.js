const ApokAdminComponents = {
    install(vue) {
        const requireComponents = require.context("./components", false, /\.vue$/);
        requireComponents.keys().forEach(fileName => {
            const component = requireComponents(fileName).default;
            vue.component(component.name, component)
        });
    }
};

export default ApokAdminComponents;
