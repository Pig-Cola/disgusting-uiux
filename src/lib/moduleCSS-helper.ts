import _ from 'lodash'

type option_obj = Record<string, boolean>
type option_ele = string | option_obj
type option_arr = option_ele[]
type option = option_arr

export function makeClassNameByModuleCSS( style: CSSModuleClasses ) {
  return {
    classname: ( styleClassOption: option = [], originalClassOption: option = [] ) => {
      const temp1 = option2strArr( styleClassOption )
      const temp2 = option2strArr( originalClassOption )

      return _( temp1 )
        .map( ( v ) => style[v] ?? v )
        .union( temp2 )
        .join( ' ' )
    },
  }
}

function option2strArr( target: option ) {
  return target.reduce( ( acc, v ) => {
    switch ( typeof v ) {
      case 'string': {
        acc.push( v )
        break
      }

      case 'object': {
        if ( Array.isArray( v ) ) break

        acc.push(
          ..._( v )
            .toPairs()
            .reduce( ( acc2, [k, v] ) => {
              if ( v ) acc2.push( k )
              return acc2
            }, [] as string[] ),
        )
        break
      }

      default: {
        break
      }
    }
    return acc
  }, [] as string[] )
}
