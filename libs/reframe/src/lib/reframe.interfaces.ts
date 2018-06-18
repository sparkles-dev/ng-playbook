import {
  InjectionToken,
  Type,
  ValueProvider,
  ANALYZE_FOR_ENTRY_COMPONENTS
} from '@angular/core';

export interface ParsedUrl {
  url: string;
  appName: string;
  entryPoint: string;
  params?: {
    [key: string]: any;
  };
}

export interface AppLaunch {
  onAppLaunch(url: ParsedUrl);
}

export function isAppLaunch(value: any): value is AppLaunch {
  return value !== undefined && typeof value['onAppLaunch'] === 'function';
}

export interface Entry {
  path: string;
  component: Type<any>;
}

export const ENTRIES = new InjectionToken<Entry[]>('reframe: entries');

export function provideEntries(entries: Entry[]): ValueProvider[] {
  return [
    {
      provide: ENTRIES,
      useValue: entries
    },
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      multi: true,
      useValue: entries
    }
  ];
}

export interface ReframeOptions {
  prefix: string;
  urlScheme: string;
}

export const REFRAME_OPTIONS_DEFAULTS = {
  prefix: '/',
  urlScheme: 'u://'
};

export const REFRAME_OPTIONS = new InjectionToken<ReframeOptions>(
  'reframe: options'
);

export function provideReframeOptions(options: ReframeOptions): ValueProvider {
  return {
    provide: REFRAME_OPTIONS,
    useValue: options
  };
}
