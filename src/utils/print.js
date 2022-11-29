
export const print = els => {


    return new Promise((resolve) => {
  
      // Get all stylesheets HTML
      let stylesHtml = ''
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style')
      ]) {
        stylesHtml += node.outerHTML
      }
  
  
      let element = ''
      els.forEach(el => {
        const page = `<div data-app="true" style="height:100vh" class="v-application relative v-application--is-rtl theme--light" id="app">
      ${el}
      </div>`
        element += page
      })
      // Open the print window
      setTimeout(() => {
        const WinPrint = window.open(
          '',
          '',
          'left=0,top=0,width=800,min-height=900,toolbar=0,scrollbars=0,status=0'
        )
  
        WinPrint.document.write(`<!DOCTYPE html>
            <html>
          
                <head>
                  ${stylesHtml}
                  <style>
                    .invoice{
                      display:flex !important;
                      
                    }
                    .v-application{
                      display:flex !important;
                      justify-content:center !important
                    }
                  </style>
                </head>
              <body>
              
              ${element}
              </body>
            </html>`)
  
  
        WinPrint.focus()
        setTimeout(() => {
          WinPrint.print();
          WinPrint.close();
        }, 1000)
  
  
      }, 300)
  
  
      resolve(true)
    })
  
  
  }