# Ghost Rider
The ghost rider functionality will allow for racing previous self
as a "ghost" of prerecorded routes. It will allow you to read FIT file data. FIT (Flexible Interoperable Data Transfer) is the standard data transfer format for routes from a garmin gps. You can use [fitparse](https://github.com/dtcooper/python-fitparse) to parse these files. The documentation on the file specs are [here](https://github.com/dgaff/fitsdk/blob/master/D00001275%20Flexible%20%26%20Interoperable%20Data%20Transfer%20(FIT)%20Protocol%20Rev%201.7.pdf). See sections 3.2 and onward specifically.

To map the route, we can use google maps. [Here](https://developers.google.com/maps/documentation/javascript/examples/polygon-simple) is an example that will do what I think we need.