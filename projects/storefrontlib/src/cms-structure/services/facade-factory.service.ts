import { AbstractType, inject, Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { debounceTime, map, shareReplay, switchMap } from 'rxjs/operators';
import { FeatureModulesService } from './feature-modules.service';
import { CmsConfig } from '@spartacus/core';

export interface FacadeDescriptor<T> {
  facade: AbstractType<T>;
  feature: string | string[];
  methods?: (keyof T)[];
  properties?: (keyof T)[];
}

@Injectable({
  providedIn: 'root',
})
export class FacadeFactoryService {
  protected facades = new Map<any, Observable<any>>();

  constructor(
    protected featureModules: FeatureModulesService,
    protected cmsConfig: CmsConfig,
    protected injector: Injector
  ) {}

  protected getFacade<T>(
    feature: string | string[],
    facadeClass: AbstractType<T>
  ): Observable<T> {
    const featureToLoad = this.findConfiguredFeature(feature);

    if (!featureToLoad) {
      return throwError(
        new Error(`Feature ${[].concat(feature)[0]} is not configured properly`)
      );
    }

    return this.featureModules.resolveFeature(featureToLoad).pipe(
      debounceTime(0),
      map((featureInstance) => featureInstance.moduleRef.injector),
      map((injector) => injector.get(facadeClass))
    );
  }

  protected findConfiguredFeature(feature: string | string[]): string {
    for (const feat of [].concat(feature)) {
      if (this.cmsConfig.featureModules?.[feat]?.module) {
        return feat;
      }
    }
  }

  protected define(facade: AbstractType<any>, feature: string | string[]) {
    const resolver$ = this.getFacade(feature, facade).pipe(shareReplay());
    this.facades.set(facade, resolver$);
  }

  protected call(facade: AbstractType<any>, method: string) {
    return this.facades
      .get(facade)
      .pipe(switchMap((service) => service[method]()));
  }

  protected get(facade: AbstractType<any>, property: string) {
    return this.facades
      .get(facade)
      .pipe(switchMap((service) => service[property]));
  }

  create<T>({ facade, feature, methods, properties }: FacadeDescriptor<T>): T {
    this.define(facade, feature);

    const result: any = {};
    (methods ?? []).forEach((method) => {
      result[method] = () => this.call(facade, method as string);
    });
    (properties ?? []).forEach((property) => {
      result[property] = () => this.get(facade, property as string);
    });

    return result;
  }
}

export function facadeFactory<T>(descriptor: FacadeDescriptor<T>): T {
  return inject(FacadeFactoryService).create(descriptor);
}