// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.

/* SystemJS module definition */
declare var System: SystemJS;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}

interface GlobalEnvironment {
  SystemJS: SystemJS;
  System: SystemJS;
}

declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface Es6PromiseLoader {
  (id: string): (exportName?: string) => Promise<any>;
}

type FactoryEs6PromiseLoader = () => Es6PromiseLoader;
interface WebpackRequire {
    (id: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
    //context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

// jQuery
//declare var jQuery: any;

// Extend typings
interface NodeRequire extends WebpackRequire {}
interface NodeRequireFunction extends Es6PromiseLoader  {}



// jQuery
//declare var jQuery: any;
declare var require: NodeRequire;