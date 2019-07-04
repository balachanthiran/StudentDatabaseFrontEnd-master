import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from "@angular/router";

export class CustomReuseStrategy implements RouteReuseStrategy {

    private rejectedRoutes: string[] = ["profile/:id"];

    storedRoutes: {[key: string]: DetachedRouteHandle} = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        //console.debug('CustomReuseStrategy:shouldDetach', route);
        //Fires when shouldReuseRoute returns false. When this function returns true, Angular stores the route
        if(this.rejectedRoutes.indexOf(route.routeConfig.path) > -1){
            console.log("rejected route");
            return false;
        }
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        //console.debug('CustomReuseStrategy:store', route, handle);
        //If shouldDetach returns true, this method gets fired and stores the route
        this.storedRoutes[route.routeConfig.path] = handle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        //console.debug('CustomReuseStrategy:shouldAttach', route);
        //Runs when shouldReuseRoute returns false. When this function returns true, Angular will use the stored route in place of the requested route
        return !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        //console.debug('CustomReuseStrategy:retrieve', route);
        //Determines which component to reuse
        if (!route.routeConfig) return null;
        return this.storedRoutes[route.routeConfig.path];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        //console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
        //If this method returns true, then it reuses the route you are currently on and no other methods are fired
        return future.routeConfig === curr.routeConfig;
    }

}