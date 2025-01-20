declare type Brand<T, K extends string> = T & { __brand: K }
declare type CSSModuleClasses = { readonly [key: string]: string }
