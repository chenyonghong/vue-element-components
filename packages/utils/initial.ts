
export const initConfig = (app, key, config)=> {
    if(!config) return;

    const setGlobal = (vec_config) => {
        app.config.globalProperties.vec_config = vec_config;
    }
    const setChild = (child_config)=> {
        let { vec_config } = app.config.globalProperties;
        if(!vec_config) {
            setGlobal({
                [key]: config
            })
            return;
        }
        vec_config[key] = child_config;
    }

    const init = ()=> {
        if(!key) {
            setGlobal(config);
            return
        }
        setChild(config)
    }
    init();
}