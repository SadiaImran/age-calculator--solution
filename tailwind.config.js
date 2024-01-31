/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      colors :{
        "age-Purple": "hsl(259, 100%, 65%)",
        "light-Red": "hsl(0, 100%, 67%)",
        "White": "hsl(0, 0%, 100%)",
        "off-White": "hsl(0, 0%, 94%)",
        "light-Grey": "hsl(0, 0%, 86%)",
        "Smokey-Grey": "hsl(0, 1%, 44%)",
        "off-Black": "hsl(0, 0%, 8%)",
      }
    },
    fontFamily : {
      Poppins : ["Poppins , sans-serif"],
      
    },
    container : {
      center : true ,
      padding : "1rem",
      screens :{
        lg : "1124px" ,
        xl : "1124px" , 
        "2xl" : "1124px",
      }
    }
  },
  plugins: [],
}

