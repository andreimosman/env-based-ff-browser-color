# env-based-ff-browser-color
Firefox extension that changes the color of the browser window based on URL. The idea is to instantly identify local, dev, qa, and production environments.


- **Localhost**: set to **light green**
- **Development** environment. Color: other **green**. (Host names starting with `dev-`, or listed in the Development hostnames field, in the plugin settings.) 
- **QA** environment. Color: **blue**. (Host names starting with `qa-`, or listed in the QA host names field in the plugin settings.)
- **Production environment**. Color: **red**. (Host names listed in the production host names field in the plugin settings). 

I wrote this for developers and QA personnel. The goal is to minimize mistakes when working in multiple environments.
