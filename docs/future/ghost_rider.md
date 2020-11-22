# Ghost Rider
The ghost rider functionality will allow for racing previous self
as a "ghost" of prerecorded routes. It will allow you to read FIT file data. FIT (Flexible Interoperable Data Transfer) is the standard data transfer format for routes from a garmin gps. You can use [fitparse](https://github.com/dtcooper/python-fitparse) to parse these files. The documentation on the file specs are [here](https://github.com/dgaff/fitsdk/blob/master/D00001275%20Flexible%20%26%20Interoperable%20Data%20Transfer%20(FIT)%20Protocol%20Rev%201.7.pdf). See sections 3.2 and onward specifically.

To map the route, we can use google maps. [Here](https://developers.google.com/maps/documentation/javascript/examples/polygon-simple) is an example that will do what I think we need.

# Tour De France Recreation

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

For calculating speed on an incline, I found this formula [here](http://bikecalculator.com/veloMetric.html).
This will need to be converted to python to get final speed.

```js
<script language="JavaScript">

		tireValues = [0.005, 0.004, 0.012];
		aeroValues = [0.388, 0.445, 0.420, 0.300, 0.233, 0.200];

function makeDecimal2 (value) {
	if (value != null && value != 0) {
		var x = Math.round(parseFloat(value) * 100);
		var d;
		if (x < 100) d=0;
		else d = parseInt(x / 100);
		var c = x % 100;
		var g = (c >= 10)?"":"0";
		value = "" + d + "." + g + c;
	}
	return value
}

function makeDecimal0 (value) {
	if (value != null && value != 0) {
		value = "" + Math.round(parseFloat(value));
	}
	return value
}

function valDecNumber(str) {  /* returns true if a valid number */
	if(str.length == 0) return false;
	var noNegSignYet = true;
	var noPointYet = true;
	/* if (str.length > 1 && str.substring(0,1) == "0") { */
/* 		alert ("Please don't use a leading zero."); */
/* 		return false */
/* 	} */
	for (i=0; i < str.length; i++) {
		var chr = str.substring(i, i+1)
		if (noPointYet && chr == ".") noPointYet = false;
		else if (noNegSignYet && chr == "-") noNegSignYet = false;
		else if (chr< "0" || chr > "9") {
			alert ("I don't think you want to do that, Dave.");
			return false
		}
	}
	return true
}

function empty(inputStr) {
	if (inputStr == "" || inputStr == null) return true;
	return false
}

function newton(aero, hw, tr, tran, p) {        /* Newton's method */

		var vel = 20;       // Initial guess
		var MAX = 10;       // maximum iterations
		var TOL = 0.05;     // tolerance
		
		for (i=1; i < MAX; i++) {
			var tv = vel + hw;
			var f = vel * (aero * tv * tv + tr) - tran * p; // the function
			var fp = aero * (3.0 * vel + hw) * tv + tr;     // the derivative
			var vNew = vel - f / fp;
			if (Math.abs(vNew - vel) < TOL) return vNew;  // success
			vel = vNew;
		}
		return 0.0;  // failed to converge
}


function update(form) {

	with (document.f) {
		
		
		/* USUnits = US.checked; */
		USUnits = 0;
		/* baseMetabolism = baseMet.checked; */
		
		/* Left panel */
		powerv = eval(power.value);
		rweightv = eval(rweight.value);
		bweightv = eval(bweight.value);

		
		theTire = tire.selectedIndex;
		rollingRes = tireValues[theTire];
		theAero = aero.selectedIndex;
		frontalArea = aeroValues[theAero];
		gradev = eval(grade.value) * 0.01;
		headwindv = eval(headwind.value) / 3.6;  // converted to m/s
		distancev = eval(distance.value);
		temperaturev = eval(temperature.value);
		elevationv = eval(elevation.value);
		transv = eval(trans.value) * 0.01;
		
		if(USUnits) {      // Convert to metric units
			rweightv *= 0.4536;
			bweightv *= 0.4536;
			headwindv *= 1.6092;
			distancev *= 1.6092;
			temperaturev = (temperaturev - 32) * 0.555;
			elevationv *= 0.3048;
		}
		
		/* Right panel */
		powerv2 = eval(power2.value);
		rweightv2 = eval(rweight2.value);
		bweightv2 = eval(bweight2.value);

		
		theTire2 = tire2.selectedIndex;
		rollingRes2 = tireValues[theTire2];
		theAero2 = aero2.selectedIndex;
		frontalArea2 = aeroValues[theAero2];
		gradev2 = eval(grade2.value) * 0.01;
		headwindv2 = eval(headwind2.value) / 3.6;  // converted to m/s
		distancev2 = eval(distance2.value);
		temperaturev2 = eval(temperature2.value);
		elevationv2 = eval(elevation2.value);
		transv2 = eval(trans2.value) * 0.01;
		
		if(USUnits) {      // Convert to metric units
			rweightv2 *= 0.4536;
			bweightv2 *= 0.4536;
			headwindv2 *= 1.6092;
			distancev2 *= 1.6092;
			temperaturev2 = (temperaturev2 - 32) * 0.555;
			elevationv2 *= 0.3048;
		}
		
		/* Left Calculation */
		density = (1.293 - 0.00426 * temperaturev) * Math.exp(-elevationv / 7000.0);
		twt = 9.8 * (rweightv + bweightv);  // total weight in newtons
		A2 = 0.5 * frontalArea * density;  // full air resistance parameter
		tres = twt * (gradev + rollingRes); // gravity and rolling resistance
		
		v = newton(A2, headwindv, tres, transv, powerv) * 3.6;      // convert to km/h
		if (v > 0.0) t = 60.0* distancev / v;
			else t = 0.0;  // don't want any div by zero errors
		c = t / 60.0 * (powerv * 4.0) / 1.163;   // no metabolic calories
			/* 1.163 is for converting watt-hours to kilocalories */
			/* energy conversion eff = 0.25 */
		wl = c / 7716;
		
		if(USUnits) {     // Convert to US units
			v *= 0.6214;
			wl *= 2.205;
		}
		
		/* Right Calculation */
		density2 = (1.293 - 0.00426 * temperaturev2) * Math.exp(-elevationv2 / 7000.0);
		twt2 = 9.8 * (rweightv2 + bweightv2);  // total weight in newtons
		A22 = 0.5 * frontalArea2 * density2;  // full air resistance parameter
		tres2 = twt2 * (gradev2 + rollingRes2); // gravity and rolling resistance
		
		v2 = newton(A22, headwindv2, tres2, transv2, powerv2) * 3.6;      // convert to km/h
		if (v2 > 0.0) t2 = 60.0* distancev2 / v2;
			else t2 = 0.0;  // don't want any div by zero errors
		c2 = t2 / 60.0 * (powerv2 * 4.0) / 1.163;  // no metabolic calories
			/* 1.163 is for converting watt-hours to kilocalories */
			/* energy conversion eff = 0.25 */
		wl2 = c2 / 7716;
		
		if(USUnits) {     // Convert to US units
			v2 *= 0.6214;
			wl2 *= 2.205;
		}

		/* Left results */
		velocity.value = makeDecimal2(v);
		
		/* Right results */
		velocity2.value = makeDecimal2(v2);		
	}
}
</script>
```
