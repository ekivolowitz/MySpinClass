# Ghost Rider
The ghost rider functionality will allow for racing previous self
as a "ghost" of prerecorded routes. It will allow you to read FIT file data. FIT (Flexible Interoperable Data Transfer) is the standard data transfer format for routes from a garmin gps. You can use [fitparse](https://github.com/dtcooper/python-fitparse) to parse these files. The documentation on the file specs are [here](https://github.com/dgaff/fitsdk/blob/master/D00001275%20Flexible%20%26%20Interoperable%20Data%20Transfer%20(FIT)%20Protocol%20Rev%201.7.pdf). See sections 3.2 and onward specifically.

To map the route, we can use google maps. [Here](https://developers.google.com/maps/documentation/javascript/examples/polygon-simple) is an example that will do what I think we need.


Important bits here:

* [FIT files](https://ridewithgps.com/events/10-tour-de-france#routes/1346548/preview)
* [Cycling wattage](https://www.omnicalculator.com/sports/cycling-wattage)
* [Calculating grade](https://www.omnicalculator.com/construction/elevation-grade)

Calculating grade: `arctan(rise/run)` in meters

Below is a python script for calculating wattage from the link above:
```py
import math

SLOPE = 0.12 # grade percentage
GRAVITY = 9.80655 # constant
WEIGHT_HUMAN = 97.5 # 215 lbs in kg
WEIGHT_BIKE = 5 # 5 kg bike
ELEVATION = 423.4 # meters

SPEED = 1 # m/s
CYCLING_POWER_LOSS = 0.03 # As a percentage, from the wattage page


Crr = 0.0050 # Rolling Resistance Coefficient from the wattage page
A_Cdrag = 0.408 # Riding in tops from the wattage page

WEIGHT = WEIGHT_HUMAN + WEIGHT_BIKE


slope_gravity = math.sin(math.asin(SLOPE))

fg = GRAVITY * slope_gravity * WEIGHT

print(f"The force of gravity is: {fg}")

slope_rolling = math.cos(math.atan(SLOPE))

fr = GRAVITY * slope_rolling * WEIGHT * Crr

print(f"The rolling resistance: {fr}")

e_exp = -1*GRAVITY * 0.0289644 * ELEVATION / (8.3144598 * 288.15) # Constants from the wattage page

pressure = 1.225 * math.exp(e_exp)

fa = 0.5 * A_Cdrag * pressure * math.pow(SPEED,2)

wattage = (fg + fr + fa) * SPEED / (1 - CYCLING_POWER_LOSS)

print(f"Wattage: {wattage} watts")
```
