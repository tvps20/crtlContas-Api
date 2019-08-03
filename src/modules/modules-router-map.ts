import { AuthRouterModule } from "./auth/auth-router";

export interface FeatureModuleRouter {
    moduleName: any;
    parser: string;
}

export class ModulesRouterMapper {
    public registeredModules: Array<FeatureModuleRouter> = [
        {
            moduleName: AuthRouterModule,
            parser: 'getRoutesFromModules'
        }
    ];
}