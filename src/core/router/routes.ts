import { Application } from 'express';
import { RouterModuleFactory } from './router-map';
import { HttpVerbMap, FeatureModuleRouterInfo } from './base-routes-module';

export class RouterModule {
    private routerFactory: RouterModuleFactory;
    private express: Application;

    constructor(app: Application) {
        this.express = app;
        this.routerFactory = new RouterModuleFactory();
    }

    public exposeRoutes(authenticate?: Function): void {
        const registeredModules = this.routerFactory.getRegisteredModules();

        if (registeredModules && Array.isArray(registeredModules)) {
            registeredModules.forEach(this.extractRouterInfoFromModule.bind(this, authenticate));
        }
    }

    private extractRouterInfoFromModule(authenticate: Function, routerFeatModule: HttpVerbMap) {
        if (routerFeatModule) {
            const registedVerbs = Object.keys(routerFeatModule);
            registedVerbs.forEach(this.extectInfoByVerb.bind(this, authenticate, routerFeatModule))
        }
    }

    private extectInfoByVerb(authenticate: Function, routerFeatModule: HttpVerbMap, registredVerb: string) {
        routerFeatModule[registredVerb].forEach(this.mountRoutes.bind(this, authenticate, registredVerb));
    }

    private mountRoutes(authenticate: Function, registedVerb: string, routerInfo: FeatureModuleRouterInfo) {
        if (routerInfo) {
            const { isProtected, callback, endpoint } = routerInfo;
            console.log(isProtected, callback, endpoint);
            isProtected
                ? this.express.route(endpoint).all(authenticate())[registedVerb](callback)
                : this.express.route(endpoint)[registedVerb](callback);
        }
    }
}