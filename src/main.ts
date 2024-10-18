import { createRoot } from 'react-dom/client'
import App from './app'

declare global {
  interface Array<T> {
    touch( fn: ( args?: T[] ) => void ): T[]
  }
  interface ReadonlyArray<T> {
    touch( fn: ( args?: T[] ) => void ): T[]
  }
}

if ( import.meta.env.DEV ) {
  Array.prototype.touch = function touch( fn = ( v ) => console.log( v ) ) {
    fn( this )
    return this
  }
}

createRoot( document.getElementById( 'root' )! ).render( App() )
