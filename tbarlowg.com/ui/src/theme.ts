import { createSystem, defaultConfig } from '@chakra-ui/react'

export const myTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: '#68c374' },
        },
      },
      fonts: {
        body: { value: ' BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif' },
        heading: { value: ' BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif' },
        mono: { value: ' BlinkMacSystemFont,-apple-system,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif' },
      },
    },
  },
})
