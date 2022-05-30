import colors from './colors'



export const switchLanguage = (locale: string, ctx: any) => {
  localStorage.setItem("locale", locale);
  ctx.$vuetify.rtl = locale === "ar";
  ctx.$vuetify.lang.current = locale;
  ctx.$i18n.locale = locale;
};

export const numberWithCommas = (x: number) => {
  const xFixed = typeof x.toFixed != 'undefined' ? x.toFixed(3) : 6.640.toFixed(3)
  const val = xFixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return val
};

export const generateColors = (n:number) => {
  let c = colors
  c.length = n
  return c
}

export const currency = (x:number):string => {
  const val = `${numberWithCommas(x)} EGP`
  return val
}

export const clearNullValues = (obj:Object) => {
  let clone = { ...obj }
  Object.keys(clone).forEach((key) => {
    let k = key as keyof typeof clone
    clone[k] === null || '' ? delete clone[k] : ''
  })
  return clone
}
export const currentYear = new Date().getFullYear();

export const currentMonth = new Date().getMonth() + 1

export const currentDay = new Date().getDay()

export const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;


export const accountTypes = [
  {
    key: 'customer',
    value: 1
  },
  {
    key: 'supplier',
    value: 2
  },
  {
    key: 'expenses',
    value: 3
  },
  {
    key: 'bank',
    value: 4
  },
  {
    key: 'safe',
    value: 5
  },
  {
    key: 'other',
    value: 6
  }
]


export const lastTenYearsArr = ():number[] =>{
  const arr = []
  for (let i = 0; i < 10; i++) {
    arr.push(currentYear - i)
  }

  return arr
} 


export const switchMode = (mode: string, ctx: any) => {
  localStorage.setItem("mode", mode);
  ctx.$vuetify.theme.dark = mode === "dark";
};


export const serializeQuery = (payload: Object) => {
  const obj = clearNullValues(payload)
  const keys = Object.keys(obj)
  // const key as keyof obj
  return keys.map((k: any) => {
    const key = k as keyof typeof obj
    const current = obj[key] as unknown as string
    return `${encodeURIComponent(key)}=${encodeURIComponent(current)}`
  }).join("&")

  // return 
}

export const getColor = (index:number) => {
  return colors[index]
}


// export const createChart()

export const required = (v:any) => !!v || 'required'



export const addParamsToLocation = (params:any , path:string) => {
  history.pushState(
      {},
      '',
      path +
      '?' +
      Object.keys(params)
          .map(key => {
          return (
              encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
          )
          })
          .join('&')
  )
  }



  export const getParamsFromLocation = (query:any , form:any) => {
    const qKeys = Object.keys(query)
    qKeys.forEach(key => {
      if(key in form && query[key] != 'null') {
          form[key] = typeof form[key] == 'string' ? query[key] : parseInt(query[key])
      }
    })
  }


  export const convertDate = (date :string) => {
    let d = new Date(date);
    // const formattedDate = ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
    const formattedDate = d.toUTCString()
    return formattedDate.substring(0 , formattedDate.length-3)
  }